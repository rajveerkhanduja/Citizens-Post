const axios = require('axios');

async function translate(text, targetLang = 'en') {
  const baseUrl = "https://translate.googleapis.com/translate_a/single";
  const params = new URLSearchParams({
    client: "gtx",
    sl: "auto",  // Set source language to 'auto' for automatic detection
    tl: targetLang,
    dt: "t",
    q: text
  });
  
  const url = `${baseUrl}?${params.toString()}`;
  
  try {
    const response = await axios.get(url);
    
    if (response.status === 200) {
      const data = response.data;
      const translatedText = data[0]
        .filter(sentence => sentence[0])
        .map(sentence => sentence[0])
        .join('');
      
      // The detected language is in the last element of the response array
      const detectedLanguage = data[2];
      
      return { translatedText, detectedLanguage };
    } else {
      throw new Error(`Translation failed. Status code: ${response.status}`);
    }
  } catch (error) {
    throw new Error(`Translation failed. Error: ${error.message}`);
  }
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { question, options, correct_option } = req.body;

  if (!question) {
    return res.status(400).json({ error: 'Question is required' });
  }

  let aiPrompt;
  let translatedQuestion = question;
  let translatedOptions = options;
  let detectedLanguage;

  try {
    const { translatedText, detectedLanguage: detected } = await translate(question);
    translatedQuestion = translatedText;
    detectedLanguage = detected;

    if (options) {
      translatedOptions = {};
      for (const [key, value] of Object.entries(options)) {
        const { translatedText } = await translate(value);
        translatedOptions[key] = translatedText;
      }
    }
  } catch (error) {
    console.error('Translation error:', error);
    return res.status(500).json({ error: 'Error during translation' });
  }
  
  if (translatedOptions && correct_option) {
    const formattedOptions = Object.entries(translatedOptions)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');
      
    aiPrompt = `Question: ${translatedQuestion}\nOptions:\n${formattedOptions}\nCorrect Option: ${correct_option}\nExplain why the correct option is correct and why the others are incorrect.`;
  } else {
    aiPrompt = `Question: ${translatedQuestion}\nProvide an explanation for this question.`;
  }

  try {
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyC_XtCoIDzJMfy24IB3q08CiqTqUrCbMKM',
      {
        contents: [
          {
            parts: [
              {
                text: aiPrompt
              }
            ]
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    let aiResponse = response.data.candidates[0].content.parts[0].text;

    // Translate the AI response back to the original language
    if (detectedLanguage !== 'en') {
      try {
        const { translatedText } = await translate(aiResponse, detectedLanguage);
        aiResponse = translatedText;
      } catch (error) {
        console.error('Translation error:', error);
        return res.status(500).json({ error: 'Error during translation of AI response' });
      }
    }

    res.json({ 
      original_question: question,
      translated_question: translatedQuestion,
      original_options: options,
      translated_options: translatedOptions,
      detected_language: detectedLanguage,
      ai_response: aiResponse
    });
  } catch (error) {
    console.error('Error communicating with AI service:', error);
    res.status(500).send('Error communicating with AI service');
  }
};
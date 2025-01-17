import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { GoogleGenerativeAI } from '@google/generative-ai';
import env from "dotenv";

env.config();

const GeminiChatbot = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! I am your postal services AI assistant. How can I help you today?' }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef();

  
  const API_KEY = process.env.CHATBOT_API_KEY;

  // Function to create a smart prompt
  const createSmartPrompt = (query) => `
    You are an expert in postal services and logistics. Your task is to assist in evaluating and improving postal operations based on various performance metrics and customer satisfaction criteria.
    
    Here is the query: "${query}"
    Provide a detailed, accurate, and insightful response based on best practices and current industry standards.
  `;

  // Function to handle AI interaction
  const sendMessage = async () => {
    if (userInput.trim() === '') return;

    // Add user message
    const newMessages = [...messages, { sender: 'user', text: userInput }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      // Initialize Gemini AI
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const smartPrompt = createSmartPrompt(userInput);

      // Generate response
      const result = await model.generateContent(smartPrompt);
      const botResponse = result.response.text();

      // Add bot response to messages
      setMessages(prevMessages => [
        ...prevMessages, 
        { sender: 'bot', text: botResponse }
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to get response from AI. Please try again.');
      console.error(error);
    } finally {
      setUserInput('');
      setIsLoading(false);
    }
  };

  // Automatically scroll to bottom when messages change
  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView 
        ref={scrollViewRef}
        style={styles.chatContainer}
        contentContainerStyle={styles.scrollViewContent}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map((message, index) => (
          <View
            key={index}
            style={[
              styles.messageContainer,
              message.sender === 'user' ? styles.userMessage : styles.botMessage,
            ]}
          >
            <Text style={[styles.messageText, message.sender === 'user' && { color: '#fff' }]}>
              {message.text}
            </Text>
          </View>
        ))}
        {isLoading && (
          <View style={[styles.messageContainer, styles.botMessage]}>
            <Text style={styles.messageText}>Typing...</Text>
          </View>
        )}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={userInput}
          onChangeText={setUserInput}
          placeholder="Ask about postal services..."
          placeholderTextColor="#888"
          multiline
        />
        <TouchableOpacity 
          style={styles.sendButton} 
          onPress={sendMessage}
          disabled={isLoading}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#f7f7f7',
  },
  chatContainer: {
    flex: 1,
    padding: 10,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  messageContainer: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 15,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#FF6347', // Red color for user text
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF', 
    borderColor: '#ccc',
    borderWidth: 1,
  },
  messageText: {
    fontSize: 16,
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  input: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#f0f0f0',
    maxHeight: 100,
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    backgroundColor: '#FF6347',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default GeminiChatbot;

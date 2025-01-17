import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";

export default function FAQs() {
  const [searchQuery, setSearchQuery] = useState(""); // State for the search bar
  const [expandedCategory, setExpandedCategory] = useState(null); // Tracks which category is expanded
  const [expandedQuestion, setExpandedQuestion] = useState(null); // Tracks which question is expanded

  // FAQ data grouped by categories
  const faqData = [
    {
      category: "User Management",
      questions: [
        { question: "How do I reset my password?", answer: "Go to settings and click 'Reset Password'." },
        { question: "How do I update my profile?", answer: "Navigate to 'Profile' and edit your details." },
      ],
    },
    {
      category: "Mail Booking",
      questions: [
        { question: "How do I book a mail order?", answer: "Go to the 'Mail Booking' section and follow the steps." },
      ],
    },
    {
      category: "Money Order",
      questions: [
        { question: "How do I send a money order?", answer: "Fill out the form in the 'Money Order' section." },
      ],
    },
    {
      category: "Quick Tools",
      questions: [
        { question: "What tools are available?", answer: "Quick access to tracking, payments, and support." },
      ],
    },
    {
      category: "Retail Services",
      questions: [
        { question: "What retail services are offered?", answer: "We provide packaging, stamps, and more." },
      ],
    },
    {
      category: "Customer Support",
      questions: [
        { question: "How can I contact customer support?", answer: "Use the 'Contact Us' form or call our hotline." },
      ],
    },
    {
      category: "Franking Services",
      questions: [
        { question: "How does franking work?", answer: "Franking is a pre-paid method for mailing items." },
      ],
    },
  ];

  // Filter the data based on the search query
  const filteredFaqData = faqData.map((category) => ({
    ...category,
    questions: category.questions.filter(
      (q) =>
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((category) => category.questions.length > 0); // Remove empty categories after filtering

  return (
    <View style={styles.container}>
      {/* Heading */}
      <Text style={styles.heading}>Frequently Asked Questions</Text>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search for a question..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* FAQ List */}
      <ScrollView>
        {filteredFaqData.map((category, categoryIndex) => (
          <View key={categoryIndex} style={styles.categoryContainer}>
            {/* Category Header */}
            <TouchableOpacity
              onPress={() =>
                setExpandedCategory(expandedCategory === categoryIndex ? null : categoryIndex)
              }
              style={styles.categoryHeader}
            >
              <Text style={styles.categoryText}>{category.category}</Text>
            </TouchableOpacity>

            {/* Questions (only shown if the category is expanded) */}
            {expandedCategory === categoryIndex &&
              category.questions.map((question, questionIndex) => (
                <View key={questionIndex} style={styles.questionContainer}>
                  {/* Question Header */}
                  <TouchableOpacity
                    onPress={() =>
                      setExpandedQuestion(expandedQuestion === `${categoryIndex}-${questionIndex}` ? null : `${categoryIndex}-${questionIndex}`)
                    }
                    style={styles.questionHeader}
                  >
                    <Text style={styles.questionText}>{question.question}</Text>
                  </TouchableOpacity>

                  {/* Answer (only shown if the question is expanded) */}
                  {expandedQuestion === `${categoryIndex}-${questionIndex}` && (
                    <Text style={styles.answerText}>{question.answer}</Text>
                  )}
                </View>
              ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#f9f9f9",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  searchBar: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    height: 40,
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryHeader: {
    padding: 10,
    borderRadius: 5,
    borderBottomColor:"#000",
    borderBottomWidth:1,
  },
  categoryText: {
    fontSize: 18,
    color: "#000",
    fontWeight: "bold",
  },
  questionContainer: {
    marginTop: 10,
    paddingLeft: 10,
    borderLeftWidth: 2,
    borderLeftColor: "#007bff",
  },
  questionHeader: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  questionText: {
    fontSize: 16,
    fontWeight: "600",
  },
  answerText: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
    marginLeft: 15,
  },
});

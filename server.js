// server.js

// Import necessary modules for the server
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies from incoming requests
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Mock AI data for a simplified demo
// In a real application, this would be a call to a Generative AI API (e.g., Gemini, GPT)
const moodResponses = {
  sad: [
    "I hear you. It's okay to feel sad. What helps you feel a little better?",
    "Sometimes, taking a moment for yourself can help. How about a quick breathing exercise?",
    "Remember, difficult roads often lead to beautiful destinations. You're stronger than you think."
  ],
  anxious: [
    "That sounds tough. When you feel anxious, try a 'box breathing' technique. Inhale for 4, hold for 4, exhale for 4, hold for 4.",
    "It's okay to feel that way. Focus on one small thing you can control right now.",
    "Your feelings are valid. What's one small step you can take to ease your mind?"
  ],
  stressed: [
    "Stress can be overwhelming. How about writing down your thoughts? Sometimes, putting them on paper helps.",
    "Try a quick body scan. Close your eyes and notice any tension in your body, from your toes to your head.",
    "Remember to be kind to yourself. You are doing enough."
  ],
  default: [
    "Thank you for sharing that with me. What's on your mind?",
    "That's an interesting thought. Tell me more.",
    "I'm here to listen. What's one thing that went well for you today?"
  ]
};

// Function to simulate a call to a Generative AI API
async function getGenerativeAIResponse(userMessage) {
  // A simple keyword-based response logic for this demo
  const messageLower = userMessage.toLowerCase();
  
  if (messageLower.includes('sad') || messageLower.includes('depressed') || messageLower.includes('unhappy')) {
    return moodResponses.sad[Math.floor(Math.random() * moodResponses.sad.length)];
  } else if (messageLower.includes('anxious') || messageLower.includes('worry')) {
    return moodResponses.anxious[Math.floor(Math.random() * moodResponses.anxious.length)];
  } else if (messageLower.includes('stressed') || messageLower.includes('overwhelmed')) {
    return moodResponses.stressed[Math.floor(Math.random() * moodResponses.stressed.length)];
  } else {
    return moodResponses.default[Math.floor(Math.random() * moodResponses.default.length)];
  }
}

// API endpoint to handle user messages
app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;
  if (!userMessage) {
    return res.status(400).json({ error: 'Message is required.' });
  }

  console.log(`User message: "${userMessage}"`);

  try {
    const aiResponse = await getGenerativeAIResponse(userMessage);
    res.json({ message: aiResponse });
  } catch (error) {
    console.error('Error getting AI response:', error);
    res.status(500).json({ error: 'Failed to get a response from the AI.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
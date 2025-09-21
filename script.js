// public/script.js

document.addEventListener('DOMContentLoaded', () => {
    const chatBox = document.getElementById('chat-box');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');

    // Function to add a new message to the chat box
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${sender}-message`);
        messageDiv.innerHTML = `<p>${text}</p>`;
        chatBox.appendChild(messageDiv);
        // Automatically scroll to the bottom of the chat box
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // Function to handle sending a message
    async function sendMessage() {
        const message = userInput.value.trim();
        if (message === '') return; // Don't send empty messages

        // Add user's message to the chat
        addMessage(message, 'user');
        userInput.value = ''; // Clear the input field

        try {
            // Send the message to the backend API
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: message })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            
            // Add AI's response to the chat
            setTimeout(() => {
                addMessage(data.message, 'ai');
            }, 500); // Add a small delay for a more natural feel

        } catch (error) {
            console.error('Error:', error);
            addMessage('I apologize, I am currently unable to respond. Please try again later.', 'ai');
        }
    }

    // Event listeners for sending the message
    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });
});
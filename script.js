const chatForm = document.getElementById('chatForm');
const userInput = document.getElementById('userInput');
const chatBox = document.getElementById('chatBox');

// Predefined smart responses
const aiResponses = {
    "hello": "Hi there! How can Nova help you today? 😊",
    "hi": "Hello! What can I do for you?",
    "how are you": "I'm doing fantastic, processing data at maximum efficiency! How are you doing?",
    "what is your name": "My name is Nova AI, your smart browser assistant.",
    "help": "You can ask me simple questions, ask for coding advice, or just say hello!",
    "bye": "Goodbye! Have an amazing day ahead! 👋",
    "default": "That's very interesting! I am currently running on frontend simulation mode. To make me fully functional, you can connect me to the Google Gemini or OpenAI API."
};

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const messageText = userInput.value.trim();
    if (!messageText) return;

    // 1. Render User Message
    appendMessage(messageText, 'user-message');
    userInput.value = '';

    // 2. Render Bot Typing State
    const typingElement = appendMessage('Nova is typing...', 'bot-message typing-indicator');
    
    // 3. Simulate Network Delay & Generate Response
    setTimeout(() => {
        typingElement.remove(); // Remove loading state
        const reply = getAIResponse(messageText);
        appendMessage(reply, 'bot-message');
    }, 1000);
});

// Helper function to insert message bubble and scroll down
function appendMessage(text, className) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${className}`;
    messageDiv.textContent = text;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll
    return messageDiv;
}

// Simple keyword matching for clean demo usage
function getAIResponse(input) {
    const cleanedInput = input.toLowerCase().replace(/[^\w\s]/gi, "");
    
    for (const key in aiResponses) {
        if (cleanedInput.includes(key)) {
            return aiResponses[key];
        }
    }
    return aiResponses["default"];
}

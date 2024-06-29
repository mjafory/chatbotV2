// Event listeners for input and button click
document.getElementById('user-input').addEventListener('input', fetchTitle);
document.getElementById('send-button').addEventListener('click', sendMessage);
document.getElementById('user-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent the default action of the Enter key
        sendMessage();
    }
});

let keywordResponses = {}; // Object to store keyword responses

// Fetch the keyword responses from responses.json
fetch('responses.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to load responses.json');
        }
        return response.json();
    })
    .then(data => {
        keywordResponses = data;
        console.log('Loaded responses:', keywordResponses); // Debugging: Log loaded responses
    })
    .catch(error => {
        console.error('Error loading responses.json:', error); // Error handling: Log fetch errors
    });

// Load chat history from localStorage when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadChatHistory();
});

// Function to fetch and display title
function fetchTitle() {
    const userInput = document.getElementById('user-input').value.toLowerCase();
    if (userInput.trim() === '') {
        displayTitle('');
        displayDropdown([]);
        return;
    }

    let titles = getMatchingTitles(userInput); // Use getMatchingTitles to find matches
    displayTitle(titles.join(', '));
    displayDropdown(titles);
}

// Function to get matching titles
function getMatchingTitles(userInput) {
    let matches = [];
    for (const keyword in keywordResponses) {
        if (keyword.includes(userInput)) {
            matches.push(keyword);
        }
    }
    return matches;
}

// Function to display title in HTML
function displayTitle(titles) {
    const titleElement = document.getElementById('title');
    titleElement.textContent = titles;
}

// Function to display dropdown with matching titles
function displayDropdown(titles) {
    const dropdown = document.getElementById('dropdown-list');
    
    if (!dropdown) {
        console.error('Dropdown element not found');
        return;
    }

    dropdown.innerHTML = ''; // Clear previous dropdown items

    if (titles.length === 0) {
        dropdown.style.display = 'none'; // Hide dropdown if no matches
        return;
    }

    titles.forEach(title => {
        const li = document.createElement('li');
        li.textContent = title;
        li.addEventListener('click', () => {
            selectFromDropdown(title); // Function to handle selection
        });
        li.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault(); // Prevent the default action of the Enter key
                selectFromDropdown(title); // Function to handle selection
            }
        });
        dropdown.appendChild(li);
    });

    dropdown.style.display = 'block'; // Show dropdown
}

// Function to handle selection from dropdown
function selectFromDropdown(title) {
    document.getElementById('user-input').value = title;
    displayTitle(title);
    displayDropdown([]); // Hide dropdown after selection
    sendMessage(); // Send message after selecting from dropdown
}

// Function to send user message
function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === '') return;

    addMessageToChat('✉️', userInput);
    saveMessageToLocalStorage('user', userInput); // Save user message to local storage
    document.getElementById('user-input').value = '';
    displayTitle(''); // Clear title after sending message
    displayDropdown([]); // Hide dropdown after sending message
    
    const botResponse = getBotResponse(userInput.toLowerCase());
    addMessageToChat('👤', botResponse);
    saveMessageToLocalStorage('bot', botResponse); // Save bot response to local storage
}

// Function to add message to chat box
function addMessageToChat(sender, message) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.innerHTML = message.replace(/\n/g, '<br>'); // Replace newline with <br> for HTML
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Function to get bot response based on user input
function getBotResponse(userInput) {
    userInput = userInput.toLowerCase();
    console.log('User Input:', userInput);

    for (const keyword in keywordResponses) {
        if (userInput.includes(keyword)) {
            const response = keywordResponses[keyword];
            if (Array.isArray(response)) {
                return response.join('<br>');
            } else {
                return response;
            }
        }
    }

    return "Sorry, I didn't understand that.";
}

// Function to save message to local storage
function saveMessageToLocalStorage(sender, message) {
    // Retrieve existing chat history from localStorage or initialize an empty object
    let chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || { messages: [] };

    // Ensure chatHistory.messages is always an array
    chatHistory.messages = chatHistory.messages || [];

    // Push new message to the array
    chatHistory.messages.push({ sender, message });

    // Store updated chat history back to localStorage
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
}

// Function to load chat history from localStorage and display in chat box
function loadChatHistory() {
    const chatHistory = JSON.parse(localStorage.getItem('chatHistory'));
    if (chatHistory && chatHistory.messages && chatHistory.messages.length > 0) {
        chatHistory.messages.forEach(msg => {
            addMessageToChat(msg.sender === 'user' ? '✉️' : '👤', msg.message);
        });
    }
}

// Function to clear chat history
function clearChat() {
    localStorage.removeItem('chatHistory');
    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML = ''; // Clear chat box in UI
}

function selectFromTopBar(topic) {
    document.getElementById('user-input').value = topic;
    displayTitle(topic);
    sendMessage(); // Automatically send message from top bar selection
}


document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        displayTopBarSuggestions();
    }, 3000); // Delay in milliseconds (3 seconds)
});

function displayTopBarSuggestions() {
    const topBar = document.getElementById('top-bar');
    topBar.style.visibility = 'visible'; // Make the top bar visible after delay
}


// Get the modal element
const modal = document.querySelector('.modal');

// Get the button that opens the modal
const openModalBtn = document.getElementById('open-suggested-questions-btn');

// Function to open the modal
function openModal() {
    modal.style.display = 'block'; // Display the modal
    setTimeout(() => {
        modal.classList.add('open'); // Add 'open' class after a short delay for animation
    }, 50); // Adjust delay as needed for smoother animation
}

// Function to close the modal
function closeModal() {
    modal.classList.remove('open'); // Remove 'open' class
    setTimeout(() => {
        modal.style.display = 'none'; // Hide the modal after animation completes
    }, 300); // Ensure this delay matches the transition duration in CSS
}

// Event listener for the open modal button
openModalBtn.addEventListener('click', openModal);

// Event listener for the close button inside the modal
document.querySelector('.close-btn').addEventListener('click', closeModal);


function closeSuggestedQuestionsModal() {
    closeModal(); // Assuming closeModal() is the function that handles modal closing
}
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
    document.getElementById('user-input').value = '';
    displayTitle(''); // Clear title after sending message
    displayDropdown([]); // Hide dropdown after sending message
    
    const botResponse = getBotResponse(userInput.toLowerCase());
    addMessageToChat('👤', botResponse);
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

# Chatbot V2 Interface

This project is a chatbot interface developed using HTML, CSS, and JavaScript. The chatbot fetches responses from a `responses.json` file based on user input, displays relevant responses, and simulates a conversation interface. It also includes features like saving chat history to localStorage, handling user input events, and displaying matching titles in a dropdown list.

## Features

- **Dynamic Responses**: Fetches and displays responses from `responses.json` based on user input.
- **Chat History**: Saves and loads chat history from localStorage.
- **Input Handling**: Supports message sending via button click or Enter key.
- **Dropdown Suggestions**: Displays matching titles in a dropdown list as the user types.
- **Top Bar Suggestions**: Displays top bar suggestions with a delay.
- **Modal Popup**: Stylish modal popup for suggested questions.
- **Styling**: CSS animations and styled text using class selectors.


## JSON Structure

The `responses.json` file contains keyword responses in the following format:

```json
{
  "hello": ["<b>Hi there!</b> How can I assist you today?"],
  "password": ["<b>If you need to reset your password,</b> please follow the instructions on the support page."],
  "report": ["<b>For issues with report submissions,</b> make sure you have filled all required fields."],
  "account": [
    "<b>To check your account balance,</b> follow these steps:",
    "- <b>Log in</b> to your <b>account</b>.",
    "- Navigate to the <b>Balance</b> section.",
    "- View your current balance."
  ],
  ...
}
```

##### This summary provides an overview of the project, explains its features, usage, and structure, and includes relevant code snippets to help users understand how to work with the chatbot interface.

// HTML code
const chatboxHTML = `
<!DOCTYPE html>
<html>

<head>
    <link rel="stylesheet" href="styles.css">
</head>

<body>
    <button id="open-chatbox">&#x1F4AC;</button>

    <div id="chatbox">
        <div id="chatbox-header">
            <span>Chat</span>
            <div>
                <button id="minimize-button" onclick="toggleMinimizeChatbox()">&#x2013;</button>
                <button id="fullscreen-button" onclick="toggleFullscreenChatbox()">&#x2922;</button>
                <button onclick="closeChatbox()">&#x2715;</button>
            </div>
        </div>
        <div id="chatbox-content">
            <!-- Chat content goes here -->
            <ul id="messages"></ul>
        </div>
        <div id="chatbox-footer">
            <input type="text" id="message-input" placeholder="Type your message here...">
            <button id="send-button">Send </button>
        </div>
    </div>

    <script src="main.js"></script>
</body>

</html>
`;

// CSS code 
const chatboxCSS = `
#chatbox {
    position: fixed;
    bottom: 10px;
    right: 10px;
    width: 400px;
    height: 90%;
    background-color: #d5e8f1;
    border: 1px solid #65a9ec;
    border-radius: 5px;
    display: none;
    flex-direction: column;
}

#chatbox-header {
    background-color: #151cef;
    color: white;
    padding: 18px;
    display: flex;
    border-radius: 5px 5px 0 0;
    justify-content: space-between;
}

#chatbox-content {
    flex-grow: 1;
    overflow-y: auto;
    padding: 10px;
    display: flex;
    flex-direction: column;
}

#chatbox-footer {
    padding: 10px;
    border-top: 1px solid #cfe0f1;
    display: flex;
    justify-content: space-between;
}

#open-chatbox {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 50%;
    padding: 10px 20px;
    cursor: pointer;
}

#message-input {
    width: 100%;
    margin-right: 10px;
    border: none;
    border-radius: 15px;
    padding: 15px 15px;
}

#send-button {
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 25%;
    padding: 5px 10px;
    cursor: pointer;
}

#messages {
    list-style-type: none;
    padding: 0;
}

#messages .left-align {
    text-align: left;
    background-color: #877d7d;
    margin: 10px;
    padding: 10px;
    border-radius: 10px;
    display: block;
    width: fit-content;
    clear: both;
}

#messages .right-align {
    text-align: right;
    background-color: #6f73ed;
    color: white;
    margin: 10px;
    padding: 10px;
    border-radius: 10px;
    display: block;
    width: fit-content;
    clear: both;
    float: right;
}

/* Style for chat messages */
#messages li {
    max-width: 80%;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 15px;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
}

/* Differentiate between human and chatbot messages */
#messages li.human {
    align-self: flex-end;
    background-color: #0084ff;
    color: white;
    border-radius: 15px 15px 0 15px;
    /* top-left, top-right, bottom-right, bottom-left */
}

#messages li.chatbot {
    align-self: flex-start;
    background-color: #f0f0f0;
    color: #151cef;
    border-radius: 15px 15px 15px 0;
    /* top-left, top-right, bottom-right, bottom-left */
}

/* Style for scrollbar */
#messages {
    scrollbar-width: thin;
    scrollbar-color: rgba(155, 155, 155, 0.5) transparent;
}

#messages::-webkit-scrollbar {
    width: 6px;
}

#messages::-webkit-scrollbar-track {
    background: transparent;
}

#messages::-webkit-scrollbar-thumb {
    background-color: rgba(211, 209, 209, 0.5);
    border-radius: 20px;
    border: transparent;
}
`;

// Appended the chatbox to the DOM
document.body.innerHTML += chatboxHTML;

// Added the CSS to the DOM
const style = document.createElement('style');
style.innerHTML = chatboxCSS;
document.head.appendChild(style);

document.getElementById('open-chatbox').addEventListener('click', function () {
    document.getElementById('chatbox').style.display = 'flex';
    this.style.display = 'none';
});

function closeChatbox() {
    document.getElementById('chatbox').style.display = 'none';
    document.getElementById('open-chatbox').style.display = 'block';
}

function toggleMinimizeChatbox() {
    var chatbox = document.getElementById('chatbox');
    var button = document.getElementById('minimize-button');
    var fullscreenButton = document.getElementById('fullscreen-button');
    if (chatbox.style.height !== '30px') {
        chatbox.style.height = '30px';
        chatbox.style.width = '400px';
        button.innerHTML = '&#x25A1;';
        fullscreenButton.innerHTML = '&#x2922;';
    } else {
        chatbox.style.height = '90%';
        button.innerHTML = '&#x2013;';
        fullscreenButton.innerHTML = '&#x2922;';
    }
}

function toggleFullscreenChatbox() {
    var chatbox = document.getElementById('chatbox');
    var button = document.getElementById('fullscreen-button');
    var minimizeButton = document.getElementById('minimize-button');
    if (chatbox.style.width !== '65%') {
        chatbox.style.width = '65%';
        chatbox.style.height = '70%';
        button.innerHTML = '&#x2921;';
        minimizeButton.innerHTML = '&#x2013;';
    } else {
        chatbox.style.width = '400px';
        chatbox.style.height = '70%';
        button.innerHTML = '&#x2922;';
        minimizeButton.innerHTML = '&#x2013;';
    }
}
function addMessage(text, sender) {
    const messages = document.getElementById('messages');
    const message = document.createElement('li');
    message.textContent = text;
    message.className = sender === 'Human' ? 'right-align' : 'left-align';
    messages.appendChild(message);
    message.scrollIntoView();
}

// Event listener for the send button
document.getElementById('send-button').addEventListener('click', function () {
    const input = document.getElementById('message-input');
    const text = input.value;
    input.value = '';
    addMessage(text, 'Human');
    addMessage('Response will go here', 'Chatbot');
    document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight;
});

// Event listener for the enter key in the message input
document.getElementById('message-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        document.getElementById('send-button').click();
    }
});
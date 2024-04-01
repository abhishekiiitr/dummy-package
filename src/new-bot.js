const chatboxHTML =
    `
<!DOCTYPE html>
<html>

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Chatbot</title>
    <link rel="stylesheet" href="styles.css">
</head>

<body style="background-color: rgb(43, 52, 43)">
    <div id="dashboard-button-container">
        <button id="open-dashboard">
            <div id="chat-icon" style="background-image: url('../assets/ui-motion.gif');"></div>
        </button>
        <img id="icon-button-badge" src="../assets/Alarm.svg"></img>
        <div id="notif-container">
            <div id="notif">Hey there!&nbsp; <span id="toggle-msg"> Sparky here.</span></div>
        </div>
    </div>
    <button id="close-all">
        <div id="close-icon" style="background-image: url('../assets/Trigger.svg');"></div>
    </button>
    <div id="dashboard">
        <div id="dashboard-header">
            <div id="header-text">
                <p>Hi there! &#128075;</p>
                <p>Sparky here</p>
                <p>How can we help?</p>
            </div>
        </div>
        <div id="dashboard-footer">
            <div id="footer-msg">
                <p>Send us a message</p>
                <p>We typically reply in few minutes</p>
            </div id="button">
            <button id="open-chatbox">
                <img src="../assets/open-chat.svg" alt="start-chat">
            </button>
        </div>
    </div>
    <div id="chatbox">
        <div id="chatbox-header">
            <button id="close-chatbox">
                <img src="../assets/back.svg" alt="back-ios">
            </button>
            <div>
                <div class="header-line">
                    <span>Sparky</span>
                </div>
                <div class="header-line-small">
                    <span>online </span>
                </div>
            </div>
            <div id="rounded-space">
                <img id="bot-gif" src="../assets/ui-motion.gif" />
            </div>
        </div>
        <div id="chatbox-content">
            <div id="loader-container">
                <span class="loader"></span>
                <button id="reconnect-button">Connecting...</button>
            </div>
            <span id="response-loader"></span>
            <ul id="messages"></ul>
            <div id="suggestion-buttons-container">
                <div id="suggestionButtons">
                    <button id="suggestion-button-1"><span>Taekwondo lesson</span></button>
                    <button id="suggestion-button-2"><span>Thanks !</span></button>
                </div>
                <button id="clear-button">
                    <img src="../assets/clear.svg" alt="">
                </button>
            </div>
        </div>

        <div id="input-container">
            <!-- <button id="mic-button">
                <img src="../assets/mic.svg" alt="Mic Icon">
            </button> -->
            <div id='input-wrapper'>
                <input type="text" id="message-input" placeholder="Type message here...">

            </div>
            <button id="send-button">
                <img src="../assets/send-msg.svg" alt="Send Icon">
            </button>

        </div>
    </div>

    <script src="main1.js"></script>
</body>

</html>
`
const chatboxCSS = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;400;700&display=swap');

html {
    font-family: 'Inter';
}

#dashboard {
    position: fixed;
    height: 65vh;
    width: 22vw;
    top: auto;
    display: none;
    flex-direction: column;
    overflow: auto;
    border-radius: 1.3vw;
    right: 4vh;
    background-color: black;
    bottom: 12vh;
}

#dashboard-header {
    flex: 0.7;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    background: url('../assets/ui-motion.gif') no-repeat center;
    background-size: 90% auto;
    background-position: center;
    color: white;
    position: relative;
    height: 100%;
    box-sizing: border-box;
    font-size: 1.6rem;
}

#header-text {
    margin: 0;
    align-self: flex-start;
    font-weight: bold;
    font-size: 2.4rem;
    position: absolute;
    bottom: 0;
    left: 1.6rem;
}

#header-text p {
    margin: 0;
    font-size: 1.8rem;
}

#header-text p:first-child {
    margin-bottom: 0.2rem;
    font-weight: 400;
}

#icon-button {
    position: absolute;
    top: 1.6rem;
    left: 1.6rem;
    background: white;
    border: none;
    border-radius: 50%;
    font-size: 1.6rem;
    cursor: pointer;
    color: #e5e7f4;
    width: 3.2rem;
    height: 3.2rem;
    margin: 1.6rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

#dashboard-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #F4FAFF;
    border-radius: 1rem;
    height: 12%;
    overflow: hidden;
    margin: 1.1rem;
    margin-top: auto;
    cursor: pointer;
}

#footer-msg {
    width: 95%;
    height: 80%;
    margin-left: 1.6rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
}

#footer-msg p:nth-child(1) {
    font-size: 1.2rem;
    margin: 0;
    font-weight: 600;
}

#footer-msg p:nth-child(2) {
    font-size: 0.9rem;
    font-weight: 400;
    margin: 0;
}

#open-chatbox {
    margin-right: 1rem;
    border-radius: 20%;
    border: transparent;
    color: white;
    border-radius: 20%;
    cursor: pointer;
    background-color: transparent;
}

#loading-text {
    text-align: center;
    width: 100%;
    margin-bottom: 2rem;
    font-size: 1.5rem;
    color: black;
}

.loader-old-chat {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    animation: rotate 1s linear infinite;
    z-index: 10;
    margin: auto;
}

.loader-old-chat::before {
    content: "";
    box-sizing: border-box;
    position: absolute;
    inset: 0px;
    border-radius: 50%;
    border: 0.3rem solid #0790e5;
    animation: prixClipFix 1.6s linear infinite;
}

@keyframes rotate {

    100% {
        transform: rotate(360deg)
    }
}

@keyframes prixClipFix {
    0% {
        clip-path: polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 0 0)
    }

    25% {
        clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0)
    }

    50% {
        clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%)
    }

    75% {
        clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 100%)
    }

    100% {
        clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 0)
    }
}


/* General styles */
::-webkit-scrollbar {
    width: 0vw;
}

::-webkit-scrollbar-track {
    background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
    background: #2b2b2d;
}

::-webkit-scrollbar-thumb:hover {
    background: #a49999;
}

/* ID selectors */
#chatbox {
    position: fixed;
    right: 2vh;
    display: none;
    flex-direction: column;
    border-radius: 1.8rem;
    box-sizing: border-box;
    background: transparent;
    overflow-y: hidden;
    bottom: 12vh;
    width: 20vw;
}

#chatbox-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    background-color: #00020B;
    height: 9%;
    border-radius: 1.3rem 1.3rem 0 0;
    color: white;
    flex-grow: 0;
    overflow: hidden;
}

#close-chatbox {
    display: block;
    width: auto;
    height: 70%;
    overflow: hidden;
    cursor: pointer;
    border: transparent;
    background-color: black;
}

.header-line,
.header-line-small {
    width: 100%;
}

.header-line {
    display: flex;
    justify-content: center;
    font-size: 1.2rem;
    font-weight: 550;
    margin-bottom: 0.2rem;
    letter-spacing: 0.08rem;
}

.header-line-small {
    text-align: center;
    font-size: 1rem;
    font-weight: 500;
    line-height: 1rem;
    letter-spacing: 0.1rem;
    color: rgb(2, 248, 2);
}

#loader-container {
    display: none;
    position: absolute;
    top: auto;
    left: 0;
    width: 100%;
    height: 91%;
    backdrop-filter: blur(0.2rem);
    z-index: 100;
    align-items: center;
    border-radius: 0 0 1.3rem 1.3rem;
    justify-content: center;
    flex-direction: column;
    overflow: hidden;
}

.loader {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    animation: rotate 1s linear infinite;
    z-index: 15;
    margin: 5rem;
}

.loader::before {
    content: "";
    box-sizing: border-box;
    position: absolute;
    inset: 0px;
    border-radius: 50%;
    border: 0.3rem solid #0790e5;
    animation: prixClipFix 1.6s linear infinite;
}

@keyframes rotate {

    100% {
        transform: rotate(360deg)
    }
}

@keyframes prixClipFix {
    0% {
        clip-path: polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 0 0)
    }

    25% {
        clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0)
    }

    50% {
        clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%)
    }

    75% {
        clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 100%)
    }

    100% {
        clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 0)
    }
}

#reconnect-button {
    align-self: center;
    margin-top: 5rem;
    padding: 0.5rem 1rem;
    z-index: 10;
    border: none;
    background-color: transparent;
    color: white;
    border: none;
    background-color: #00020B;
    border-radius: 0.5rem;
    cursor: pointer;
    font-size: 0.8rem;
}


#chatbox-content {
    background-color: #FFFFFF;
    flex-grow: 1;
    overflow: hidden;
    box-sizing: border-box;
    padding: 0.2rem 0.6rem .2rem 0.6rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
}

#messages {
    list-style-type: none;
    height: auto;
    min-height: 86%;
    max-height: 92%;
    overflow-wrap: break-word;
    overflow-y: auto;
    flex-direction: column;
    flex-wrap: nowrap;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-grow: 1;
}

#messages .human-wrapper {
    align-items: end;
    align-self: flex-end;
    max-width: 40%;
    background-color: #F1F7FC;
    margin: 0.6vh;
    padding: 0.5rem 1.5rem 0.5rem;
    letter-spacing: 0.1rem;
    border-radius: 2rem 2rem 0 2rem;
    font-size: 1.10rem;
    overflow-x: none;
}


ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
}

#messages .ai {
    align-self: flex-start;
    background-color: #00020B;
    color: #fff;
    margin: 1rem;
    margin-left: 0;
    padding: 1.4rem;
    letter-spacing: 0.05rem;
    border-radius: 1.5rem 1.5rem 1.5rem 0;
    max-width: 60%;
    font-size: 1.10rem;
    overflow-x: none;
}

.message-wrapper {
    display: flex;
    flex-direction: column;
}

.timestamp-ai {
    align-self: flex-start;
    display: block;
    font-size: 0.8em;
    color: #888;
    margin-left: 2rem;
}

.timestamp-human {
    align-self: flex-end;
    font-size: 0.8em;
    color: #888;
    margin-right: 1rem;
}

#messages .ai-wrapper {
    display: flex;
    align-items: end;
}

#messages .ai-wrapper .profile-pic {
    width: 1.8rem;
    height: 1.8rem;
    border-radius: 50%;
    margin-right: 0.3rem;
    margin-bottom: 1rem;
    background-image: url('../assets/ui-motion.gif');
    background-size: 130%;
    background-position: center;
    background-repeat: no-repeat;
}


#loader-resp {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: #fff;
    box-shadow: 1.2rem 0 #fff, -1.2rem 0 #fff;
    margin-left: 3rem;
    margin-right: 3rem;
    animation: flash 1s ease-out infinite alternate;
}

@keyframes flash {
    0% {
        background-color: none;
        box-shadow: 1.2rem 0 black, 1.2rem 0 #FFF;
    }

    50% {
        background-color: #FFF;
        box-shadow: 1.2rem 0 black, -1.2rem 0 black;
    }

    100% {
        background-color: black;
        box-shadow: 1.2rem 0 #FFF, 1.2rem 0 black;
    }
}

#suggestion-buttons-container {
    display: grid;
    flex-direction: row;
    padding-left: 1.2rem;
    padding-right: 1.2rem;
    margin-top: 0.3rem;
}

#suggestionButtons {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-grow: 1;
}

#suggestion-button-1,
#suggestion-button-2 {
    height: 2rem;
    border: 0.1rem solid #00020B;
    border-radius: 0.5rem;
    background: transparent;
    overflow: auto;
    text-align: center;
    white-space: nowrap;
    display: none;
    justify-content: flex-start;
    align-items: center;
    font-size: 1rem;
    margin: auto;
    cursor: pointer;
}

#suggestion-button-1 span,
#suggestion-button-2 span {
    overflow: hidden;
    text-overflow: clip;
    white-space: nowrap;
    width: 99%;
    padding: 0;
}

#suggestion-button-2 {
    margin-left: 0.5rem;
}


#clear-button {
    height: 1.8rem;
    width: 1.8rem;
    border: none;
    background: transparent;
    padding: 0;
    margin-top: 0.2rem;
    cursor: pointer;
}

#clear-button img {
    height: 2rem;
    width: 2rem;
    object-fit: contain;
}

#input-container {
    height: 12%;
    background-color: #FFFFFF;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 0.2rem;
    box-sizing: border-box;
    border-radius: 0 0 1.3rem 1.3rem;
    flex-shrink: 0;
    margin-top: 0;
    overflow: hidden;
    padding-left: 4%;
    padding-right: 4%;
}

#input-container input[type="text"] {
    width: 100%;
    box-sizing: border-box;
}

#mic-button {
    border: none;
    background: none;
    /* order: 2; */
}

#input-wrapper {
    /* position: relative; */
    display: flex;
    order: 1;
    width: 80%;
    border: 0.5px solid #00020B;
    margin: 0 1rem 0 0;
    border-radius: 0.7rem;
    padding: 0 1rem;
}

#message-input {
    flex-grow: 1;
    border: none;
    outline: none;
    font-size: 1.3rem;
    padding: 0.5rem 0 0.5rem 0;
}

#send-button {
    background-color: #00020B;
    border: 1px solid #00020B;
    border-radius: 3rem;
    height: 2.8rem;
    width: 2.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    order: 2;
}

#send-button img {
    height: 2rem;
    width: 2rem;
}

#voice-wrapper {
    position: relative;
    display: none;
    order: 2;
    width: 86%;
}

#voice-input {
    flex-grow: 1;
    border: none;
    padding: 0.5vw;
    padding-right: 6vh;
    outline: none;
    height: 100%;
    border-radius: 0.5vw;
    font-size: medium;
    margin-right: 0.5vw;
    background: transparent;
}

#keyboard {
    border: none;
    background: none;
    justify-content: center;
    align-items: center;
}

#keyboard img {
    height: 2em;
    width: 6vh;
}

#dashboard-button-container {
    position: fixed;
    right: 4vh;
    bottom: 4vh;
    width: 5rem;
    height: 5rem;
    border: none;
}

#notif-container {
    position: absolute;
    width: calc(26rem+100%);
    height: 100%;
    z-index: 1;
    left: calc(50% - 26rem);
    border-radius: 3.2rem;
    border: none;
    overflow: hidden;
    justify-content: center;
}

#open-dashboard {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
    padding: 0;
    z-index: 2;
    border: transparent;
    cursor: pointer;
    background-color: transparent;
}

#open-dashboard:active,
#open-dashboard:hover {
    border: none;
}

#notif {
    width: 26rem;
    height: 100%;
    background: black;
    color: white;
    border-radius: 3.2rem;
    font-size: 1.3rem;
    font-weight: 400;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0%;
    padding-right: 2rem;
    letter-spacing: .12rem;
    opacity: 0;
    transform: translateX(200%);
}

#toggle-msg {
    font-weight: 600;
    padding-right: 2rem;
}

.visible {
    animation: moveout 1.5s ease forwards, movein 1.5s 5s ease forwards;
}

@keyframes moveout {
    from {
        transform: translateX(200%);
        opacity: 0;
    }

    to {
        transform: translateX(0%);
        opacity: 1;
    }
}

@keyframes movein {
    from {
        transform: translateX(0%);
        opacity: 1;
    }

    to {
        transform: translateX(200%);
        opacity: 0;
    }
}



#close-all {
    position: fixed;
    right: 4vh;
    bottom: 4vh;
    width: 5rem;
    height: 5rem;
    border: none;
    border-radius: 50%;
    overflow: hidden;
    padding: 0;
    display: none;
    background-color: #000208;
}

/* #close-all:active,
#close-all:hover {
    background-color: transparent;
    border: none;

} */

#chat-icon {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 165% 165%;
    border-radius: 50%;
}

#icon-button-badge {
    display: flex;
    position: absolute;
    top: -5%;
    right: -5%;
    background-color: #AF0000;
    color: white;
    border-radius: 50%;
    width: 1.5rem;
    height: 1.5rem;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    font-weight: bold;
    border: 0.06rem solid white;
    z-index: 3;
}

#close-icon {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 160% 160%;
    border-radius: 50%;

}

#rounded-space {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    height: 80%;
    overflow: hidden;
}

#bot-gif {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
}

#button-container {
    position: relative;
}

/*For mobile screens*/
@media screen and (max-width: 480px) {

    #chatbox,
    #dashboard {
        position: fixed;
        height: 60vh;
        width: 38vh;
        max-width: 300px;
        border-radius: 1.4rem;
        right: 4.2vh;
        bottom: 13vh;
    }

    html {
        font-size: 50.5%;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
}

@media screen and (min-width: 481px) and (max-width: 768px) {

    #chatbox,
    #dashboard {
        position: fixed;
        height: 60vh;
        width: 38vh;
        border-radius: 1.4rem;
        right: 4vh;
        bottom: 13vh;
    }

    html {
        font-size: 40.5%;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
}

@media screen and (min-width: 769px) and (max-width: 1024px) {

    #chatbox,
    #dashboard {
        position: fixed;
        height: 60vh;
        width: 38vh;
        border-radius: 1.4rem;
        right: 4vh;
        bottom: 13vh;
    }

    html {
        font-size: 44.5%;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }


}

@media screen and (min-width: 1025px) and (max-width: 1200px) {

    #chatbox,
    #dashboard {
        position: fixed;
        height: 60vh;
        width: 38vh;
        max-width: 300px;
        border-radius: 1.4rem;
        right: 4vh;
        bottom: 13vh;
    }

    html {
        font-size: 48.5%;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

}

@media screen and (min-width: 1200px) and (max-width: 1400px) {

    #chatbox,
    #dashboard {
        position: fixed;
        height: 60vh;
        width: 37vh;
        border-radius: 1.4rem;
        right: 4vh;
        bottom: 13vh;
    }

    html {
        font-size: 54.5%;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
}


@media screen and (min-width: 1401px) and (max-width: 1599px) {

    #chatbox,
    #dashboard {
        position: fixed;
        height: 60vh;
        width: 38vh;
        max-width: 320px;
        border-radius: 1.4rem;
        right: 4vh;
        bottom: 13vh;
    }

    html {
        font-size: 62.5%;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
}

@media screen and (min-width: 1600px) {

    #chatbox,
    #dashboard {
        position: fixed;
        height: 540px;
        width: 320px;
        border-radius: 18px;
        right: 5vh;
        bottom: 14vh;
    }

    html {
        font-size: 80.5%;
        font-family: 'Inter';
    }

}`
export class ChatBot {
    constructor(CHATBOT_ID) {
        this.chatbotId = CHATBOT_ID;
        this.conversationId = this.getCookie('conversation_id') || null;
        this.ws = null;
        this.isFetching = false;
        this.isFetchingHistory = false;
        console.log('conversation id in construcutre ', this.conversationId);
        console.log('Chatbot id ', this.chatbotId);
        console.log('websocket ', this.ws);
        document.body.innerHTML += chatboxHTML;
        const style = document.createElement('style');
        style.innerHTML = chatboxCSS;
        document.head.appendChild(style);
        this.addEventListeners();
        document.getElementById('notif').classList.toggle('visible');

    }
    addEventListeners() {
        document.getElementById('open-chatbox').addEventListener('click', () => this.handleOpenChatboxClick());
        document.getElementById('dashboard-footer').addEventListener('click', () => this.handleOpenChatboxClick());
        document.getElementById('send-button').addEventListener('click', () => this.handleSendButtonClick());
        document.getElementById('message-input').addEventListener('keypress', (event) => this.handleMessageInputKeyPress(event));
        document.getElementById('clear-button').addEventListener('click', () => this.handleClearButtonClick());
        document.getElementById('open-dashboard').addEventListener('click', () => this.startBot());
        document.getElementById('close-chatbox').addEventListener('click', () => this.handleCloseChatboxClick());
        document.getElementById('close-all').addEventListener('click', () => this.handleCloseAllClick());
        document.getElementById('suggestion-button-1').addEventListener('click', (event) => this.handleSuggestionButtonClick(event));
        document.getElementById('suggestion-button-2').addEventListener('click', (event) => this.handleSuggestionButtonClick(event));
    }

    // Open Dashboard
    startBot() {
        document.getElementById('open-dashboard').style.display = 'none';
        document.getElementById('close-all').style.display = 'block';
        document.getElementById('icon-button-badge').style.display = 'none';
        document.getElementById('notif-container').style.display = 'none';
        if (!this.ws) this.connect();

        if (this.conversationId === null) {
            document.getElementById('dashboard').style.display = 'flex';

        }
        else {
            document.getElementById('chatbox').style.display = 'flex';
            if (!this.isFetchingHistory) {
                this.isFetching = true;
                // console.log('fetching chat history');
                // console.log('is fetching', this.isFetching);
                // console.log('is fetching history', this.isFetchingHistory);
                if (this.isFetching) {
                    console.log('this.isfetching =>>', this.isFetching);
                    const loader = document.createElement('div');
                    loader.id = 'loader-chat';
                    loader.className = 'loader-old-chat';
                    const loadingText = document.createElement('p');
                    loadingText.textContent = 'Loading conversations...';
                    loadingText.id = 'loading-text';
                    loadingText.style.textAlign = 'center';
                    loadingText.style.justifyContent = 'center';
                    const chatboxContent = document.getElementById('messages');
                    chatboxContent.insertBefore(loader, chatboxContent.firstChild);
                    chatboxContent.insertBefore(loadingText, loader.nextSibling);
                    document.getElementById('send-button').disabled = true;  // disable send button
                }

                // again checking if fetching is false then only fetch the chat history
                if (!this.isFetchingHistory) this.fetchChatHistory().then(() => {
                    this.isFetchingHistory = true;
                    console.log('is fetching history after feched', this.isFetchingHistory);
                    this.isFetching = false;
                    const chatboxContent = document.getElementById('messages');
                    const loader = chatboxContent.querySelector('.loader-old-chat');
                    const loadingText = chatboxContent.querySelector('p');
                    if (loader) {
                        loader.parentNode.removeChild(loader);
                    }
                    if (loadingText) {
                        loadingText.parentNode.removeChild(loadingText);
                    }

                    document.getElementById('send-button').disabled = false;  // enable send button
                    console.log("send is enabled and the fetch is completed");


                })
            }
        }
        this.checkConnection();


    }
    // Close All Button
    handleCloseAllClick() {
        // Hide dashboard and chatbox, display open dashboard button
        document.getElementById('dashboard').style.display = 'none';
        document.getElementById('open-dashboard').style.display = 'block';
        document.getElementById('close-all').style.display = 'none';
        document.getElementById('chatbox').style.display = 'none';
        document.getElementById('notif-container').style.display = 'block';

        // Close WebSocket connection if it exists
        /*  if (this.ws) {
              this.ws.close();
              setTimeout(() => {
                  console.log("WebSocket readyState:", this.ws.readyState);
              }, 1000);
          }
       */
        // Clear interval
        clearInterval(this.intervalId);
    }
    // Open Chatbox
    handleOpenChatboxClick() {

        document.getElementById('dashboard').style.display = 'none';
        document.getElementById('chatbox').style.display = 'flex';
        if (!this.ws) {
            console.log("connecting to web socket it was disconnected ");
            this.connect();
            console.log("called connect to web socket from handle chatbox function");
        }

    }


    /// Check the WebSocket connection
    checkConnection() {
        const intervalId = setInterval(() => {
            const statusElement = document.querySelector('.header-line-small span');
            if (this.ws && this.ws.readyState === WebSocket.OPEN) {
                // console.log('WebSocket connection is open')
                document.getElementById('loader-container').style.display = 'none';
                // clearInterval(intervalId);
                statusElement.textContent = 'online';
                statusElement.style.color = 'green';
            } else {
                // console.log('WebSocket connection is not open', this.isFetching)
                // if (!this.isFetching && this.isFetchingHistory) {
                //     document.getElementById('loader-container').style.display = 'none'; // still fetching chat history
                //     console.log('inside if check connection')
                // }
                // else 
                if (this.isFetching) {
                    document.getElementById('loader-container').style.display = 'none'; // fetching chat history
                    console.log('inside elif check connection')
                }
                else {
                    document.getElementById('loader-container').style.display = 'flex'; // websocket is not connected showing loader
                    statusElement.textContent = 'offline';
                    statusElement.style.color = 'red';
                    // this.connect();
                }
            }
        }, 5000);
        return intervalId;
    }

    // Close Chatbox
    handleCloseChatboxClick() {
        document.getElementById('chatbox').style.display = 'none';
        document.getElementById('dashboard').style.display = 'flex';
        // this.ws.close();
    }
    handleClearButtonClick() {
        const messagesElement = document.getElementById('messages');
        messagesElement.innerHTML = '';
        if (this.ws) this.ws.close();
        document.cookie = 'conversation_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        this.conversationId = null;
        this.connect();
    }
    handleSuggestionButtonClick(event) {
        const message = event.target.textContent;
        console.log('suggestion-message', message.type);
        this.sendMessage(message);
        this.addMessage(message, 'human', 'text');
        document.getElementById('send-button').disabled = true;  // disable send button
        console.log('message sentto add suggest!!!');
        this.addMessage('<div id="loader-resp"></div>', 'ai', 'html');
        // removing the buttons
        const suggestion1 = document.getElementById('suggestion-button-1');
        const suggestion2 = document.getElementById('suggestion-button-2');
        suggestion1.style.display = 'none';
        suggestion2.style.display = 'none';

    }
    // Send Button input msg
    handleSendButtonClick() {
        document.getElementById('send-button').disabled = true;  // disable send button
        const input = document.getElementById('message-input');
        const text = input.value;
        input.value = '';
        console.log('text', text);
        if (text === '') {
            document.getElementById('send-button').disabled = false;
            return;
        }
        this.sendMessage(text);
        this.addMessage(text, 'human', 'text');
        console.log('message sent !!!');
        this.addMessage('<div id="loader-resp"></div>', 'ai', 'html');

    }

    // Auto send using Enter key
    handleMessageInputKeyPress(event) {
        if (event.key === 'Enter') {
            document.getElementById('send-button').click();
        }
    }


    addMessage(msg, sender, type, timestamp) {
        console.log('line 155 add message called')
        const messagesElement = document.getElementById('messages');
        const messageWrapper = document.createElement('div');
        messageWrapper.className = `${sender}-wrapper`;

        const messageElement = document.createElement('li');
        if (sender === 'ai' && type === 'html') {
            messageElement.innerHTML = msg;
        } else {
            messageElement.textContent = msg;
        }
        messageElement.className = sender;
        console.log('messageElement', messageElement);

        // Add profile picture to AI messages
        if (sender === 'ai') {
            const profilePic = document.createElement('div');
            profilePic.className = 'profile-pic';
            messageWrapper.appendChild(profilePic);
        }
        // Add timestamp only time is needed here..
        messageWrapper.appendChild(messageElement);
        messagesElement.appendChild(messageWrapper);
        if (sender !== 'ai') {
            const timestampElement = document.createElement('span');
            const dateTime = new Date();
            const hours = String(dateTime.getHours()).padStart(2, '0');
            const minutes = String(dateTime.getMinutes()).padStart(2, '0');
            const time = `${hours}:${minutes}`;
            timestampElement.textContent = time;
            timestampElement.className = 'timestamp-human';
            messagesElement.appendChild(timestampElement);
        }
        setTimeout(() => {
            messagesElement.scrollTop = messagesElement.scrollHeight;
        }, 0);
    }

    // get cookie by name
    getCookie(name) {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }
    // set cookie
    setCookie(name, value, options = {}) {
        options = {
            path: '/',
            ...options
        };

        if (options.expires instanceof Date) {
            options.expires = options.expires.toUTCString();
        }

        let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

        for (let optionKey in options) {
            updatedCookie += "; " + optionKey;
            let optionValue = options[optionKey];
            if (optionValue !== true) {
                updatedCookie += "=" + optionValue;
            }
        }

        document.cookie = updatedCookie;
        console.log('cookie set ', document.cookie);
    }

    /* Send  msg to the ws-connection */
    sendMessage(message) {
        /* Removing the suggestion buttons */
        const suggestion1 = document.getElementById('suggestion-button-1');
        const suggestion2 = document.getElementById('suggestion-button-2');
        suggestion1.style.display = 'none';
        suggestion2.style.display = 'none';

        /*  sending/connecting with web socket  */
        if (!this.ws && this.ws.readyState !== WebSocket.OPEN) {
            this.connect();
        }
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            /* sending message to websocket */
            this.ws.send(JSON.stringify({
                'message': message,
            }));
        } else {
            alert('WebSocket disconnected.. message not sent..');
            throw new Error('WebSocket connection is not able to connect..');

        }
    }

    /* Connect to the ws-connection INITIAL CONNECTION*/
    async connect() {
        try {
            this.ws = new WebSocket(`ws://74.235.101.118:8001/chat/${this.chatbotId}/${this.conversationId}/ws`);
            console.log('new cannection made websocket ', this.ws);
            this.ws.onopen = () => {
                console.log('WebSocket connection opened', this.ws);
                //document.getElementById('send-button').disabled = true;  // disable send button
                if (this.conversationId === null) {
                    this.ws.send(JSON.stringify({
                        'message': 'Hi'
                    }));
                    console.log('message sent as Hi');
                    this.addMessage('<div id="loader-resp"></div>', 'ai', 'html');

                }
            };
            this.ws.onmessage = (event) => {
                if (!this.isFetching) document.getElementById('send-button').disabled = false;  // Enable send button
                let data = JSON.parse(event.data);
                console.log('WebSocket message received:', data);
                if (this.conversationId === null && data.conversation_id) {
                    this.setCookie('conversation_id', data.conversation_id);
                    this.conversationId = data.conversation_id;
                    console.log('cookie is set as ', document.cookie);
                }
                console.log("response from server ******** ", data.message);
                if (data.message) {
                    const messagesElement = document.getElementById('messages');
                    console.log('messagesElement', messagesElement);
                    const lastAIMessage = messagesElement.querySelector('li.ai div#loader-resp');
                    if (lastAIMessage) {
                        const newMessageElement = document.createElement('li');
                        newMessageElement.className = 'ai';
                        const newMessageWrapper = document.createElement('div');
                        newMessageWrapper.className = 'ai-wrapper';
                        newMessageWrapper.appendChild(newMessageElement);

                        if (data.type === 'html') {
                            console.log('lost data.message');
                            newMessageElement.innerHTML = data.message.replace(/\n/g, '<br/>');
                        } else {
                            newMessageElement.innerHTML = data.message.replace(/\n/g, '<br/>');
                        }
                        const timestampElement = document.createElement('span');
                        const dateTime = new Date();
                        const hours = String(dateTime.getHours()).padStart(2, '0');
                        const minutes = String(dateTime.getMinutes()).padStart(2, '0');
                        const time = `${hours}:${minutes}`;
                        timestampElement.textContent = time;
                        timestampElement.className = 'timestamp-ai';
                        lastAIMessage.parentNode.parentNode.replaceChild(newMessageElement, lastAIMessage.parentNode);
                        messagesElement.appendChild(timestampElement);
                        messagesElement.scrollTop = messagesElement.scrollHeight;
                    }
                    else {
                        this.addMessage(data.message, 'ai', data.type);
                    }
                }
                if (data.suggestions && data.suggestions.length > 0) {
                    console.log('suggestion data', data.suggestions);
                    const suggestion1 = document.getElementById('suggestion-button-1');
                    const suggestion2 = document.getElementById('suggestion-button-2');

                    if (data.suggestions[0]) {
                        suggestion1.textContent = data.suggestions[0];
                        suggestion1.style.display = 'flex';
                    }
                    if (data.suggestions[1]) {
                        suggestion2.textContent = data.suggestions[1];
                        suggestion2.style.display = 'flex';
                    }
                } else {
                    const suggestion1 = document.getElementById('suggestion-button-1');
                    const suggestion2 = document.getElementById('suggestion-button-2');
                    suggestion1.style.display = 'none';
                    suggestion2.style.display = 'none';
                }
            };
            this.ws.onerror = (error) => {
                console.log('WebSocket error !: ' + error.reason);
            };
            this.ws.onclose = (event) => {
                console.log("WebSocket connection closed:", event);
            };
        } catch (error) {
            console.log('WebSocket error catched:', error);
        }
    }

    /* Fetch old chat history */
    async fetchChatHistory() {
        try {
            console.log('Inside fetchHistory function');
            let response = await fetch(`http://74.235.101.118:8001/chatbot${this.chatbotId}/conversation/${this.conversationId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // 'ngrok-skip-browser-warning': 'any',
                    'Authorization': 'Bearer 115.98.83.23',
                    'bypass-tunnel-reminder': '1234',

                }
            });
            console.log('response', response);
            let data = await response.json();
            console.log('data', data);
            if (data.status === 200) {
                let messagesElement = document.getElementById('messages');
                data.data.forEach(message => {
                    let messageWrapper = document.createElement('div');
                    messageWrapper.className = `${message.type}-wrapper`;

                    let messageElement = document.createElement('li');
                    messageElement.innerHTML = message.message.replace(/\n/g, '<br/>');
                    messageElement.className = message.type;
                    if (message.type === 'ai') {
                        const profilePic = document.createElement('div');
                        profilePic.className = 'profile-pic';
                        messageWrapper.appendChild(profilePic);
                    }
                    messageWrapper.appendChild(messageElement);
                    messagesElement.appendChild(messageWrapper);

                    // Add timestamp if provided
                    if (message.timestamp) {
                        const timestampElement = document.createElement('span');
                        const dateTime = new Date(message.timestamp);
                        const date = dateTime.toLocaleDateString();
                        const time = dateTime.toLocaleTimeString().slice(0, 5);
                        timestampElement.textContent = `${date} · ${time}`;
                        timestampElement.className = `timestamp-${message.type}`;
                        messagesElement.appendChild(timestampElement);
                    }
                    messagesElement.scrollTop = messagesElement.scrollHeight;

                });
            } else {
                console.error('Failed to fetch chat history:', data.error);
            }
        } catch (error) {
            console.error('Failed to fetch chat history:', error);
        } finally {
            this.isFetching = false;
        }
    }

}
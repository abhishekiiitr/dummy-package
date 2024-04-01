const chatboxHTML = `./index.html`
const chatboxCSS = `./styles.css`
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
        this.appendHTMLAndCSS().then(() => {
            this.addEventListeners();
        });
        document.getElementById('notif').classList.toggle('visible');

    }
    async appendHTMLAndCSS() {
        const responseHTML = await fetch(chatboxHTML);
        const responseCSS = await fetch(chatboxCSS);
        const html = await responseHTML.text();
        const css = await responseCSS.text();
        document.body.innerHTML += html;
        const style = document.createElement('style');
        style.innerHTML = css;
        document.head.appendChild(style);
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
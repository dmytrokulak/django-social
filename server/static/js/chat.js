document.addEventListener("DOMContentLoaded", () => {
    setupChatSoket();
    setEventListeres();
});

const setupChatSoket = () => {

    const roomName = JSON.parse(document.getElementById('room-name').textContent);
    const userMe = JSON.parse(document.getElementById('user_me').textContent);
    const isMultiChat = JSON.parse(document.getElementById('multi_chat').textContent);

    //multichat means a chat between more than two persons
    if (isMultiChat) {
        document.querySelector('#chat-message-input').disabled = false;
        document.querySelector('#chat-message-submit').disabled = false;
        document.querySelector('#chat-message-info').innerHTML = '';
        const initText = JSON.parse(document.getElementById('chat_log_value').textContent);
        document.querySelector('#chat-log').value += initText + '\n';
    }

    const chatSocket = new WebSocket('ws://' + window.location.host + '/ws/' + roomName + '/');

    chatSocket.onmessage = function (e) {
        const data = JSON.parse(e.data);

        if (data.user == userMe && data.message === 'joined the chat') {
            return;
        }
        if (data.user != userMe && data.message === 'joined the chat' &&
            document.querySelector('#chat-message-input').disabled) {
            document.querySelector('#chat-message-input').disabled = false;
            document.querySelector('#chat-message-submit').disabled = false;
            document.querySelector('#chat-message-info').innerHTML = '';

            chatSocket.send(JSON.stringify({
                'message': 'joined the chat',
                'user': userMe
            }));
        }

        const line = data.user + ": " + data.message + '\n';
        if (data.user != userMe && data.message === 'joined the chat'
            && document.querySelector('#chat-log').value.includes(line)) {
            return;
        }
        document.querySelector('#chat-log').value += line;
    };

    chatSocket.onclose = function (e) {
        console.error('Chat socket closed unexpectedly');
    };

    chatSocket.onopen = function (e) {
        //a system notification about joining the chat
        chatSocket.send(JSON.stringify({
            'message': 'joined the chat',
            'user': userMe
        }));
    };

    document.querySelector('#chat-message-input').focus();
    document.querySelector('#chat-message-input').onkeyup = function (e) {
        if (e.keyCode === 13) {  // enter, return
            document.querySelector('#chat-message-submit').click();
        }
    };

    document.querySelector('#chat-message-submit').onclick = function (e) {
        const messageInputDom = document.querySelector('#chat-message-input');
        const message = messageInputDom.value;
        chatSocket.send(JSON.stringify({
            'message': message,
            'user': userMe
        }));
        messageInputDom.value = '';
    };
}

const setEventListeres = () => {
    const elements = document.querySelectorAll('.btn-user-friend-add');
    const roomName = JSON.parse(document.getElementById('room-name').textContent);
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        element.addEventListener('click', e => {
            const userId = e.target.dataset.userId;
            fetch('/api/me/chat/' + String(userId), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': document.getElementById("id_csrf_token").value
                },
                body: JSON.stringify({ chat_room: roomName })
            })
                .then(data => {
                    if (data.ok) {
                        e.target.classList.remove('btn-primary')
                        e.target.classList.add('btn-success')
                        e.target.disabled = true
                        e.target.innerText = 'Sent'
                    }
                })
                .catch(error => console.error(error));
        })
    }
}
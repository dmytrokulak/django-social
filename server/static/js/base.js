document.addEventListener("DOMContentLoaded", () => {
    setPolling();
});

//polls for chat requests and displays in a side pane if any
const setPolling = () => {
    const elChatsPane = document.getElementById("id_chats_pane")

    setTimeout(() => {
        fetch('/api/me/chat', {
            method: 'GET'
        })
            .then(response => response.status == 200 ? response.json() : null)
            .then(data => {
                if (data) {
                    for (let i = 0; i < data.length; i++) {
                        if (data[i] && !document.getElementById("id_chat_request_" + data[i].id)) {
                            const btn = document.createElement('button')
                            btn.classList.add('btn')
                            btn.classList.add('btn-primary')
                            btn.classList.add('my-1')
                            btn.addEventListener('click', (e) => {
                                window.document.location = '/users/' + data[i].username + '/chat/'
                            })
                            btn.innerText = 'Chat request from ' + data[i].username
                            btn.id = "id_chat_request_" + data[i].id
                            elChatsPane.append(btn)
                        }
                    }
                }
                setPolling()
            })
            .catch(error => console.error(error));
    }, 15000);
}
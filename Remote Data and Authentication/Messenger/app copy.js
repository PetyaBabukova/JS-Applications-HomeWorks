function attachEvents() {
    const url = 'http://localhost:3030/jsonstore/messenger'

    let sendBtn = document.getElementById('submit');
    sendBtn.addEventListener('click', (e) => {
        e.preventDefault();

        let name = document.querySelector('input[name="author"]').value;
        let message = document.querySelector('input[name="content"]').value;

        let data = {
            author: name,
            content: message,
        };

        fetch(url, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Failed to send message');
            }
            return res.json();
        })
        .then(() => {
            document.querySelector('input[name="author"]').value = '';
            document.querySelector('input[name="content"]').value = '';
        })
        .catch(error => console.error('Error:', error)); 
    });

    let refreshBtn = document.getElementById('refresh');
    refreshBtn.addEventListener('click', (e) => {
        e.preventDefault();
        let textarea = document.getElementById('messages');
        textarea.value = ''; 
        fetch(url)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to fetch messages');
                }
                return res.json();
            })
            .then(data => {
                Object.values(data).forEach(x => {
                    textarea.value += `${x.author}: ${x.content}\n`;
                });
            })
            .catch(error => console.error('Error:', error)); 
    });
}

attachEvents();

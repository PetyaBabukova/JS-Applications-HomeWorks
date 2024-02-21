const url = 'http://localhost:3030/jsonstore/messenger';

const messages = document.getElementById('messages');

function attachEvents() {
    let sendBtn = document.getElementById('submit');
    sendBtn.addEventListener('click', postMessage);

    let refreshBtn = document.getElementById('refresh');
    refreshBtn.addEventListener('click', loadAllMessages);
};

async function loadAllMessages() {
    const res = await fetch(url);
    const data = await res.json();

    //messages
    messages.value = Object.values(data).map(({ author, content }) => `${author}: ${content}`).join('\n');
};

async function postMessage() {

    const [author, content] = [document.querySelector('input[name="author"]'), document.querySelector('input[name="content"]')];

    if (author.value === '' || content.value === '') {
        return;
    };

    
    await request(url, { author: author.value, content: content.value });
    author.value = '';
    content.value = '';
};

async function request(url, option) {
    if (option) {
        option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(option)
        };

    };
    const response = await fetch(url, option);

    return response.json()
}

attachEvents();

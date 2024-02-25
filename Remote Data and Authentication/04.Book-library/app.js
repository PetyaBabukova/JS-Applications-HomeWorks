const loadBtn = document.getElementById('loadBooks');
const baseUrl = 'http://localhost:3030/jsonstore/collections/books';

let formElement = document.querySelector('form')

let titleElement = document.querySelector('input[name="title"]');
let authorElement = document.querySelector('input[name="author"]');

const tableElement = document.querySelector('table tbody')
loadBtn.addEventListener('click', loadAllBooks);

function loadAllBooks() {
    tableElement.innerHTML = ''
    fetch(baseUrl)
        .then(res => {
            if (!res.ok) {
                throw new Error('Connection Error');
            }
            return res.json()
        })
        .then(data => {
            Object.entries(data).forEach(([id, { title, author }]) => {
                let rowElement = document.createElement('tr');
                let buttonContainer = document.createElement('td');

                let titleElement = createElementWithContent('td', title);
                let authorElement = createElementWithContent('td', author);

                let editBtn = createElementWithContent('button', "Edit");
                editBtn.setAttribute('id', id);
                editBtn.addEventListener('click', (e) => {
                    e.preventDefault();

                    editBook(e.currentTarget.id)
                })

                let deleteButton = createElementWithContent('button', 'Delete');
                deleteButton.setAttribute('id', id);
                deleteButton.addEventListener('click', (e) => {
                    e.preventDefault();

                    deleteBook(e.currentTarget.id)
                });

                buttonContainer.appendChild(editBtn);
                buttonContainer.appendChild(deleteButton);

                rowElement.appendChild(titleElement);
                rowElement.appendChild(authorElement);
                rowElement.appendChild(buttonContainer);

                tableElement.appendChild(rowElement);
            })
        })
};


formElement.addEventListener('submit', (e) => {
    e.preventDefault();
    let action = document.querySelector('input[name="action"]').value;
    if (action === 'create') {
        createBook({ title: titleElement.value, author: authorElement.value });
    } else {
        const id = document.querySelector('input[name="id"]').value;
        updateBook(id, { title: titleElement.value, author: authorElement.value });
    }
});


function createBook(body) {
    fetch(baseUrl, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Unsuccessful creating book')
            };
            return res.json()
        })
        .then(() => {
            loadAllBooks()
        })
};

function editBook(id) {
    fetch(`${baseUrl}/${id}`)
        .then(response => response.json())
        .then(data => {
            titleElement.value = data.title;
            authorElement.value = data.author;
            document.querySelector('input[name="id"]').value = id;
            document.querySelector('input[name="action"]').value = 'edit';
            document.querySelector('form h3').textContent = 'Edit Book';
        })
        .catch(err => console.error(err));
}

function updateBook(id, body) {
    fetch(`${baseUrl}/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
        .then(response => response.json())
        .then(() => {
            loadAllBooks();
            document.querySelector('form h3').textContent = 'Add Book';
            document.querySelector('input[name="action"]').value = 'create';
            formElement.reset();
        })
        .catch(err => console.error(err));
}


function deleteBook(id) {
    titleElement.value = '';
    authorElement.value = '';

    fetch(`${baseUrl}/${id}`, { method: "DELETE" })
        .then(() => {
            alert('Book has been deleted');
            loadAllBooks();
        })
        .catch(err => console.error(err));
}



function createElementWithContent(tag, content) {
    let element = document.createElement(tag);
    element.textContent = content;

    return element;

};
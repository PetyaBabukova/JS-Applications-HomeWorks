const url = 'http://localhost:3030/jsonstore/phonebook';
let list = document.getElementById('phonebook');

function attachEvents() {
    // Get all
    let loadBtn = document.getElementById('btnLoad');
    loadBtn.addEventListener('click', getAll);

    let createBtn = document.getElementById('btnCreate');
    createBtn.addEventListener('click', createEntry)
}

function getAll() {
    fetch(url)
        .then(res => {
            if (!res.ok) {
                throw new Error (`HTTP error! status: ${res.status}`)
            };
            return res.json()
        })
        .then(data => {
            Object.values(data).map(x=>{
                let liElement = document.createElement('li');
                liElement.textContent = `${x.person}: ${x.phone}`;
                
                let deleteBtn = document.createElement('button');
                deleteBtn.id = x._id;
                deleteBtn.textContent = "Delete";

                deleteBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    deleteEntry(e.target.id); 
                });
                
                
                liElement.appendChild(deleteBtn);
                list.appendChild(liElement);


            })
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error.message);
        });
};

function deleteEntry(id) {
    fetch(`${url}/${id}`, {
        method: 'DELETE'
    })
    .then(res =>{
        if (!res.ok) {
            throw new Error('Unsuccessful delete')
        }
        res.json()})
    .then(data => console.log(data))
    .catch(err => console.error('Unsuccessfully delete:', err.message))
};

function createEntry() {
    let person = document.getElementById('person').value;
    let phone = document.getElementById('phone').value;

    let body = {
        person,
        phone
      }
      
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(data => {
        list.innerHTML = '';
        getAll()
    })
}

attachEvents();
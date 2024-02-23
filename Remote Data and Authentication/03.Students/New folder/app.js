let form = document.getElementById('form');
let tableElement = document.querySelector('tbody');
const baseUrl = 'http://localhost:3030/jsonstore/collections/students';

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let data = new FormData(e.currentTarget);
    let body = Object.fromEntries(data);
    addStudent(body);
    form.reset(); 
});

function addStudent(body) {

    Object.values(body).forEach(x=>{
        if (x === '') {
            throw new Error ('All fields are required!')
        }
    })
    fetch(baseUrl, {
        method: 'POST',
        headers: { // Corrected typo
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(() => {
        tableElement.innerHTML = '';
        fetch(baseUrl)
            .then(res => {
                if (!res.ok) {
                    throw new Error('DB connecting issues')
                }
                return res.json()
            })
            .then(data => {

                Object.entries(data).forEach(([id, student]) => { // Corrected access to student data
                    let tableRowElement = document.createElement('tr');

                    let firstNameEl = createElementWithContent('td', student.firstName);
                    let lastNameEl = createElementWithContent('td', student.lastName);
                    let facultyNumberEl = createElementWithContent('td', student.facultyNumber);
                    let gradeEl = createElementWithContent('td', student.grade);

                    tableRowElement.append(firstNameEl, lastNameEl, facultyNumberEl, gradeEl);
                    tableElement.appendChild(tableRowElement);
                });
            });
    })
    .catch(err => console.log(err));
}

function createElementWithContent(tag, content) {
    let element = document.createElement(tag);
    element.textContent = content;

    return element;

}
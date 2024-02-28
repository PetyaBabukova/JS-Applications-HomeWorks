let registerNavEl = document.getElementById('register');
let loginNavEl = document.getElementById('login');
let wellcomeElement = document.querySelector('.email span');
let logoutNavEl = document.getElementById('logout');

logoutNavEl.addEventListener('click', logout)

let isLogged = localStorage.getItem('accessToken');
let email = localStorage.getItem('email');
// console.log(isLogged);



function logout(e) {
    e.preventDefault();

    fetch(`http://localhost:3030/users/logout`, {
        method: "GET", // Usually, logout should be a GET request but follow what your API requires
        headers: {
            "X-Authorization": localStorage.getItem('accessToken') // It's better to get fresh data from localStorage
        }
    })
    .then(res => {
        if (res.status !== 204) {
            throw new Error('Unsuccessful logout!');
        }
        return res.text(); // No need to parse JSON for a 204 No Content response
    })
    .then(() => {
        localStorage.clear();
        updateUIForLoggedOutState();
        window.location.href = 'index.html'; // Redirect to the home page after logout
    })
    .catch(error => {
        console.error(error.message);
        alert(error.message); // Inform the user in case of an error
    });
}

function updateUIForLoggedOutState() {
    if (isLogged) {
        registerNavEl.style.display = 'none';
        loginNavEl.style.display = 'none';
        wellcomeElement.textContent = email;
    
    } else {
        registerNavEl.style.display = 'inline-block';
        loginNavEl.style.display = 'inlin-block';
        wellcomeElement.textContent = 'guest';
    }
};

let catchesUrl = 'http://localhost:3030/data/catches';
let loadBtn = document.querySelector('.load');
let loadForm = document.getElementById('addForm');

loadBtn.addEventListener('click', loadCatches)

function loadCatches(e) {
    e.preventDefault();

    fetch(catchesUrl)
    .then( res => res.json())
    .then(data =>{
        data.forEach(x => {
            console.log(x);
        });
    })
};

// function createElementWithClassAndContent(tagName, className, content){
//     let element = document.createElement(tagName);
//     element.classList.add = className;
//     element.value = content;
// }

updateUIForLoggedOutState();

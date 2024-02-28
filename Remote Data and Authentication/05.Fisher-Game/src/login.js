let loginFormEl = document.querySelector("form[id='login']");
const baseUrl = 'http://localhost:3030/users/login';

let welcomeElement = document.querySelector('.email span');
let registerNavEl = document.getElementById('register');
let loginNavEl = document.getElementById('login');
let logoutNavEl = document.getElementById('logout');

loginFormEl.addEventListener('submit', onLoginSubmit);

async function onLoginSubmit(e) {
    e.preventDefault();

    let data = new FormData(e.currentTarget);
    let email = data.get('email');
    let password = data.get('password');

    if (!email || !password) {
        displayError('Both email and password are required.');
        return;
    }

    try {
        let response = await fetch(baseUrl, {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Login failed');
        }

        let userData = await response.json();
        localStorage.setItem('accessToken', userData.accessToken);
        localStorage.setItem('id', userData._id);
        localStorage.setItem('email', userData.email);
        
        welcomeElement.textContent = `Welcome, ${userData.email}`;
        loginNavEl.style.display = 'none';
        registerNavEl.style.display = 'none';
        logoutNavEl.style.display = 'block';

        window.location.href = 'index.html';
    } catch (error) {
        console.error(error.message);
        displayError(error.message);
    }
}

function displayError(message) {
    const errorBox = document.querySelector('.notification');
    errorBox.textContent = message;
    errorBox.style.display = 'block';
    // Hide the error message after 3 seconds or when the user starts to type again
    setTimeout(() => errorBox.style.display = 'none', 3000);
}



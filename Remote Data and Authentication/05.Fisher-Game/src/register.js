let registerFormEl = document.querySelector("form[id='register']");
const baseUrl = 'http://localhost:3030/users/register';

let registerNavEl = document.getElementById('register');
let loginNavEl = document.getElementById('login');
let wellcomeElement = document.querySelector('.email span');

registerFormEl.addEventListener('submit', onSubmit);

async function onSubmit(e) {
    e.preventDefault();

    let data = new FormData(e.currentTarget);
    let { email, password, rePass } = Object.fromEntries(data);

    if (!email || !password || !rePass) {
        displayError('All fields are required!');
        return;
    }
    if (password !== rePass) {
        displayError('Passwords do not match!');
        return;
    }

    let body = { email, password };

    try {
        let response = await fetch(baseUrl, {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }

        let data = await response.json();

        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('id', data._id);
        localStorage.setItem('email', data.email);
        wellcomeElement.textContent = email;

        window.location.href = 'index.html';
    } catch (error) {
        console.error(error.message);
        displayError(error.message);
    }
}

function displayError(message) {
    // Assuming there's an element with class 'error' to display the error message
    const errorBox = document.querySelector('.error');
    errorBox.textContent = message;
    errorBox.style.display = 'block';
    // Hide the error message after some time or on user action
    setTimeout(() => errorBox.style.display = 'none', 3000);
}




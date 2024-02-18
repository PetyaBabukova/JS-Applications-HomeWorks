function lockedProfile() {
    fetch('http://localhost:3030/jsonstore/advanced/profiles')
        .then(res => res.json())
        .then(data => {
            const mainElement = document.getElementById('main');
            // Clear main element content except for the template (if you want to keep a static template)
            mainElement.innerHTML = '';

            Object.values(data).forEach((user, index) => {
                const profileDiv = document.createElement('div');
                profileDiv.classList.add('profile');

                const lockInput = `
                <img src="./iconProfile2.png" class="userIcon" />
                <label>Lock</label>
                    <input type="radio" name="user${index}Locked" value="lock" checked>
                    <label>Unlock</label>
                    <input type="radio" name="user${index}Locked" value="unlock"><br>`;
                const userInfoHTML = `<hr>
                    <label>Username</label>
                    <input type="text" name="user${index}Username" value="${user.username}" disabled readonly />
                    <div id="user${index}Details" style="display: none;">
                        <hr>
                        <label>Email:</label>
                        <input type="email" name="user${index}Email" value="${user.email}" disabled readonly />
                        <label>Age:</label>
                        <input type="text" name="user${index}Age" value="${user.age}" disabled readonly />
                    </div>
                    <button>Show more</button>`;

                profileDiv.innerHTML = lockInput + userInfoHTML;
                mainElement.appendChild(profileDiv);

                const button = profileDiv.querySelector('button');
                button.addEventListener('click', function() {
                    const isLocked = profileDiv.querySelector('input[type="radio"][value="lock"]').checked;
                    if (!isLocked) {
                        const detailsDiv = profileDiv.querySelector('div');
                        if (button.textContent === 'Show more') {
                            detailsDiv.style.display = 'block';
                            button.textContent = 'Hide it';
                        } else {
                            detailsDiv.style.display = 'none';
                            button.textContent = 'Show more';
                        }
                    }
                });
            });
        })
        .catch(err => console.error(err));
}

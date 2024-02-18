async function lockedProfile() {
  const main = document.getElementById('main');
  main.innerHTML = ''; // Clear existing content

  try {
      const response = await fetch('http://localhost:3030/jsonstore/advanced/profiles');
      const data = await response.json();

      Object.entries(data).forEach(([id, userData], index) => {
          const profileDiv = document.createElement('div');
          profileDiv.classList.add('profile');

          profileDiv.innerHTML = `
              <img src="./iconProfile2.png" class="userIcon" />
              <label>Lock</label>
              <input type="radio" name="user${index}Locked" value="lock" checked>
              <label>Unlock</label>
              <input type="radio" name="user${index}Locked" value="unlock"><br>
              <hr>
              <label>Username</label>
              <input type="text" name="user${index}Username" value="${userData.username}" disabled readonly />
              <div id="user${index}Details" style="display: none;">
                  <hr>
                  <label>Email:</label>
                  <input type="email" name="user${index}Email" value="${userData.email}" disabled readonly />
                  <label>Age:</label>
                  <input type="age" name="user${index}Age" value="${userData.age}" disabled readonly />
              </div>
              <button>Show more</button>
          `;

          const button = profileDiv.querySelector('button');
          button.addEventListener('click', function() {
              const isLocked = profileDiv.querySelector('input[type="radio"][value="lock"]').checked;
              const detailsDiv = profileDiv.querySelector('div');

              if (!isLocked) {
                  const isVisible = detailsDiv.style.display === 'block';
                  detailsDiv.style.display = isVisible ? 'none' : 'block';
                  button.textContent = isVisible ? 'Show more' : 'Hide it';
              }
          });

          main.appendChild(profileDiv);
      });
  } catch (error) {
      console.error('Failed to load profile data:', error);
  }
}

//https://pastebin.com/KqCUFUCX


async function solve() {
    const url = 'http://localhost:3030/jsonstore/collections/students';

    const table = document.querySelector('#results tbody');

    const res = await fetch(url);

    const data = await res.json();

    Object.values(data).forEach(s => {
        const firstName = s.firstName;
        const lastName = s.lastName;
        const facultyNumber = s.facultyNumber;
        const grade = Number(s.grade);

        const tr = document.createElement('tr');

        tr.insertCell(0).innerText = firstName;
        tr.insertCell(1).innerText = lastName;
        tr.insertCell(2).innerText = facultyNumber;
        tr.insertCell(3).innerText = grade;


        table.appendChild(tr);

    });

    const submitBtn = document.getElementById('submit');
    submitBtn.addEventListener('click', onClickSubmit);

    async function onClickSubmit(e) {
        e.preventDefault();

        const firstNameInput = document.getElementsByName('firstName')[0];
        const lastNameInput = document.getElementsByName('lastName')[0];
        const facultyNumberInput = document.getElementsByName('facultyNumber')[0];
        const gradeInput = document.getElementsByName('grade')[0];

        // const inputsArray = document.querySelectorAll('.inputs input');

        // Array.from(inputsArray).map ( input=>{
        //     input.setAttribute('required', true);
        // })

        if (isNaN(facultyNumberInput.value) || isNaN(gradeInput.value)) {
            return alert('Wrong input data!')
        };

        if (firstNameInput.value !== '' && lastNameInput.value  !== '' && facultyNumberInput.value  !== '' && gradeInput.value  !== '') {
            return
        }

        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                firstName: firstNameInput.value,
                lastName: lastNameInput.value,
                facultyNumber: facultyNumberInput.value,
                grade: Number(gradeInput.value),
            })
        })

        const tr = document.createElement('tr');

        tr.insertCell(0).innerText = firstNameInput.value;
        tr.insertCell(1).innerText = lastNameInput.value;
        tr.insertCell(2).innerText = facultyNumberInput.value;
        tr.insertCell(3).innerText = gradeInput.value;


        table.appendChild(tr);

        firstNameInput.value = ''
        lastNameInput.value = ''
        facultyNumberInput.value = ''
        gradeInput.value = ''
    }


};

solve();
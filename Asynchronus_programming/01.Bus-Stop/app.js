// async function getInfo() {
//     let busesListEl = document.getElementById('buses');
//     busesListEl.innerHTML = ''; 

//     let stopIDElement = document.getElementById('stopId');
//     let stopId = stopIDElement.value;

//     let busStopEl = document.getElementById('stopName'); 

//     let baseUrl = 'http://localhost:3030/jsonstore/bus/businfo';




//     try {
//         const response = await fetch(`${baseUrl}/${stopId}`);

//         const data = await response.json();
    
//         busStopEl.textContent = data.name;
    
//         Object.entries(data.buses).forEach(([busId, time]) => {
//             const liEl = document.createElement('li');
//             liEl.textContent = `Bus ${busId} arrives in ${time} minutes`;
//             busesListEl.appendChild(liEl);
//         });
//     } catch (error) {
//         console.log('...err...', error);
//         busStopEl.textContent = 'Error'
//     }
// }

function getInfo() {
    let baseUrl = 'http://localhost:3030/jsonstore/bus/businfo';
    let stopIDElement = document.getElementById('stopId');
    let stopId = stopIDElement.value;

    // Ensure busStopEl is defined within the getInfo scope
    let busStopEl = document.getElementById('stopName'); 
    let busesListEl = document.getElementById('buses');

    fetch(`${baseUrl}/${stopId}`)
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok.'); // This will direct flow to the .catch()
            }
            return res.json();
        })
        .then(data => {
            let buses = data.buses;
            let stopName = data.name;

            busStopEl.textContent = stopName;
            busesListEl.innerHTML = ''; // Clear previous entries

            Object.entries(buses).forEach(([busId, time]) => {
                let liEl = document.createElement('li');
                liEl.textContent = `Bus ${busId} arrives in ${time} minutes`;
                busesListEl.appendChild(liEl);
            });
        })
        .catch(error => {
            // consol.error('Failed to fetch bus stop information:', error);
            busStopEl.textContent = 'Error';
            // busesListEl.innerHTML = ''; // Clear previous bus list entries
        });
}



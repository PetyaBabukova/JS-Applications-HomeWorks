function getInfo() {

    let busesListEl = document.getElementById('buses');
                busesListEl.innerHTML = '';

    let baseUrl = 'http://localhost:3030/jsonstore/bus/businfo';

    let stopIDElement = document.getElementById('stopId');
    let stopId = stopIDElement.value;

    fetch(`${baseUrl}/${stopId}`)
        .then(res => res.json()
            .then(data => {
                // console.log(data)
                let buses = data.buses;

                let stopName = data.name;

                let busStopEl = document.getElementById('stopName');
                busStopEl.textContent = stopName;

                let busesListEl = document.getElementById('buses');
                busesListEl.innerHTML = '';

                Object.entries(buses)
                    .forEach(([busId, time]) => {

                        let contentLi = `Bus ${busId} arrives in ${time} minutes`;

                        let liEl = document.createElement('li');
                        liEl.textContent = contentLi;
                        // console.log(contentLi);
                        busesListEl.appendChild(liEl);

                    })
            }))
        .catch(error => busStopEl.textContent = 'Error');
}
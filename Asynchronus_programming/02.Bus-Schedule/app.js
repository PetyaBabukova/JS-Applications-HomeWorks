function solve() {

    const baseUrl = 'http://localhost:3030/jsonstore/bus/schedule';

    const stopInfoEl = document.querySelector('.info');
    const departBtn = document.getElementById('depart');
    const arriveBtn = document.getElementById('arrive');

    let nextStiop = 'depot';
    let stopName = '';


    function depart() {
        fetch(`${baseUrl}/${nextStiop}`)
        .then(res => res.json())
        .then(data => {
            stopInfoEl.textContent = data.name;
            arriveBtn.disabled = false;
            departBtn.disabled = true;
            nextStiop = data.next;
        })
        .catch(err=>{
            stopInfoEl.textContent = 'Error';
            arriveBtn.disabled = true;
            departBtn.disabled = true;
        })
    
    };

    function arrive() {
        fetch(`${baseUrl}/${nextStiop}`)
        .then(res => res.json())
        .then(data => {
            stopInfoEl.textContent = data.name;
            arriveBtn.disabled = true;
            departBtn.disabled = false;
            nextStiop = data.next;
        })
        .catch(err=>{
            arriveBtn.disabled = true;
            departBtn.disabled = true;
        })
    };

    return {
        depart,
        arrive
    };
}

let result = solve();
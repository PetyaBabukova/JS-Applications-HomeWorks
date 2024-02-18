function attachEvents() {

    let locationInputEl = document.getElementById('location');
    let submitBtn = document.getElementById('submit');
    let forecastDivEl = document.getElementById('forecast');
    let currentDivEl = document.getElementById('current');
    let upcommingDivEl = document.getElementById('upcoming');
    let forecastClassEl = createElWithClassAndTextContent('div', 'forecast', undefined);


    let locationsUrl = 'http://localhost:3030/jsonstore/forecaster/locations';

    let oneDayForecatsUrl = 'http://localhost:3030/jsonstore/forecaster/today';

    let threeDayForecastUrl = 'http://localhost:3030/jsonstore/forecaster/upcoming';

    let symbols = {
        'Sunny': '☀',
        'Partly sunny': '⛅',
        'Overcast': '☁',
        'Rain': '☂',
        'Degrees': '°',
    }


    submitBtn.addEventListener('click', (e) => {
        e.preventDefault()
        let locaton = locationInputEl.value.toLowerCase();
        // locaton = locaton.toLowerCase()


        fetch(locationsUrl)
            .then(res => res.json())
            .then(data => {
                let searchedLocation = data.find(x => x.name.toLowerCase() === locaton
                )

                fetch(`${oneDayForecatsUrl}/${searchedLocation.code}`)
                    .then(res => res.json())
                    .then(data => {
                        // console.log(data);
                        // console.log(data.forecast['low']);

                        let symbolEl = createElWithClassAndTextContent('span', 'condition', symbols[data.forecast['condition']]);
                        symbolEl.classList.add('symbol');
                        let conditionEl = createElWithClassAndTextContent('span', 'condition', undefined);
                        let cityEl = createElWithClassAndTextContent('span', 'forecast-data', `${data.name}`);
                        let temperatureEl = createElWithClassAndTextContent('span', 'forecast-data', `${data.forecast['low']}${symbols['Degrees']}/${data.forecast['high']}${symbols['Degrees']}`);
                        let feelingEl = createElWithClassAndTextContent('span', 'forecast-data', data.condition);

                        forecastDivEl.style.display = 'block';

                        conditionEl.appendChild(cityEl);
                        conditionEl.appendChild(temperatureEl);
                        conditionEl.appendChild(feelingEl);
                        forecastClassEl.appendChild(symbolEl);
                        forecastClassEl.appendChild(conditionEl);

                        currentDivEl.appendChild(forecastClassEl)
                    })
                    .catch(err => forecastClassEl.textContent = 'Error')

                fetch(`${threeDayForecastUrl}/${searchedLocation.code}`)
                    .then(res => res.json())
                    .then(data => {
                        console.log(data.forecast);

                        data.forecast.forEach(data => {
                            console.log(data);
                            let forrecastInfoEl = createElWithClassAndTextContent('div', 'forecast-info', undefined);
                            let upcomingSpanEl = createElWithClassAndTextContent('span', 'upcoming', undefined);
                            let upcomingSymbolEl = createElWithClassAndTextContent('span', 'symbol', symbols[data['condition']]);
                            let upcomingConditionEl = createElWithClassAndTextContent('span', 'condition', undefined);
                            let upcomingTemperatureEl = createElWithClassAndTextContent('span', 'forecast-data', `${data['low']}${symbols['Degrees']}/${data['high']}${symbols['Degrees']}`);

                            upcomingSpanEl.appendChild(upcomingSymbolEl);
                            upcomingSpanEl.appendChild(upcomingTemperatureEl);
                            upcomingSpanEl.appendChild(upcomingConditionEl);

                            forrecastInfoEl.appendChild(upcomingSpanEl);

                            upcommingDivEl.appendChild(forrecastInfoEl);



                        })
                    })
                    .catch(err => forecastClassEl.textContent = 'Error')

            })

    })


    // fetch()


    function createElWithClassAndTextContent(tagName, className, textContent) {
        const element = document.createElement(tagName);
        element.classList.add(className);
        element.textContent = textContent;
        return element;
    };

}

attachEvents();
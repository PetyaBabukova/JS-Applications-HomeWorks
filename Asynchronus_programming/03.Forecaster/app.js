function attachEvents() {
    const inputLocation = document.getElementById('location');
    const getWeatherBtn = document.getElementById('submit');
    const forecast = document.querySelector('#forecast');
    const currentWeather = document.querySelector('#current');
    const upcomingWeather = document.querySelector('#upcoming');

    let conditionIcons = {
        'Sunny': '☀',
        'Partly sunny': '⛅',
        'Overcast': '☁',
        'Rain': '☂',
        'Degrees': '°',
    };

    let locationsUrl = 'http://localhost:3030/jsonstore/forecaster/locations';
    let oneDayForecastUrl = 'http://localhost:3030/jsonstore/forecaster/today'; // Corrected typo
    let threeDayForecastUrl = 'http://localhost:3030/jsonstore/forecaster/upcoming';

    getWeatherBtn.addEventListener('click', getWeather);

    function getWeather() {
        fetch(locationsUrl)
            .then(res => res.json())
            .then(data => {
                currentWeather.textContent = '';
                upcomingWeather.textContent = ''; // Clear previous forecasts
                const cityIndex = data.findIndex(el => el.name === inputLocation.value);
                forecast.style.display = 'block';

                if (cityIndex === -1) {
                    throw new Error('Error');
                };

                let cityCode = data[cityIndex].code;

                fetch(`${oneDayForecastUrl}/${cityCode}`)
                    .then(res => res.json())
                    .then(data => {
                        let currentForecastContainer = createElWithClassAndTextContent('div', 'forecasts', undefined);

                        let conditionIconSpanEl = createElWithClassAndTextContent('span', 'condition-symbol', `${conditionIcons[data.forecast.condition]}`);
                        let conditionsSpanEl = createElWithClassAndTextContent('span', 'condition', undefined);

                        let cityEl = createElWithClassAndTextContent('span', 'forecast-data', `${data.name}`);
                        let temperatureEl = createElWithClassAndTextContent('span', 'forecast-data', `${data.forecast.low}${conditionIcons['Degrees']}/${data.forecast.high}${conditionIcons['Degrees']}`);
                        let feelingEl = createElWithClassAndTextContent('span', 'forecast-data', data.forecast.condition);

                        conditionsSpanEl.appendChild(cityEl);
                        conditionsSpanEl.appendChild(temperatureEl);
                        conditionsSpanEl.appendChild(feelingEl);

                        currentForecastContainer.appendChild(conditionIconSpanEl);
                        currentForecastContainer.appendChild(conditionsSpanEl);

                        currentWeather.appendChild(currentForecastContainer);
                    });

                fetch(`${threeDayForecastUrl}/${cityCode}`)
                    .then(res => res.json())
                    .then(data => {
                        let upcomingForecastContainer = createElWithClassAndTextContent('div', 'forecast-info', undefined);
                        data.forecast.forEach(forecast => {
                            let upcomingSpanEl = createElWithClassAndTextContent('span', 'upcoming', undefined);
                            let upcomingSymbolEl = createElWithClassAndTextContent('span', 'symbol', `${conditionIcons[forecast.condition]}`);
                            let upcomingTemperatureEl = createElWithClassAndTextContent('span', 'forecast-data', `${forecast.low}${conditionIcons['Degrees']}/${forecast.high}${conditionIcons['Degrees']}`);
                            let upcomingConditionEl = createElWithClassAndTextContent('span', 'forecast-data', forecast.condition);

                            upcomingSpanEl.appendChild(upcomingSymbolEl);
                            upcomingSpanEl.appendChild(upcomingTemperatureEl);
                            upcomingSpanEl.appendChild(upcomingConditionEl);

                            upcomingForecastContainer.appendChild(upcomingSpanEl);
                        });

                        upcomingWeather.appendChild(upcomingForecastContainer);
                    })
                    .catch(err => {
                        upcomingWeather.textContent = 'Error'; // Changed to show an error message
                    });
            })
            .catch(err => {
                currentWeather.textContent = 'Error';
            });
    }

    function createElWithClassAndTextContent(tagName, className, textContent) {
        const element = document.createElement(tagName);
        element.className = className; // Changed to className to set multiple classes if needed
        if (textContent !== undefined) { // Only set textContent if provided
            element.textContent = textContent;
        }
        return element;
    }
}

attachEvents();

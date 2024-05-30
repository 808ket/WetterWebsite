let latitude, longitude;
async function getWeather(city = null) {
    const apiKey = 'a1e5d59fc6cd95597863a081482de30e';
    let apiUrl;


    if (city) {
        apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=de`;
    } else {
        const position = await getPosition();
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=de`;
    }

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Netzwerkantwort war nicht ok ' + response.statusText);
        }
        const weatherData = await response.json();

        if (city) {
            displayAskedCity(weatherData);
            displayAskedTemperature(weatherData);
            displayAskedDescription(weatherData);
            displayAskedHumidity(weatherData);
            displayAskedWindspeed(weatherData);
        } else {
            displayCity(weatherData);
            displayTemperature(weatherData);
            displayDescription(weatherData);
            displayHumidity(weatherData);
            displayWindspeed(weatherData);
            weatherData.latitude = latitude;
            weatherData.longitude = longitude;

        }

        // Log data to the database
        logWeatherData(weatherData);

    } catch (error) {
        console.error('Es gab ein Problem mit der Fetch-Operation:', error);
        document.getElementById('weatherOutput').textContent = 'Fehler: ' + error.message;
    }
}

async function logWeatherData(data) {
    const weatherLog = {
        city: data.name,
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windspeed: data.wind.speed,
        temperature: data.main.temp
    };

    try {
        const response = await fetch('http://localhost:3000/logWeather', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(weatherLog)
        });
        if (!response.ok) {
            throw new Error('Netzwerkantwort war nicht ok ' + response.statusText);
        }
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error('Es gab ein Problem mit der Log-Operation:', error);
    }
}


function displayTemperature(data) {
    const temperatureOutput = document.getElementById('temperatureOutput');
    const temperature = data.main.temp;
    temperatureOutput.textContent = `Temperatur: ${temperature}°C`;
}

function displayDescription(data) {
    const descriptionOutput = document.getElementById('descriptionOutput');
    const description = data.weather[0].description;
    descriptionOutput.textContent = `Wetter: ${description}`;
}

function displayHumidity(data) {
    const humidityOutput = document.getElementById('humidityOutput');
    const humidity = data.main.humidity;
    humidityOutput.textContent = `Luftfeuchtigkeit: ${humidity}%`;
}

function displayWindspeed(data) {
    const windspeedOutput = document.getElementById('windspeedOutput');
    const windspeed = data.wind.speed;
    windspeedOutput.textContent = `Windgeschwindigkeit: ${windspeed} m/s`;
}

function displayCity(data) {
    const cityOutput = document.getElementById('cityOutput');
    cityOutput.textContent = `Ort: ${data.name}`;
}

function displayAskedTemperature(data) {
    const askedTemperatureOutput = document.getElementById('askedTemperatureOutput');
    const temperature = data.main.temp;
    askedTemperatureOutput.textContent = `Temperatur: ${temperature}°C`;
}

function displayAskedDescription(data) {
    const askedDescriptionOutput = document.getElementById('askedDescriptionOutput');
    const description = data.weather[0].description;
    askedDescriptionOutput.textContent = `Wetter: ${description}`;
}

function displayAskedHumidity(data) {
    const askedHumidityOutput = document.getElementById('askedHumidityOutput');
    const humidity = data.main.humidity;
    askedHumidityOutput.textContent = `Luftfeuchtigkeit: ${humidity}%`;
}

function displayAskedWindspeed(data) {
    const askedWindspeedOutput = document.getElementById('askedWindspeedOutput');
    const windspeed = data.wind.speed;
    askedWindspeedOutput.textContent = `Windgeschwindigkeit: ${windspeed} m/s`;
}

function displayAskedCity(data) {
    const askedCityOutput = document.getElementById('askedCityOutput');
    askedCityOutput.textContent = `gesuchte Stadt: ${data.name}`;
}

function getPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}
 async function processWeather(city = null) {
    try {
        const position = await getPosition();
        let lat = position.coords.latitude;
        let lon= position.coords.longitude;
        if (lat && lon) {
            loadMapz(lat,lon);
        } else {
            //wenn Keinen Koordinaten verfügbar
            loadMapz(52.520008, 13.404954);

        }
    } catch (error) {
        console.error('Fehler beim Abrufen der Wetterdaten:', error);
    }
}
function loadMapz(lat, lon) {
    if (lat && lon) {  // Überprüfung, ob lat und lon nicht null sind
        const myMapz = document.createElement("iframe");
        myMapz.setAttribute("src", `http://www.mapz.com/embedded/map/e6k8hv4n?lon=${lon}&lat=${lat}&zoom=16`);
        myMapz.style.width = "450px";
        myMapz.style.height = "450px";
        const element = document.getElementById('e6k8hv4n');
        element.innerHTML = '';  // Vorherigen Inhalt löschen
        element.appendChild(myMapz);
    } else {
        console.log('Koordinaten sind null, Karte wird nicht geladen.');
    }
}


document.addEventListener('DOMContentLoaded', () => {
    getWeather();
});


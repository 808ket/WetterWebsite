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

        displayWeatherData(weatherData, city);

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

function displayWeatherData(data, city = null) {
    const cityOutput = document.getElementById(city ? 'askedCityOutput' : 'cityOutput');
    const temperatureOutput = document.getElementById(city ? 'askedTemperatureOutput' : 'temperatureOutput');
    const descriptionOutput = document.getElementById(city ? 'askedDescriptionOutput' : 'descriptionOutput');
    const humidityOutput = document.getElementById(city ? 'askedHumidityOutput' : 'humidityOutput');
    const windspeedOutput = document.getElementById(city ? 'askedWindspeedOutput' : 'windspeedOutput');

    cityOutput.textContent = `Ort: ${data.name}`;
    temperatureOutput.textContent = `Temperatur: ${data.main.temp}°C`;
    descriptionOutput.textContent = `Wetter: ${data.weather[0].description}`;
    humidityOutput.textContent = `Luftfeuchtigkeit: ${data.main.humidity}%`;
    windspeedOutput.textContent = `Windgeschwindigkeit: ${data.wind.speed} m/s`;
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
        let lon = position.coords.longitude;
        loadMapz(lat, lon);
    } catch (error) {
        console.error('Fehler beim Abrufen der Wetterdaten:', error);
    }
}

function loadMapz(lat, lon) {
    if (lat && lon) {
        const myMapz = document.createElement("iframe");
        myMapz.setAttribute("src", `http://www.mapz.com/embedded/map/e6k8hv4n?lon=${lon}&lat=${lat}&zoom=16`);
        myMapz.style.width = "450px";
        myMapz.style.height = "450px";
        const element = document.getElementById('e6k8hv4n');
        element.innerHTML = ''; // Vorherigen Inhalt löschen
        element.appendChild(myMapz);
    } else {
        console.log('Koordinaten sind null, Karte wird nicht geladen.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    getWeather();
});

import express from 'express';
import mysql from 'mysql2';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';

const app = express();
const port = 3000;

// MySQL Verbindungsdetails
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Beispiel2024#',
    database: 'weathersite'
});

// Verbindung zur MySQL-Datenbank herstellen
db.connect((err) => {
    if (err) {
        console.error('Fehler beim Verbinden mit der Datenbank:', err);
        return;
    }
    console.log('Mit der MySQL-Datenbank verbunden');
});

app.use(bodyParser.json());

app.get('/weather', async (req, res) => {
    const city = req.query.city;
    const apiKey = 'a1e5d59fc6cd95597863a081482de30e';
    let apiUrl;

    if (city) {
        apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=de`;
    } else {
        res.status(400).send('City parameter is required');
        return;
    }

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Netzwerkantwort war nicht ok ' + response.statusText);
        }
        const weatherData = await response.json();

        const weatherLog = {
            city: weatherData.name,
            description: weatherData.weather[0].description,
            temperature: weatherData.main.temp,
            windspeed: weatherData.wind.speed,
            humidity: weatherData.main.humidity
        };

        // Daten in die MySQL-Datenbank einfügen
        const query = 'INSERT INTO weather_logs (ask_city, ask_description, ask_temperature, ask_windspeed, ask_humidity) VALUES (?, ?, ?, ?, ?)';
        const values = [weatherLog.city, weatherLog.description, weatherLog.temperature, weatherLog.windspeed, weatherLog.humidity];

        db.query(query, values, (err, results) => {
            if (err) {
                console.error('Fehler beim Einfügen der Daten in die Datenbank:', err);
                res.status(500).send('Fehler beim Einfügen der Daten in die Datenbank');
                return;
            }
            res.json({ message: 'Daten erfolgreich gespeichert', data: weatherLog });
        });
    } catch (error) {
        console.error('Es gab ein Problem mit der Fetch-Operation:', error);
        res.status(500).send('Fehler bei der Wetterdatenabfrage: ' + error.message);
    }
});

app.listen(port, () => {
    console.log(`Server läuft unter http://localhost:${port}`);
});

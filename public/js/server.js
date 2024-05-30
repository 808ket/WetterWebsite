const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Beispiel2024#',
    authPlugins: {
        mysql_clear_password: () => () => Buffer.from('Beispiel2024#').toString('binary'),
        caching_sha2_password: require('mysql/lib/auth_plugins/auth_sha2_password').plugin
    }
});


db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

app.post('/logWeather', (req, res) => {
    const { city, description, humidity, windspeed, temperature } = req.body;
    const sql = 'INSERT INTO WeatherLogs (city, description, humidity, windspeed, temperature) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [city, description, humidity, windspeed, temperature], (err, result) => {
        if (err) throw err;
        res.send('Weather data logged');
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});


const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Beispiel2024#',
  database: 'weathersite'
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
  res.render('showWeatherdata');
});

app.post('/logWeather', (req, res) => {
  const { city, temperature, humidity, description, windspeed } = req.body;

  const query = `INSERT INTO weatherlogs (city, temperature, humidity, description, windspeed) VALUES (?, ?, ?, ?, ?)`;
  const values = [city, temperature, humidity, description, windspeed];

  connection.query(query, values, (error, results, fields) => {
    if (error) {
      console.log('Error inserting data into database:', error);
      res.status(500).send('Error inserting data into database');
      return;
    }
    console.log('Data inserted into database successfully');
    res.status(200).send('Data inserted into database successfully');
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const express = require('express')
const path = require('path');
const bodyParser = require('body-parser');
const app = express()
const port = 3000

app.set('view engine', 'ejs');

const historieRouter= require("./routes/histories");
const mysql = require("mysql2/promise");
const config = require("./public/js/config");

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'))

app.use('/historie', historieRouter);

app.get('/', (req, res) => {
  res.render('showWeatherdata',
      {
        subject: 'Wetter'
      })
})

app.post('/logWeather', async (req, res) => {
    const {city, temperature, humidity, description, windspeed} = req.body;

    const connection = await mysql.createConnection(config.db);

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

app.use((req, res, ) =>{
  res.status(404).send("404")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

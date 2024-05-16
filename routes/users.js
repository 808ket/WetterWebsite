var express = require('express');
var router = express.Router();
var db = require('../public/js/database');


router.use(function (req, res, next) {
    console.log('Time:', Date.now());
    next();
});

router.get('/:id', async function (req, res, next) {

    if (req.params.id == 0) {
        next();
    }
    else {
        var data = await getData(req.params.id);

        if (!data.length) {
            next();
        } else {
            res.render('showWeatherHistory', {subject: 'Historie', stadt: data[0].name, wetter: data[0].weathername, zeit: data[0].time, temperatur: data[0].temperature + ' °C'});
        }
    }
});

router.get('/', async function (req, res, next) {

    var data = await getAllData();

    if (!data.length) {
        next();
    } else {
        res.render('showWeatherHistoryAll', {subject: 'Historie', message: 'Alle Daten in einer Tabelle'});
    }
});

async function getAllData() {
    const data = await db.query(
            'SELECT city.name, weather.weathername, cityweather.temperature, cityweather.time FROM city INNER JOIN cityweather ON city.id = cityweather.cityID INNER JOIN weather ON cityweather.weatherID = weather.id'
        );
    return data
}

async function getData(historyID){
    const data = await db.query(
            'SELECT city.name, weather.weathername, cityweather.temperature, cityweather.time FROM city INNER JOIN cityweather ON city.id = cityweather.cityID INNER JOIN weather ON cityweather.weatherID = weather.id WHERE cityweather.id = ?', [historyID]
        );
    return data
}

module.exports = router;
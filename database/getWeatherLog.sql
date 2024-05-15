SELECT city.name, weather.weathername, cityweather.temperature, cityweather.time 
FROM city 
INNER JOIN cityweather ON city.id = cityweather.cityID 
INNER JOIN weather ON cityweather.weatherID = weather.id;
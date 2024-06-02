CREATE DATABASE weathersite;

USE weathersite;

CREATE TABLE WeatherLogs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    city VARCHAR(100),
    description VARCHAR(255),
    humidity INT,
    windspeed DECIMAL(5, 2),
    temperature DECIMAL(5, 2),
    time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
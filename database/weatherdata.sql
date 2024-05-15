CREATE DATABASE weathersite;

USE weathersite;

CREATE TABLE `user`
(
	`id` int(11) NOT NULL,
	`firstname` varchar(30) NOT NULL,
	`lastname` varchar(30) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE `city`
(
	`id` int(11) NOT NULL,
    `name` varchar(60) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE `weather`
(
	`id` int(11) NOT NULL,
    `weathername` varchar(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE `cityweather`
(
	`id` int(11) NOT NULL auto_increment,
    `weatherID` int(11),
    `cityID` int(11),
    `temperature` int(11),
    `time` datetime,
    PRIMARY KEY (id),
    FOREIGN KEY (cityID) REFERENCES city(id),
    FOREIGN KEY (weatherID) REFERENCES weather(id)
);
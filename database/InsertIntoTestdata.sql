USE weathersite;

INSERT INTO city(`id`, `name`)
VALUES 	(1, 'Wismar'),
		(2, 'Schwerin'),
        (3, 'Rostock'),
        (4, 'Stralsund'),
        (5, 'Lübeck'),
        (6, 'Hamburg'),
        (7, 'Greifswald')
        ;

INSERT INTO weather(`id`, `weathername`)
VALUES 	(1, 'wolkenlos'),
		(2, 'sonnig'),
        (3, 'klar'),
        (4, 'heiter'),
        (5, 'wolkig'),
        (6, 'bedeckt'),
        (7, 'trüb'),
        (8, 'regnerisch'),
        (9, 'windig')
        ;

INSERT INTO cityweather(`cityID`, `weatherID`, `temperature`, `time`)
VALUES 	(2, 2, 22, '2024-05-15 10:53:00'),
		(1, 3, 21, '2024-05-15 10:54:00'),
        (3, 2, 21, '2024-05-15 10:54:30'),
        (4, 9, 20, '2024-05-15 10:55:00'),
        (5, 1, 21, '2024-05-15 10:55:30'),
        (6, 2, 22, '2024-05-15 10:56:00'),
        (7, 5, 20, '2024-05-15 11:00:00')
        ;
/*Tabelle benutzer erzeugen */
CREATE TABLE registerlist (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR (100) NOT NULL,
    firstname VARCHAR (100) NOT NULL,
    lastname VARCHAR (100) NOT NULL,
    email VARCHAR (100) NOT NULL,
    password VARCHAR (255) NOT NULL
);



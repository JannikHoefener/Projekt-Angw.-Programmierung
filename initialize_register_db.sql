/*Tabelle benutzer erzeugen */
CREATE TABLE registerlist (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL
);

/*Datensätze einfügen*/
INSERT INTO registerlist (username, firstname, lastname, email, password) VALUES ("mrieck", "Malte", "Rieck", "Malte.Rieck@haw-hamburg.de", "etlam");
INSERT INTO registerlist (username, firstname, lastname, email, password) VALUES ("mepstein", "Markus", "Epstein", "Markus.Epstein@haw-hamburg.de", "Sukram");
INSERT INTO registerlist (username, firstname, lastname, email, password) VALUES ("jhoefener", "Jannik", "Hoefener", "Jannik.Hoefener@haw-hamburg.de", "kinnaj");
INSERT INTO registerlist (username, firstname, lastname, email, password) VALUES ("pschult", "Philipp", "Schult", "Philipp.Schult@haw-hamburg.de", "ppilihp");

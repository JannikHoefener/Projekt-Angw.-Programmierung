/*Tabelle benutzer erzeugen */
CREATE TABLE loginlist (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password TEXT NOT NULL
);

/*Datensätze einfügen*/
INSERT INTO loginlist (username, password) VALUES ("mrieck", "etlam");
INSERT INTO loginlist (username, password) VALUES ("mepstein", "Sukram");
INSERT INTO loginlist (username, password) VALUES ("jhoefener", "kinnaj");
INSERT INTO loginlist (username, password) VALUES ("pschult", "ppilihp");


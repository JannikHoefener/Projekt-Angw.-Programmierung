//Initialisierung Express
const express = require("express");
const app = express();

app.use(express.static(__dirname + "/public"));

//Initialisierung body-parser
const bodyParser = require("body-parser");
const { render } = require("ejs");
app.use(bodyParser.urlencoded({ extended: true }));

//Initialisierung express-fileupload
const fileUpload = require('express-fileupload');
app.use(fileUpload());

//Initialisierung cookie-parser
const cookieParser = require("cookie-parser");
app.use(cookieParser());

//Initialisierung EJS
app.engine(".ejs", require("ejs").__express);
app.set("view engine", "ejs");

//Initialisierung sqlite Datenbank
const DATABASE = "user.db"
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(DATABASE);

// Initialisierung express-session
const session = require('express-session');
app.use(session({
    secret: 'example',
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 60 * 60 * 1000 }
}));

//Initialisierung bcrypt
const bcrypt = require('bcrypt');

//Server starten
app.listen(3000, function () {
    console.log("server runs on port 3000");
});

//Zugriff auf views - Dateien
app.get("/landingPage", function (req, res) {
    res.render("landingPage", { error: "" });
})
app.get("/register", function (req, res) {
    res.render("register", { error: "" });
})
app.get("/funktion", function (req, res) {
    res.render("functionPage", {});
})
app.get("/impressum", function (req, res) {
    res.render("impressumPage", {});
})
app.get("/aboutUs", function (req, res) {
    res.render("aboutUsPage", {});
})

//Login Function
app.post("/loginCheck", function (req, res) {
    const param_username = req.body.username;
    const param_password = req.body.password;
    const sql_login = `SELECT * FROM loginlist WHERE username='${param_username}'`

    db.all(sql_login,
        function (err, rows) {
            if (rows.length != 0 && bcrypt.compareSync(param_password, rows[0].password)) {
                res.render("userStart", { username: param_username });
            } else {
                res.render("landingPage", { error: "Benutzername und/oder Passwort falsch oder nicht vergeben!" })
            }
        }
    );
});

//Register
app.post("/registerdb", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const hash = bcrypt.hashSync(password, 10);
    const lastname = req.body.lastname;
    const firstname = req.body.firstname;
    const email = req.body.email;

    db.all(`SELECT * FROM loginlist WHERE username='${username}'`, function (err, rows) {
        if (rows.length != 0) {
            res.render("register", { error: "Dieser Benutzer existiert schon!" })
        } else if (isValidPW(password) == false) {
            res.render("register", { error: "Passwort muss länger als 9 Zeichen sein, 2 Großbuchstaben, 2 Kleinbuchstaben, 2 Ziffern und 2 Sonderzeichen haben." })
        } else if (password != req.body.passwordrepeat) {
            res.render("register", { error: "Passwort Wiederholung ist falsch!" })
        } else {
            db.run(
                `INSERT INTO loginlist (username, password) VALUES ("${username}", "${hash}")`,
                function () {
                    console.log("Wurde gespeichert");
                });
            db.run(
                `INSERT INTO registerlist (username, firstname, lastname, password, email) VALUES ("${username}", "${firstname}", "${lastname}", "${hash}", "${email}")`,
                function (err) {
                    res.render("userStart", { username: username });
                }
            )
        };
    });
});

//Passwort Validator
function isValidPW(str) {
    if (
        str.length < 9 ||                      // kürzer als 9 zeichen
        str.match(/[A-Z]/g).length < 2 ||      // keine 2 großbuchstaben
        str.match(/[a-z]/g).length < 2 ||      // keine 2 kleinbuchstaben
        str.match(/\d/g).length < 2 ||         // keine 2 ziffern
        str.match(/[^a-zA-Z\d]/g).length < 2   // keine 2 sonderzeichen
    ) return false;
    return true;
}
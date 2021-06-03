const DATABASE = "user.db"
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(DATABASE);
const jwt = require('jsonwebtoken');
const bcrypt =  require('bcryptjs');

//RegisterFunktion
exports.register = async (req,res) => {
    //Destructured
    const {firstname, lastname, username, email, password, passwordrepeat} = req.body;
    db.all(`SELECT email FROM registerlist WHERE email = '${email}'`,  (error, results) => {
        if(error){
            console.log(error);
        } 
        if (results.length > 0) {
            return res.render('register', {
                error: 'Diese Email ist schon vergeben!'
            });
        } else if (isValidPW(password) == false) {
            return res.render('register'), {
                error: 'Passwort ist zu schwach'
            }
        }
        else if (password !== passwordrepeat){
            return res.render('register', {
                error: 'Passwörter stimmen nicht überein!'
            });
        }

        let hashedPassword  = (bcrypt.hashSync(password, 8));

        db.run(`INSERT INTO registerlist (username, firstname, lastname, password, email) VALUES ("${username}", "${firstname}", "${lastname}", "${hashedPassword}", "${email}")`, (error,results) =>
    {
        if (error) {
            console.log(error);
        } else { 
            return res.render('register', {
            error: 'User registriert'
        });
        }
    })
    });
}
//LogIn Funktion
//Async für Zeitverzögerung
exports.login = async (req,res) => {
    try {
        const {username, password} = req.body;
        if (!username || !password) {
            return res.status(400). render('landingPage', {
                error: 'Please provide an email and password'
            })
        }
        
        db.all(`SELECT * FROM registerlist WHERE username='${username}'`, async (error,rows) =>{
            if ( rows.length == 0 || !bcrypt.compareSync(password, rows[0].password) ){
                res.status(401).render('landingPage', {
                    error: 'Nutzername oder Passwort falsch!'
                })
            } else {
                const id = rows[0].id;
                const token = jwt.sign({id}, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                      });

                console.log('The Token of ' + username + ' is: ' + token);
                const cookieOptions = {
                    expires: new Date (
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                    ),
                    httpOnly: true 
                }
                res.cookie('jwt', token, cookieOptions);
                res.redirect('../userStart');
                
            }
        });
    } catch (error) {
        console.log(error);
    }
}

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
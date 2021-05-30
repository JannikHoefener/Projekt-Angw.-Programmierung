const express = require ('express');
const app = express();
const router = express.Router();


//Organize Routes

//Zugriff auf views - Dateien
router.get("/landingPage", function (req, res) {
    res.render("landingPage", { error: "" });
})
router.get("/register", function (req, res) {
    res.render("register", { error: "" });
})
router.get("/funktion", function (req, res) {
    res.render("functionPage", {});
})
router.get("/impressum", function (req, res) {
    res.render("impressumPage", {});
})
router.get("/aboutUs", function (req, res) {
    res.render("aboutUsPage", {});
})
router.get("/toDoList", function (req, res) {
    res.render("toDoList", {});
})
router.get("/profil", function (req, res) {
    res.render("profil", {});
})
router.get("/documents", function (req, res) {
    res.render("documents", {});
})
router.get("/groups", function (req, res) {
    res.render("groups", {});
})
router.get("/calendar", function (req, res) {
    res.render("calendar", {});
})
router.get("/userStart", function (req, res) {
    //if (req.session.username) {
        res.render("userStart", {username: req.session.username});
   // } else {
    //    res.redirect("landingPage")
   // }
    
})

module.exports = router;
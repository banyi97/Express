'use strict';
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/login', function (req, res) {
    res.render('login', { title: "Login" });
});

router.get('/register', function (req, res) {
    res.render('register', { title: "Register" });
});

router.get('/logout', function (req, res) {
    res.render('index', { title: "Express", user: null });
});

module.exports = router;

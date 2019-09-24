'use strict';
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res) {
    res.send('respond with a resource');
});

router.get('/setting', function (req, res) {
    res.render('setting', { title: 'Settings', user: {name: "Hello"} });
});


module.exports = router;

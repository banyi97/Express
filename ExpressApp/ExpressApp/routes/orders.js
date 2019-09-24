'use strict';
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/orders', function (req, res) {
    res.render('orders', { title: 'Express', user: {name: "Hello"} });
});

module.exports = router;

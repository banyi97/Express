const requireOption = require('../requireOption');

// Hozzaadja a kosarat
module.exports = function (obj) {
    return function (req, res, next) {     
        req.session.cart = null;
        return next();
    };
};
const requireOption = require('../requireOption');

// Visszaadja a kosar tartalmat
module.exports = function (obj) {
    return function (req, res, next) {     
        if (typeof req.session.cart === 'undefined') {     
            res.locals.cart = null;
            return next();
        }
        else{
            res.locals.cart = req.session.cart;
        }
    };
};
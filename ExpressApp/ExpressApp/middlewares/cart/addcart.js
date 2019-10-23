const requireOption = require('../requireOption');

// Hozzaadja a kosarhoz a kapott termeket
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

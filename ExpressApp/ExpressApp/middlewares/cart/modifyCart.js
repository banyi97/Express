const requireOption = require('../requireOption');

// Modositja a kosar tartalmat
module.exports = function (obj) {
    return function (req, res, next) {    
        if (typeof req.session.cart === 'undefined') {     
            res.locals.cart = null;
            return next();
        }
        else{
            var cart = req.session.cart;
            
            return next();
        }
    };
};
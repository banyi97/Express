const requireOption = require('../requireOption');

// Hozzaadja a kosarhoz a kapott termeket
module.exports = function (obj) {
    return function (req, res, next) {     
        if (typeof req.session.cart === 'undefined') {     
            req.session.cart = {id: res.body.item.id, quant: res.body.item.quant}; // test data
            return next();
        }
        else{
            res.locals.cart.push({id: res.body.item.id, quant: res.body.item.quant})
            return next();
        }
    };
};

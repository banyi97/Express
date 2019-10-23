const requireOption = require('../requireOption');

 // If the user is not logged in, redirects to login page/
 
module.exports = function (obj) {
    const UserModel = requireOption(obj, 'User');

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
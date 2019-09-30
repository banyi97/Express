const requireOption = require('../requireOption');

 // If the user is not logged in, redirects to login page/
 
module.exports = function (obj) {
    const ProductModel = requireOption(obj, 'Product');

    return function (req, res, next) {       
        if (typeof res.locals.product === 'undefined') {
            return next();
        }

        res.locals.product.remove(err => {
            if (err) {
                return next(err);
            }

            return res.status(200).send();
        });
    };
};
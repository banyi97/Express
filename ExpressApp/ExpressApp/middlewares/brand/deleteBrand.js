const requireOption = require('../requireOption');

 // If the user is not logged in, redirects to login page/
 
module.exports = function (obj) {
    const BrandModel = requireOption(obj, 'Brand');

    return function (req, res, next) {
        if (typeof res.locals.brand === 'undefined') {
            return next();
        }

        res.locals.brand.remove(err => {
            if (err) {
                return next(err);
            }

            return res.status(200).send();
        });
    };
};
const requireOption = require('../requireOption');

 // If the user is not logged in, redirects to login page/
 
module.exports = function (obj) {
    const AddressModel = requireOption(obj, 'Address');

    return function (req, res, next) {       
        if (typeof res.locals.address === 'undefined') {
            return next();
        }

        res.locals.address.remove(err => {
            if (err) {
                return next(err);
            }

            return res.status(200).send();
        });
    };
};
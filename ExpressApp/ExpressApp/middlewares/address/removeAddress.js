const requireOption = require('../requireOption');

 // Torli az adott id-ju address-t
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
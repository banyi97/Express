const requireOption = require('../requireOption');

 // Visszaadja a user-hez tartozo osszes address-t
module.exports = function (obj) {
    const AddressModel = requireOption(obj, 'Address');

    return function (req, res, next) {       
        AddressModel.find({_userId: req.session.userid}, function (err, addresses) {
            if(err){
                return next(err);
            }
            res.locals.address = addresses;
            return next();
        })
    };
};
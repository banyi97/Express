const requireOption = require('../requireOption');

 // Visszaadja a user-hez tartozo osszes address-t
module.exports = function (obj) {
    const AddressModel = requireOption(obj, 'User');

    return function (req, res, next) {       
        AddressModel.find({_userId: req.session.userid}).exec((err, addresses) => {
            if(err){
                return next();
            }
            console.log(addresses)
            res.locals.address = addresses;
            return next();
        //    return res.status(200).send(brands = _brands);
        });
    };
};
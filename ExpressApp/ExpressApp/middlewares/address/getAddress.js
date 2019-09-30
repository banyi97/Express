const requireOption = require('../requireOption');

 // If the user is not logged in, redirects to login page/
 
module.exports = function (obj) {
    const AddressModel = requireOption(obj, 'Address');

    return function (req, res, next) {       
        AddressModel.find({_id: id}).exec((err, _address) => {
            if(err){
                return next();
            }
            res.locals.address = _address;
            return next();
        //    return res.status(200).send(brands = _brands);
        });
    };
};
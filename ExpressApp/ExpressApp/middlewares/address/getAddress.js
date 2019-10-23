const requireOption = require('../requireOption');

// Visszaadja a kert id-ju address-t, ha nem letezik null-t ad vissza
module.exports = function (obj) {
    const AddressModel = requireOption(obj, 'Address');

    return function (req, res, next) {       
        AddressModel.find({_id: id}).exec((err, _address) => {
            if(err){
                return res.render('404', {error: "Id not found"})
            }
            res.locals.address = _address;
            return next();
        //    return res.status(200).send(brands = _brands);
        });
    };
};
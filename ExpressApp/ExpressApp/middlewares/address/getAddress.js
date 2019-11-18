const requireOption = require('../requireOption');

// Visszaadja a kert id-ju address-t, ha nem letezik null-t ad vissza
module.exports = function (obj) {
    const AddressModel = requireOption(obj, 'Address');

    return function (req, res, next) { 
        if ( typeof req.query.id === 'undefined' ){
            return res.render('400', {error: ""})
        }      
        AddressModel.find({_id: req.query.id}).exec((err, _address) => {
            if(err){
                return res.render('404', {error: "Id not found"})
            }
            res.locals.address = _address;
            console.log(_address)
            return next();
        });
    };
};
const requireOption = require('../requireOption');

 // Modositja az address adatait, ha nem letezik errort ad vissza
module.exports = function (obj) {
    const AddressModel = requireOption(obj, 'Address');

    return function (req, res, next) {
        console.log("Body")
        console.log(req.body.address)     
        if (  
            typeof req.body.address === 'undefined' ||
            typeof req.body.address.id === 'undefined' ||
            typeof req.body.address.address === 'undefined' ||
            typeof req.body.address.city === 'undefined' ||
            typeof req.body.address.state === 'undefined' ||
            typeof req.body.address.zip === 'undefined'
            ){
                return res.render('400', {error: ""})
        }  
        AddressModel.findOne({ _id: req.body.address.id }).exec((err, address) => {
            if(err || !address){
                return res.render('404', {error: ""})
            }
            if(address){
                address.firstName = req.body.address.firstName;
                address.lastName = req.body.address.lastName;
                address.address = req.body.address.address;
                address.address2 = req.body.address.address2;
                address.city = req.body.address.city;
                address.state = req.body.address.state;
                address.zip = req.body.address.zip;
                address.save(err => {
                    if(err){
                        return next();
                    }
                    return res.redirect('/user/setting/address');
                })
            }
        });
    };
};
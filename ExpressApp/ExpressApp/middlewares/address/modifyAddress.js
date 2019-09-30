const requireOption = require('../requireOption');

 // If the user is not logged in, redirects to login page/
 
module.exports = function (obj) {
    const AddressModel = requireOption(obj, 'Address');

    return function (req, res, next) {     
        if (  
            typeof req.body.address === 'undefined' ||
            typeof req.body.address.address === 'undefined' ||
            typeof req.body.address.city === 'undefined' ||
            typeof req.body.address.state === 'undefined' ||
            typeof req.body.address.zip === 'undefined'
            ){
            return next();
        }  
        AddressModel.findOne({ _id: req.body.brand._id }).exec((err, address) => {
            if(err){
                return next();
            }
            if(address){
                address.address = req.body.address.address;
                address.city = req.body.address.city;
                address.state = req.body.address.state;
                address.zip = req.body.address.zip;
                address.save(err => {
                    if(err){
                        return next();
                    }
                    return res.status(200).send(brand);
                })
            }
        });
    };
};
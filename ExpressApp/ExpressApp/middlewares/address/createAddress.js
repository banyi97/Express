const requireOption = require('../requireOption');

// 
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
        var address = new AddressModel(req.body.address);
            address.user = req.session.userid;
            address.createDate = new Date();
            address.save(err => {
            if(err){
                return next();
            }           
            return res.status(200).send({ address: address });
            })
    };
};
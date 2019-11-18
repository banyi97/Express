const requireOption = require('../requireOption');

// Letrehozza megkapott adatokbol a cimet és hozzaadja az adott user-hez
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
                return res.render('400', {error: ""})
        }
        var address = new AddressModel(req.body.address);
            address._userId = req.session.userid;
            address.createDate = new Date();
            address.save(err => {
                if(err){
                    return next();
                }           
                return res.redirect('/user/setting/address');
            })
    };
};
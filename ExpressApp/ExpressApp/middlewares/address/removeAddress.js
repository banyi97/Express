const requireOption = require('../requireOption');

 // Torli az adott id-ju address-t
module.exports = function (obj) {
    const AddressModel = requireOption(obj, 'Address');

    return function (req, res, next) {
        if ( typeof req.query.id === 'undefined' ){
            return res.render('400', {error: ""})
        }
        AddressModel.findOne({_id: req.query.id}).exec((err, addr) => {           
            if(addr._userId != req.session.userid)
                return res.render('403', {error: ""})
            addr.remove(err => {
                if (err) {
                    return next(err);
                }
                return res.redirect('/user/setting/address');
            })
        })
    };
};
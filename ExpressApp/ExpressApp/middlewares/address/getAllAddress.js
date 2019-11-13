const requireOption = require('../requireOption');

 // Visszaadja a user-hez tartozo osszes address-t
module.exports = function (obj) {
    const UserModel = requireOption(obj, 'User');

    return function (req, res, next) {       
        UserModel.find({_userId: req.session.userid}).exec((err, user) => {
            if(err){
                return next();
            }
            res.locals.address = user.address;
            return next();
        //    return res.status(200).send(brands = _brands);
        });
    };
};
const requireOption = require('../requireOption');

 // If the user is not logged in, redirects to login page/
 
module.exports = function (obj) {
    const UserModel = requireOption(obj, 'User');

    return function (req, res, next) {       
        UserModel.find({_id: req.session.userid}).exec((err, user) => {
            if(err){
                return next();
            }
            res.locals.address = user.address;
            return next();
        //    return res.status(200).send(brands = _brands);
        });
    };
};
const requireOption = require('../requireOption');
 
module.exports = function (obj) {
    const UserModel = requireOption(obj, 'User');

    return function (req, res, next) {       
        UserModel.find().exec((err, users) => {
            if(err){
                return next();
            }
            res.locals.users = users;
            return next();
        });
    };
  
};
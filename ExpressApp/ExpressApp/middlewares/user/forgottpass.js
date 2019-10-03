const requireOption = require('../requireOption');
 // If the user is not logged in, redirects to login page/
 
module.exports = function (obj) {
    const UserModel = requireOption(obj, 'User');

    return function (req, res, next) {
        if (  
            typeof req.body.user === 'undefined' ||
            typeof req.body.user.email === 'undefined'
            ){
            return next();
        }
        UserModel.findOne({ email: req.body.user.email }).exec((err, user) => {
            if(!user) {
                return res.status(400).send({ message: "The username does not exist" });
            }
            return res.status(200).send();  
        });
    };
  
};
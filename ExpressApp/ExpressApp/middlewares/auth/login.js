const requireOption = require('../requireOption');
const bcrypt = require('bcrypt');
const saltRounds = 10;
 // If the user is not logged in, redirects to login page/
 
module.exports = function (obj) {
    const UserModel = requireOption(obj, 'User');

    return function (req, res, next) {
        if (  
            typeof req.body.user === 'undefined' ||
            typeof req.body.user.email === 'undefined' || 
            typeof req.body.user.password === 'undefined'
            ){
            return next();
        }
        var user = UserModel.findOne({ username: request.body.user.email }).exec();
        if(!user) {
            return response.status(400).send({ message: "The username does not exist" });
        }
        if(!Bcrypt.compareSync(request.body.user.password, user.password)) {
            return response.status(400).send({ message: "The password is invalid" });
        }
        return res.redirect('/')
    };
  
};
const requireOption = require('../requireOption');
const bcrypt = require('bcrypt');
const saltRounds = 10;
 // If the user is not logged in, redirects to login page/
 
module.exports = function (obj) {
    const UserModel = requireOption(obj, 'User');

    return function (req, res, next) {
        if (  
            typeof req.body.email === 'undefined' || 
            typeof req.body.password === 'undefined' || 
            typeof req.body.firstName === 'undefined' ||
            typeof req.body.lastName === 'undefined' ) {
        return next();
        }
        var user = new UserModel();
        user.email = req.body.email;
        user.password = bcrypt.hash(req.body.password, saltRounds);
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;

        user.save((err, res) => {
          if(err){
            return next();
        }
        return res.redirect('/')
        })
    };
  
};
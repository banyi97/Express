const requireOption = require('../requireOption');
const bcrypt = require('bcrypt');
const saltRounds = 10;
 // If the user is not logged in, redirects to login page/
 
module.exports = function (obj) {
    const UserModel = requireOption(obj, 'User');

    return function (req, res, next) {
        if (  typeof req.body.email === 'undefined' || 
              typeof req.body.password === 'undefined') {
        return next();
        }
        
        return res.redirect('/')
        
    };
  
};
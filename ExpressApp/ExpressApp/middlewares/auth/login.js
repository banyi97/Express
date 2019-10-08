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
        UserModel.findOne({ email: req.body.user.email }).exec((err, user) => {
            if(!user) {
                res.locals.errors = "Username or password is not valid"
                return next();
            }
            if(!bcrypt.compareSync(req.body.user.password, user.password)) {
                res.locals.errors = "Username or password is not valid"
                return next();
            }
            req.session.userid = user._id;
            return res.redirect('/');
        });
    };
  
};
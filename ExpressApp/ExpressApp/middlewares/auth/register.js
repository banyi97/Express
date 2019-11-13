const requireOption = require('../requireOption');
const bcrypt = require('bcrypt');
const validator = require('validator');

// A megadott adatok alapjan letrehoz egy uj user jogu felhasznalot - ha mar hasznalt a mail cim akkor visszavisz a register page-re
module.exports = function (obj) {
    const UserModel = requireOption(obj, 'User');

    return function (req, res, next) { 
        if (  
            typeof req.body.user === 'undefined' ||
            typeof req.body.user.email === 'undefined' || 
            typeof req.body.user.password === 'undefined' || 
            typeof req.body.user.firstName === 'undefined' ||
            typeof req.body.user.lastName === 'undefined' 
            ){
                return next();
        } 
        if(!validator.isEmail(req.body.user.email)){
            res.locals.errors = {email : "Email is not a valid email address"};
            return next();
        }
        if(!validator.isLength(req.body.user.password, {min:6})){
            res.locals.errors = {password : "Password is not a valid"};
            return next();
        }
        UserModel.findOne({ email: req.body.user.email }).exec((err, _user) => {
            if(_user){
                res.locals.errors = {email : "This email address is already used"};
                return next();
            }
            req.body.user.password = bcrypt.hashSync(req.body.user.password, 10);
            var user = new UserModel(req.body.user);
            user.createDate = new Date();
            user.permission = "user";
            user.token = null;
            user.save((err) => {
            if(err){
                return next();
            }
            req.session.userid = user._id;
            return res.redirect('/');
        }) 
        });
    };
  
};
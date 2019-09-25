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
            typeof req.body.user.password === 'undefined' || 
            typeof req.body.user.firstName === 'undefined' ||
            typeof req.body.user.lastName === 'undefined' 
            ){
            return next();
        } 
        req.body.user.password = bcrypt.hashSync(req.body.user.password, 10);
        
        var user = new UserModel(req.body.user);
        console.log(user._id)
        user.save((err) => {
            if(err){
                return next();
            }
            req.session.userid = user._id;
            return res.redirect('/');
        }) 
    };
  
};
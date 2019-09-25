const requireOption = require('../requireOption');
const bcrypt = require('bcrypt');
const saltRounds = 10;
 // If the user is not logged in, redirects to login page/
 
module.exports = function (obj) {
    const UserModel = requireOption(obj, 'User');

    return function (req, res, next) { 
        console.log(req.body)
        if (  
            typeof req.body.user === 'undefined' ||
            typeof req.body.user.email === 'undefined' || 
            typeof req.body.user.password === 'undefined' || 
            typeof req.body.user.firstName === 'undefined' ||
            typeof req.body.user.lastName === 'undefined' 
            ){
                console.log('undefined alert    ')
            return next();
        } 
        req.body.user.password = bcrypt.hashSync(req.body.user.password, 10);
        
        var user = new UserModel(req.body.user);

        /*
        req.body.user.password = bcrypt.hashSync(req.body.user.password, 10);
        user.email = req.body.user.email;
        bcrypt.hash(req.body.user.password, saltRounds, (err, hash) => {
            if(err){
                return next();
            }
            console.log(hash)
            user.password = hash;
        });
        user.firstName = req.body.user.firstName;
        user.lastName = req.body.user.lastName;
        console.log(user)
        */
        user.save((err) => {
            if(err){
                return next();
            }
            console.log('saved')
            return res.redirect('/');
        }) 
    };
  
};
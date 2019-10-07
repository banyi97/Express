const requireOption = require('../../requireOption');
const bcrypt = require('bcrypt');
 // If the user is not logged in, redirects to login page/
 
module.exports = function (obj) {
    const UserModel = requireOption(obj, 'User');

    return function (req, res, next) {
        console.log(req.body)
        if (  
            typeof req.body.user === 'undefined' ||
            typeof req.body.user.email === 'undefined' ||
            typeof req.body.user.hash === 'undefined' ||
            typeof req.body.user.newPassword === 'undefined'
            ){
            return res.redirect('/forgot');
        }
        UserModel.findOne({ email: req.body.user.email }).exec((err, user) => {
            if(!user) {
                return res.status(400).send({ message: "The username does not exist" });
            }
            if(user.tonen === null){
                return next();
            }
            if(user.token !== req.body.user.hash){
                return next();
            }
            user.token = null;
            user.password = bcrypt.hashSync(req.body.user.newPassword, 10);
            user.save(err => {
                if(err){
                    return next();
                }
                return res.redirect('/login');
            })      
        });
    };
  
};
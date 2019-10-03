const requireOption = require('../requireOption');
const bcrypt = require('bcrypt');
 // If the user is not logged in, redirects to login page/
 
module.exports = function (obj) {
    const UserModel = requireOption(obj, 'User');

    return function (req, res, next) {
        console.log(req.body)
        if (  
            typeof req.body.user === 'undefined' ||
            typeof req.body.user.email === 'undefined' ||
            typeof req.body.user.newPassword === 'undefined'
            ){
            return next();
        }
        UserModel.findOne({ email: req.session.userid }).exec((err, user) => {
            if(!user) {
                return res.status(400).send({ message: "The username does not exist" });
            }
            user.password = bcrypt.hashSync(req.body.user.newPassword, 10);
            user.save(err => {
                if(err){
                    return next();
                }
                console.log('ok')
                return res.status(200).send();
            })      
        });
    };
  
};
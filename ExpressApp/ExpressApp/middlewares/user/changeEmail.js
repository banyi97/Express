const requireOption = require('../requireOption');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Megvaltoztatja az user email cimet, ha mas mar hasznalja, hibaval ter vissza
module.exports = function (obj) {
    const UserModel = requireOption(obj, 'User');

    return function (req, res, next) {
        if (  
            typeof req.body.user === 'undefined' ||
            typeof req.body.user.email === 'undefined'
            ){
                return res.status(400).send({message: "Request error"});
        }
        UserModel.findOne({ _id: req.session.userid }).exec((err, user) => {
            if(!user) {
                return res.status(400).send({ message: "The username does not exist" });
            }
            UserModel.findOne({ email: req.body.user.email }).exec((err, userWithEmail) => {
                if(userWithEmail){
                    return res.status(400).send({message: "This email is already used"});
                }
                user.email = req.body.user.email;
                user.save(err => {
                    if(err){
                        return res.status(400).send({message: "Error"});
                    }
                return res.status(200).send();
                })      
            });
        });
    };
  
};
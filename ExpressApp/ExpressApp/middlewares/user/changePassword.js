const requireOption = require('../requireOption');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Megvaltoztatja a jelszot ha megegyezik a regivel a kapott
module.exports = function (obj) {
    const UserModel = requireOption(obj, 'User');

    return function (req, res, next) {
        if (  
            typeof req.body.user === 'undefined' ||
            typeof req.body.user.oldPassword === 'undefined' || 
            typeof req.body.user.newPassword === 'undefined'
            ){
                return res.status(400).send({message: "Request error"});
        }
        UserModel.findOne({ _id: req.session.userid }).exec((err, user) => {
            if(!user) {
                return res.status(400).send({ message: "The username does not exist" });
            }
            if(!bcrypt.compareSync(req.body.user.oldPassword, user.password)) {
                return res.status(400).send({ message: "The password is invalid" });
            }
            user.password = bcrypt.hashSync(req.body.user.newPassword, 10);
            user.save(err => {
                if(err){
                    return res.status(400).send({message: "Error"});
                }
                return res.status(200).send();
            })      
        });
    };
  
};
const requireOption = require('../requireOption');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Torli a regisztralt usert sajat keresere
module.exports = function (obj) {
    const UserModel = requireOption(obj, 'User');

    return function (req, res, next) {
        UserModel.findOne({ _id: req.session.userid }).exec((err, user) => {
            if(!user) {
                return res.status(400).send({ message: "The username does not exist" });
            }
            user.remove(err => {
                if (err) {
                    return res.render('404', {error: "Error"})
                }
                return res.redirect('/logout');
            })
        });
    };
  
};
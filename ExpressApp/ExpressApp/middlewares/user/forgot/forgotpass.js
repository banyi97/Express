const requireOption = require('../../requireOption');
const sgMail = require('@sendgrid/mail');

// Tovabbit az oldalra
module.exports = function (obj) {
    const UserModel = requireOption(obj, 'User');

    return function (req, res, next) {
        res.locals.forgot = true;
        return next();   
    };
};
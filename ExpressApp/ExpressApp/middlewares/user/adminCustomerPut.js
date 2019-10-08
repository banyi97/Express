const requireOption = require('../requireOption');
 
module.exports = function (obj) {
    const UserModel = requireOption(obj, 'User');

    return function (req, res, next) {   
        if (  
            typeof req.body.customer === 'undefined' ||
            typeof req.body.customer.id === 'undefined' || 
            typeof req.body.customer.permission === 'undefined' ||
            !(req.body.customer.permission === 'user' || req.body.customer.permission === 'admin')
            ){
            return res.status(400).send("typeerror");
        }
        UserModel.findOne({_id: req.body.customer.id}).exec((err, user) => {
            if(err){
                return res.status(400).send("user error");
            }
            user.permission = req.body.customer.permission;
            user.save((err) => {
                if(err){
                    return res.status(400).send("save error");
                }
                return res.status(200).send();
            })
        });
    };
  
};
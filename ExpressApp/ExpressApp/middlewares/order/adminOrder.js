const requireOption = require('../requireOption');

// Visszaadja az osszes rendelest - admin persission only
module.exports = function (obj) {
    const OrderModel = requireOption(obj, 'Order');
    const UserModel = requireOption(obj, 'User');
    return function (req, res, next) {       
        OrderModel.find({}).exec((err, orders) => {
            if(err){
                return next();
            }
            res.locals.orders = orders;
            return next();
        });
    };
};
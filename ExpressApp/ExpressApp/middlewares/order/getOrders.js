const requireOption = require('../requireOption');

// Visszadja az osszes adott rendelest
module.exports = function (obj) {
    const OrderModel = requireOption(obj, 'Order');

    return function (req, res, next) {       
        OrderModel.find({_userId: req.session.userid}).exec((err, orders) => {
            if(err){
                return next();
            }
            res.locals.orders = orders;
            return next();
        });
    };
};
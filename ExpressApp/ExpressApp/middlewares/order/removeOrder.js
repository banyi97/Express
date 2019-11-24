const requireOption = require('../requireOption');

// Torli az adott rendelest
module.exports = function (obj) {
    const OrderModel = requireOption(obj, 'Order');

    return function (req, res, next) {       
        OrderModel.findOne({_id: req.query.id}).exec((err, order) => {
            if(err){
                return res.status(200).send()
            }
            order.remove(err => {
                if (err) {
                    return res.status(200).send();
                }
                return res.status(200).send();
            })
        });
    };
};
const requireOption = require('../requireOption');

// Torli a kosarbol a kapott termek
module.exports = function (obj) {
    return function (req, res, next) {     
        if (typeof req.session.cart === 'undefined') {     
            req.session.cart = null;
            return next();
        }
        else{         
            var arr = [];
            req.forEach(q => {
                if(q.id != res.body.item.id){
                    arr.push(q)
                }
            });
            req.session.cart = arr
        }
    };
};
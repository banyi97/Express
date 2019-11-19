const requireOption = require('../requireOption');

// Hozzaadja a kosarhoz a kapott termeket
module.exports = function (obj) {
    return function (req, res, next) {   
        if (  
            typeof req.body.cart === 'undefined' ||
            typeof req.body.cart.id === 'undefined' ||
            typeof req.body.cart.quant === 'undefined' 
            ){
                return res.render('400', {error: ""})
        }
        if (typeof req.session.cart === 'undefined') {     
            var cart = req.session.cart = [];
            cart.push({id: req.body.cart.id, quant: parseInt(req.body.cart.quant)}); 
            return res.redirect('/cart');
        }
        else{          
            var cart = req.session.cart || []; 
            cart.forEach(prod => {
                if(prod.id == req.body.cart.id){
                    prod.quant += parseInt(req.body.cart.quant);
                    req.body.cart.id = null;
                }
            });
           if(req.body.cart.id){
                cart.push({id: req.body.cart.id, quant: parseInt(req.body.cart.quant)})
           }
            return res.redirect('/cart');
        }
    };
};

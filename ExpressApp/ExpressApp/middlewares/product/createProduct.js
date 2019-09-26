const requireOption = require('../requireOption');

 // If the user is not logged in, redirects to login page/
 
module.exports = function (obj) {
    const ProductModel = requireOption(obj, 'Product');

    return function (req, res, next) {
      
    };
};
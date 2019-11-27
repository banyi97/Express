const UserModel = require('../models/user');
const bcrypt = require('bcrypt');

UserModel.findOne({email: "admin@admin.hu"}).exec((err, admin) => {
    if(admin){
    }
    else{
        var user = new UserModel();
        user.email = "admin@admin.hu"
        user.password = bcrypt.hashSync("admin", 10);
        user.firstName = "admin";
        user.lastName = "admin";
        user.token = null;
        user.createDate = new Date();
        user.permission = "admin";
        UserModel.create(user, function(e) {
            if (e) {
                throw e;
            }
        });
    }
});

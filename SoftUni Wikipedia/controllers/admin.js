const User = require('mongoose').model('User');
const Role = require('mongoose').model('Role');
const encryption = require('./../utilities/encryption');

module.exports = {

    adminUsersGet: (req, res) => {

        if (!req.user) {
            res.redirect("/user/login");
        }
        else {


            Role.findOne({ "name": "Admin" }).then((role) => {

                let adminUsers = [];

                let adminUsersId = [];
                for (const idObj of role.users) {
                    let id = idObj.toString();
                    adminUsersId.push(id);
                }

                //findUser
                User.find({}).then((users) => {

                    for (const key in users) {
                        let currentUser = users[key];
                        let userId = currentUser.id.toString();

                        if (adminUsersId.includes(userId))
                            adminUsers.push(currentUser);
                    }


                    res.render('admin/users', {
                        adminUsers
                    });
                });

            });
        }
    }
};
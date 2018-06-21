const mongoose = require('mongoose');
const Article = mongoose.model('Article');
const Edit = require('mongoose').model('Edit');

module.exports = {
   
    details: (req, res) => {

        let id = req.params["id"];

        Edit.findById(id).then((edit) => {


            if (!req.isAuthenticated()) {
    
                res.render('edit/edit-details', {
                    isAuthenticated: false,
                    isAdmin: false,
                    edit
                });
    
                return;
            }

            req.user.isInRole('Admin').then(isAdmin => {


                if (isAdmin) {
                    res.render('edit/edit-details', {
                        role: "Admin",
                        username: req.user.fullName,
                        isAuthenticated: true,
                        isAdmin,
                        edit
                    });
                }
                else 
                {
                    res.render('edit/edit-details', {
                        role: "User",
                        username: req.user.fullName,
                        isAuthenticated: true,
                        isAdmin,
                        edit
                    });
                }


            });
        });

    }
};  
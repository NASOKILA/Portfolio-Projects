const User = require('mongoose').model('User');
const Role = require('mongoose').model('Role');
const Edit = require('mongoose').model('Edit');

const encryption = require('./../utilities/encryption');

module.exports = {

    registerGet: (req, res) => {

        if (req.isAuthenticated()) {
            let returnUrl = '/user/register';
            req.session.returnUrl = returnUrl;

            res.redirect('/');
            return;
        }

        res.render('user/register');
    },

    registerPost: (req, res) => {

        let registerArgs = req.body;

        let errorMsg = '';

        if (registerArgs.email.trim() == "") {
            errorMsg = 'Email input is required!';
        } else if (registerArgs.fullName.trim() == "") {
            errorMsg = 'Username input is required!';
        } else if (registerArgs.password.trim() == "") {
            errorMsg = 'Password input is required!';
        } else if (registerArgs.repeatedPassword.trim() == "") {
            errorMsg = 'Confirm Password input is required!';
        } else if (registerArgs.password.length < 6) {
            errorMsg = 'Password length must not be greather than 6 symbols!'
        } else if (registerArgs.password !== registerArgs.repeatedPassword) {
            errorMsg = 'Passwords do not match!'
        }

        User.findOne({ email: registerArgs.email }).then(user => {

            if (user) {
                errorMsg = 'User with the same username exists!';
            }

            if (errorMsg) {
                registerArgs.error = errorMsg;
                res.render('user/register', registerArgs)
            } else {
                let salt = encryption.generateSalt();
                let passwordHash = encryption.hashPassword(registerArgs.password, salt);

                let userObject = {
                    email: registerArgs.email,
                    passwordHash: passwordHash,
                    fullName: registerArgs.fullName,
                    salt: salt,
                    articles: []
                };

                let roles = [];
                Role.findOne({ name: 'User' }).then(role => {

                    roles.push(role.id);
                    //save the role on the user
                    userObject.roles = roles;

                    User.create(userObject).then(user => {
                        //pushe the users to the roles
                        role.users.push(user);

                        role.save(err => {
                            if (err) {
                                registerArgs.error = err.message;
                                res.render('user/register', registerArgs);
                            }
                            else {

                                req.logIn(user, (err) => {
                                    if (err) {
                                        registerArgs.error = err.message;
                                        res.render('user/register', registerArgs);
                                        return;
                                    }

                                    res.redirect('/');
                                })
                            }
                        });
                    });
                });
            }
        })
    },

    loginGet: (req, res) => {

        if (req.isAuthenticated()) {
            let returnUrl = '/user/login';
            req.session.returnUrl = returnUrl;

            res.redirect('/');
            return;
        }

        res.render('user/login');
    },

    loginPost: (req, res) => {

        let loginArgs = req.body;
        let errorMsg = '';

        if (loginArgs.email.trim() == "") {
            errorMsg = 'Email input is required!';
        } else if (loginArgs.password.trim() == "") {
            errorMsg = 'Password input is required!';
        }

        if(errorMsg){
            loginArgs.error = errorMsg;
            res.render('user/login', loginArgs);
            return;
        }

        User.findOne({ email: loginArgs.email }).then(user => {

            if (!user || !user.authenticate(loginArgs.password)) {
                errorMsg = 'Either username or password is invalid!';
                loginArgs.error = errorMsg;
                res.render('user/login', loginArgs);
                return;
            }



            req.logIn(user, (err) => {
                if (err) {
                    res.render('/user/login', { error: err.message });
                    return;
                }

                let returnUrl = '/';
                if (req.session.returnUrl) {
                    returnUrl = req.session.returnUrl;
                    delete req.session.returnUrl;
                }

                res.redirect(returnUrl);
            })
        })
    },

    logout: (req, res) => {

        if (!req.isAuthenticated()) {
            let returnUrl = '/user/logout';
            req.session.returnUrl = returnUrl;

            res.redirect('/user/login');
            return;
        }

        req.logOut();
        res.redirect('/');
    },

    details: (req, res) => {

        let user = req.user;

        if (!user) {
            res.redirect("/user/login");
        }
        else {
            /*
            let roleId = user.roles[0].toString();
            Role.findById(roleId).then((role) => {

                let roleName = role.name;
                let userArticles = [];

                //take all articles
                Article.find({ "author": user }).populate('author')
                    .then(articles => {


                        for (const articleObj of articles) {

                            let article = articleObj;

                            userArticles.push(article);
                        }

                        res.render('user/details', {
                            user,
                            userArticles,
                            roleName
                        });


                    });


            });
            */
        }
    }

};

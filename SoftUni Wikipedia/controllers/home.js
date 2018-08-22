const mongoose = require('mongoose');
const Article = mongoose.model('Article');
const Edit = require('mongoose').model('Edit');

module.exports = {

    index: (req, res) => {

        Article.find({}).then((articles) => {

            if (articles.length < 1) {

                if (!req.isAuthenticated()) {
                    res.render('home/index', {
                        latestArticle: null,
                        lastThreeArticles: null
                    });
                    return;
                }

                req.user.isInRole('Admin').then(isAdmin => {

                    if (isAdmin) {
                        res.render('home/index', {
                            role: "Admin",
                            username: req.user.fullName,
                            isAuthenticated: true,
                            isAdmin,
                            latestArticle: null,
                            lastThreeArticles: null
                        });
                    }
                    else {
                        res.render('home/index', {
                            role: "User",
                            username: req.user.fullName,
                            isAuthenticated: true,
                            isAdmin,
                            latestArticle: null,
                            lastThreeArticles: null
                        });
                    }

                    return;
                });

            }
            else {

                let latestArticle = articles.pop();
                latestArticle.content = latestArticle.content.substring(0, Math.min(300, latestArticle.content.length)) + "...";
                let lastThreeArticles = articles.slice(Math.max(articles.length - 3, 0));

                if (!req.isAuthenticated()) {
                    res.render('home/index', {
                        latestArticle,
                        lastThreeArticles
                    });
                    return;
                }


                req.user.isInRole('Admin').then(isAdmin => {

                    if (isAdmin) {
                        res.render('home/index', {
                            role: "Admin",
                            username: req.user.fullName,
                            isAuthenticated: true,
                            isAdmin,
                            latestArticle,
                            lastThreeArticles
                        });
                    }
                    else {
                        res.render('home/index', {
                            role: "User",
                            username: req.user.fullName,
                            isAuthenticated: true,
                            isAdmin,
                            latestArticle,
                            lastThreeArticles
                        });
                    }

                });
            }

        });

    }
    
};
const Article = require('mongoose').model('Article');
const Edit = require('mongoose').model('Edit');
const User = require('mongoose').model('User');

module.exports = {

    createGet: (req, res) => {

        if (!req.isAuthenticated()) {
            let returnUrl = '/article/create';
            req.session.returnUrl = returnUrl;

            res.redirect('/user/login');
            return;
        }

        req.user.isInRole('Admin').then(isAdmin => {

            if (isAdmin) {
                res.render('article/create', {
                    role: "Admin",
                    username: req.user.fullName,
                    isAuthenticated: true,
                    isAdmin
                });
            }
            else {
                res.render('article/create', {
                    role: "User",
                    username: req.user.fullName,
                    isAuthenticated: true,
                    isAdmin
                });
            }
        });
    },

    createPost: (req, res) => {

        if (!req.isAuthenticated()) {
            res.redirect('/user/login');
            return;
        }

        const {
            title,
            content,
        } = req.body;

        let productArgs = req.body;

        let errorMsg = '';
        if (!title || title.trim() === "") {
            errorMsg = 'Title is Required!';
        } else if (!content || content.trim() === "") {
            errorMsg = 'Content is Required!';
        }

        if (errorMsg) {

            req.user.isInRole('Admin').then(isAdmin => {

                if (isAdmin) {
                    res.render('article/create', {
                        role: "Admin",
                        username: req.user.fullName,
                        isAuthenticated: true,
                        isAdmin,
                        error: errorMsg
                    });
                }
                else {
                    res.render('article/create', {
                        role: "User",
                        username: req.user.fullName,
                        isAuthenticated: true,
                        isAdmin,
                        error: errorMsg
                    });
                }

                return;
            });
        }

        Article.create({

            title,
            content,
            creator: req.user,
            history: [],
            statusLocked: false

        }).then(article => {

            //create edit 
            Edit.create({
                author: req.user.fullName.toString(),
                date: new Date(Date.now()),
                content: article.content,
                article: article
            }).then((edit) => {

                console.log(edit)
                article.history.push(edit);

                article.save();

                User.findById(req.user.id).then((user) => {


                    user.articles.push(article);
                    user.save(err => {
                        if (err) {
                            console.log(err)
                            return;
                        }

                        res.redirect('/');
                        return;

                    })
                })

            });


        }).catch(err => {
            console.log(err);
        });
    },

    all: (req, res) => {


        Article.find({})
            .sort({ title: 1 })
            .then((articles) => {

                if (!req.isAuthenticated()) {

                    res.render('article/all-articles', {
                        isAuthenticated: false,
                        isAdmin: false,
                        articles
                    });

                    return;
                }

                req.user.isInRole('Admin').then(isAdmin => {

                    if (isAdmin) {
                        res.render('article/all-articles', {
                            role: "Admin",
                            username: req.user.fullName,
                            isAuthenticated: true,
                            isAdmin,
                            articles
                        });
                        return
                    }
                    res.render('article/all-articles', {
                        role: "User",
                        username: req.user.fullName,
                        isAuthenticated: true,
                        isAdmin,
                        articles
                    });

                });

            });
    },

    search: (req, res) => {


        console.log('search articles')
        let realSearchedWord = req.body.searchedWord
        let searchedWord = req.body.searchedWord.toLowerCase();

        Article.find({})
            .then((allArticles) => {

                console.log(allArticles)

                let articles = allArticles.filter(a => a.title.toString().toLowerCase().includes(searchedWord));

                if (!req.isAuthenticated()) {

                    res.render('article/search-results', {
                        isAuthenticated: false,
                        isAdmin: false,
                        articles,
                        searchedWord : realSearchedWord
                    });

                    return;
                }



                req.user.isInRole('Admin').then(isAdmin => {

                    if (isAdmin) {
                        res.render('article/search-results', {
                            role: "Admin",
                            username: req.user.fullName,
                            isAuthenticated: true,
                            isAdmin,
                            articles,
                            searchedWord : realSearchedWord
                        });
                        return
                    }
                    res.render('article/search-results', {
                        role: "User",
                        username: req.user.fullName,
                        isAuthenticated: true,
                        isAdmin,
                        articles,
                        searchedWord : realSearchedWord
                    });

                });

            });
    },

    history: (req, res) => {

        let id = req.params.id;

        Article.findById(id).populate('history').populate('creator').populate('author')
            .then(article => {

                //get article edits
                let edits = article.history;

                if (!req.isAuthenticated()) {

                    res.render('article/history', {
                        isAuthenticated: false,
                        isAdmin: false,
                        edits
                    });

                    return;
                }

                req.user.isInRole('Admin').then(isAdmin => {


                    if (isAdmin) {
                        res.render('article/history', {
                            role: "Admin",
                            username: req.user.fullName,
                            isAuthenticated: true,
                            isAdmin,
                            edits
                        });
                    }
                    else {
                        res.render('article/history', {
                            role: "User",
                            username: req.user.fullName,
                            isAuthenticated: true,
                            isAdmin,
                            edits
                        });
                    }


                });
            });
    },

    searchRedirect: (req, res) => {
        res.redirect("/");
        return;
    },

    details: (req, res) => {

        let id = req.params.id;

        //with .populate('author') we attach the author object in the article
        Article.findById(id).populate('creator').then(article => {


            if (!req.isAuthenticated()) {

                res.render('article/article-details', {
                    isAuthenticated: false,
                    isAdmin: false,
                    article
                });

                return;
            }

            req.user.isInRole('Admin').then(isAdmin => {

                if (isAdmin) {
                    res.render('article/article-details', {
                        role: "Admin",
                        username: req.user.fullName,
                        isAuthenticated: true,
                        isAdmin,
                        article,
                        author: req.user.isAuthor(article)
                    });
                    return;
                }
                res.render('article/article-details', {
                    role: "User",
                    username: req.user.fullName,
                    isAuthenticated: true,
                    isAdmin,
                    article,
                    author: req.user.isAuthor(article)
                });
                return;

            });
        });
    },

    latest: (req, res) => {


        //with .populate('author') we attach the author object in the article
        Article.find({}).populate('creator').then(articles => {


            let article = articles.pop();

            if (!req.isAuthenticated()) {

                res.render('article/article-latest', {
                    isAuthenticated: false,
                    isAdmin: false,
                    article
                });

                return;
            }


            req.user.isInRole('Admin').then(isAdmin => {

                if (isAdmin) {
                    res.render('article/article-latest', {
                        role: "Admin",
                        username: req.user.fullName,
                        isAuthenticated: true,
                        isAdmin,
                        article,
                        author: req.user.isAuthor(article)
                    });
                    return
                }
                res.render('article/article-latest', {
                    role: "User",
                    username: req.user.fullName,
                    isAuthenticated: true,
                    isAdmin,
                    article,
                    author: req.user.isAuthor(article)
                });

            });
        });
    },

    editGet: (req, res) => {

        let id = req.params.id;

        if (!req.isAuthenticated()) {
            res.redirect('/user/login');
            return;
        }

        Article.findById(id).then(article => {

            req.user.isInRole('Admin').then(isAdmin => {

                if (!isAdmin && article.statusLocked) {

                    res.render('article/edit-locked', {
                        role: "User",
                        username: req.user.fullName,
                        isAuthenticated: true,
                        isAdmin,
                    });
                    return;
                }



                if (isAdmin) {
                    res.render('article/edit', {
                        role: "Admin",
                        username: req.user.fullName,
                        isAuthenticated: true,
                        isAdmin,
                        article
                    });
                }
                else {
                    res.render('article/edit', {
                        role: "User",
                        username: req.user.fullName,
                        isAuthenticated: true,
                        isAdmin,
                        article
                    });
                }


            });
        });
    },

    editPost: (req, res) => {

        if (!req.isAuthenticated()) {
            res.redirect('/user/login');
            return;
        }

        const {
            title,
            content,
        } = req.body;

        let productArgs = req.body;

        let errorMsg = '';
        if (!title || title === "" || title === null) {
            errorMsg = 'Title is Required!';
        } else if (!content || content === "") {
            errorMsg = 'Content is Required!';
        }

        if (errorMsg) {

            req.user.isInRole('Admin').then(isAdmin => {

                if (isAdmin) {
                    res.render('article/edit', {
                        role: "Admin",
                        username: req.user.fullName,
                        isAuthenticated: true,
                        isAdmin,
                        error: errorMsg
                    });

                    return;
                }
                else {


                    res.render('article/edit', {
                        role: "User",
                        username: req.user.fullName,
                        isAuthenticated: true,
                        isAdmin,
                        error: errorMsg
                    });

                }

            });
        }
        else {

            Article.update({ _id: req.params.id }, {
                $set: {
                    title,
                    content
                }
            })
                .then(updated => {


                    Article.findById({ _id: req.params.id })
                        .then((updatedArticle) => {



                            Edit.create({
                                author: req.user.fullName.toString(),
                                date: new Date(Date.now()),
                                content: updatedArticle.content,
                                article: updatedArticle
                            }).then((edit) => {


                                updatedArticle.history.push(edit);
                                updatedArticle.save(err => {
                                    if (err) {
                                        console.log(err)
                                        return;
                                    }

                                    res.redirect('/');
                                    return;
                                })


                            });

                        });

                });

        }
    },

    lock: (req, res) => {


        if (!req.isAuthenticated()) {
            res.redirect('/user/login');
            return;
        }

        let id = req.params.id;

        Article.findById(id).then(article => {

            req.user.isInRole('Admin').then(isAdmin => {

                if (!isAdmin) {
                    res.redirect('/');
                    return;
                }


                //update article status

                Article.update({ _id: req.params.id }, {
                    $set: {
                        statusLocked: true
                    }
                })
                    .then(updateStatus => {
                        res.redirect(`/`);
                        return;
                    });


            });
        });


    },

    unlock: (req, res) => {


        if (!req.isAuthenticated()) {
            res.redirect('/user/login');
            return;
        }

        let id = req.params.id;

        Article.findById(id).then(article => {

            req.user.isInRole('Admin').then(isAdmin => {

                if (!isAdmin) {
                    res.redirect('/');
                    return;
                }


                //update article status

                Article.update({ _id: req.params.id }, {
                    $set: {
                        statusLocked: false
                    }
                })
                    .then(updateStatus => {
                        res.redirect(`/`);
                        return;
                    });



            });
        });


    },

    deleteGet: (req, res) => {

        let id = req.params.id;

        if (!req.isAuthenticated()) {
            res.redirect('/user/login');
            return;
        }

        Article.findById(id).then(product => {

            req.user.isInRole('Admin').then(isAdmin => {

                if (!isAdmin && !req.user.isAuthor(product)) {
                    res.redirect('/');
                    return;
                }


                if (isAdmin) {
                    res.render('article/delete', {
                        role: "Admin",
                        username: req.user.fullName,
                        isAuthenticated: true,
                        isAdmin,
                        product
                    });
                }
                else {
                    res.render('article/delete', {
                        role: "User",
                        username: req.user.fullName,
                        isAuthenticated: true,
                        isAdmin,
                        product
                    });
                }
                return;

            });
        });
    },

    deletePost: (req, res) => {


        let id = req.params.id;
        Article.findById(id).then(article => {

            if (!req.isAuthenticated()) {

                res.redirect('/user/login');
                return;
            }

            Article.findOneAndRemove({ _id: id }).populate('author')
                .then(product => {
                    res.redirect('/');
                });
        });

    },

};
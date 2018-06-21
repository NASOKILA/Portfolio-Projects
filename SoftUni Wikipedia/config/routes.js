

const userController = require('./../controllers/user');
const articleController = require('./../controllers/article');
const homeController = require('./../controllers/home');
const adminController = require('./../controllers/admin');
const editController = require('./../controllers/edit');

module.exports = (app) => {
    

    app.get('/', homeController.index);
    
    
    app.get('/admin/users', adminController.adminUsersGet);
      
    app.get('/user/register', userController.registerGet);
    app.post('/user/register', userController.registerPost);
    app.get('/user/login', userController.loginGet);
    app.post('/user/login', userController.loginPost);
    app.get('/user/logout', userController.logout);
    app.get('/user/details', userController.details);


    app.get('/article/create', articleController.createGet);
    app.post('/article/create', articleController.createPost);
    app.get('/article/details/:id', articleController.details);
    app.get('/article/edit/:id', articleController.editGet);
    app.post('/article/edit/:id', articleController.editPost);
    app.get('/article/delete/:id', articleController.deleteGet);
    app.post('/article/delete/:id', articleController.deletePost);
    app.get('/article/all', articleController.all);
    app.get('/article/latest', articleController.latest);
    app.get('/article/lock/:id', articleController.lock);
    app.get('/article/unlock/:id', articleController.unlock);

    app.post('/article/search', articleController.search);
    app.get('/article/search', articleController.searchRedirect);

    app.get('/article/history/:id', articleController.history);


    app.get('/edit/details/:id', editController.details);
    
};



// TODO: Require Controllers...
const { cubeController, accessoryController, userController, notFound, errorHandler, about } =
  require('../controllers/index');
const { auth } = require('../utils');

module.exports = (app) => {
    app.get('/attach/accessory/:id', auth, accessoryController.getAttach);
    app.post('/attach/accessory/:id', auth, accessoryController.postAttach);
    app.get('/about', about);
    app.get('/create/accessory', auth, accessoryController.getCreate);
    app.post('/create/accessory', auth, accessoryController.postCreate);
    app.get('/create', auth, cubeController.getCreate);
    app.post('/create', auth, cubeController.postCreate);
    app.get('/details/:id', cubeController.details);
    app.get('/login', userController.getLogin);
    app.post('/login', userController.postLogin);
    app.get('/register', userController.getRegister);
    app.post('/register', userController.postRegister);
    app.get('/logout', userController.logout);
    app.post('/', cubeController.search);
    app.get('/', cubeController.home);

    app.use(notFound);
    app.use(errorHandler);
};
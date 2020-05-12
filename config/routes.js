// TODO: Require Controllers...
const { cubeController, accessoryController, notFound, errorHandler, about } =
  require('../controllers/index');

module.exports = (app) => {
    app.get('/attach/accessory/:id', accessoryController.getAttach);
    app.post('/attach/accessory/:id', accessoryController.postAttach);
    app.get('/about', about);
    app.get('/create/accessory', accessoryController.getCreate);
    app.post('/create/accessory', accessoryController.postCreate);
    app.get('/create', cubeController.getCreate);
    app.post('/create', cubeController.postCreate);
    app.get('/details/:id', cubeController.details);
    app.post('/', cubeController.search);
    app.get('/', cubeController.home);

    app.use(notFound);
    app.use(errorHandler);
};
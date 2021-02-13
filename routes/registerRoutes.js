const Express = require('express');
const Router = Express.Router();

const registerController = require('../controllers/registerController');

Router.get('/login', registerController.getRegisterPage);

Router.post('/login', registerController.postRegisterPage);

module.exports = Router;

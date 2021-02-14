const Express = require('express');
const Router = Express.Router();

const loginController = require('../controllers/loginController');

Router.get('/login', loginController.getLoginPage);

Router.post('/login', loginController.postLoginPage);

module.exports = Router;

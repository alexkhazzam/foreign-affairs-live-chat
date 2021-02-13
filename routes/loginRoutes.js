const Express = require('express');
const Router = Express.Router();

const loginController = require('../controllers/loginController');

Router.get('/register', loginController.getLoginPage);

Router.post('/register', loginController.postLoginPage);

module.exports = Router;

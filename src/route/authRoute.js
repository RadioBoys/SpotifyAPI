const express = require('express');
const route = express.Router();
const authorizationController = require('../controller/AuthorizationController');

route.get('/login', authorizationController.login);
route.get('/token', authorizationController.token);
route.get('/callback', authorizationController.callback);
route.get('/refreshtoken', authorizationController.refreshToken);
route.get('/', authorizationController.auth);

module.exports = route;

const homeController = require('../controller/HomeController');
const express = require('express');
const route = express.Router();

route.get('/', homeController.home);

module.exports = route;
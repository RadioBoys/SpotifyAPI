const express = require('express');
const bodyParser = require('body-parser');
const route = express.Router();
const accessToken = require('../controller/AccessToken');

route.get('/get', accessToken.postToken);
route.get('/', accessToken.token);


module.exports = route;

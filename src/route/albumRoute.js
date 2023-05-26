const express = require('express');
const route = express.Router();
const albumController = require('../controller/AlbumController') ;

route.get('/', albumController.albums);

module.exports = route;
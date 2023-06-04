const homeRoute = require('./homeRoute');
const albumRoute = require('./albumRoute');
const authRoute = require('./authRoute');

function route(app) {

    // Albums;
    app.use('/albums', albumRoute);
    // Login - Get authorization;
    app.use('/auth', authRoute);
    // Home;
    app.use('/', homeRoute);
    
}

module.exports = route;

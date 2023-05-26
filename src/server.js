const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const app = express();
const port = 3030;
const router = require('./route/indexRoute');

global.access_token = '';
global.refresh_token = '';

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Engine handlebars;
app.engine('handlebars', handlebars.engine({
    // extname: '.hbs',    
    defaultLayout: 'main',
}));

app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Route handlers;
router(app);


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
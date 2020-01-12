const express = require('express');
const morgan = require('morgan');
const path = require('path');

// initializations
const app = express();

// settings
app.set('port', process.env.PORT || 4000);

// Middlewares
app.use(morgan('dev'));

// Global Variables
app.use((req, res, next) => {

    next();
})

// Routes
app.use(require('./routes/'));
app.use(require('./routes/authentication'));
app.use('/links',require('./routes/links'));

// Public 
app.use(express.static(path.join(__dirname, 'public')));

// Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});
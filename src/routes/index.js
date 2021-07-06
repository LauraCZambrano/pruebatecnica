const express = require('express');
const app = express();

//specifics routes
app.use('/auth/', require('./auth')); //Authentication routes
app.use('/profile/', require('./profile')); //Profile routes
app.use('/project/', require('./project')); //Project routes

//exports
module.exports = app;
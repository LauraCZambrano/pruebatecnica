const express = require('express');
const app = express();

//Controllers
const authController = require('../controllers/authController');

//routes 
app.post('/signup', authController.signup); //SIGN UP
app.post('/signin', authController.signin); //SIGN IN

//exports
module.exports = app;
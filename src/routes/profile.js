const express = require('express');
const app = express();

//Middleware
const {session} = require('../middleware/session');

//Controllers
const profileController = require('../controllers/profileController');

//routes 
app.put('/update-profile', session, profileController.updateProfile); //UPDATE PROFILE
app.put('/update-password', session, profileController.updatePassword); //UPDATE PASSWORD
app.delete('/delete-account', session, profileController.deleteAccount); //DELETE PROFILE

//exports
module.exports = app;
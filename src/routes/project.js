const express = require('express');
const app = express();

//Middleware
const {session} = require('../middleware/session');

//Controllers
const projectController = require('../controllers/projectController');

//routes 
app.post('/create', session, projectController.create); //CREATE PROJECT
app.get('/show', session, projectController.show); //GET ALL PROJECTS
app.get('/show/:id', session, projectController.showOne); //GET ONE PROJECT
app.put('/update/:id', session, projectController.updateProject); //UPDATE PROJECT
app.delete('/delete/:id', session, projectController.deleteProject); //DELETE PROJECT

//exports
module.exports = app; 
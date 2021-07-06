//require
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const http = require('http');

//config
require('./config');

//database
require('./database/index');

//initializations
const app = express();

//middlewares
app.use(cors()); //ACCESS CONTROL HTTP
app.options("*", cors()); //ACCESS CONTROL HTTP
app.use(bodyParser.urlencoded({extended: true, limit: '50mb'})) //REQUEST IN BODY
app.use(bodyParser.json({limit: '50mb'})) //JSON
app.use(methodOverride('_method')); //FORMS PUT AND DELETE

//routes
app.use(require('./routes/index'));


// Starting http server
const httpServer = http.createServer(app);

//Server http
httpServer.listen(process.env.HTTP, () => {
    console.log('HTTP Server listen on port', process.env.HTTP);
});

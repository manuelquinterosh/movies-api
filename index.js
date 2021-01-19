const express = require('express');
const app = express();

const { config } = require('./config/index');

const moviesApi = require('./routes/movies.js'); //Importamos nuestra ruta

const { logErrors, wrapErrors, errorHandler } = require('./utils/middleware/errorHandlers.js');

const notFoundHandler = require('./utils/middleware/notFoundHandler');


// body parser
app.use(express.json()); //Cuando le enviemos datos en formato json pueda interpretarlos

moviesApi(app); //Ejecutamos la funcion y le pasamos nuestra aplicacion de express

// Catch 404 - Para capturar el error 404
app.use(notFoundHandler);

// Errors middleware - Manejadores de errores
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);


/**app.get('/', function(req, res) {
    res.send("hello world");
});

app.get('/json', function(req, res) {
    res.send({hello: 'world'});
}); **/

app.listen(config.port, function() {
    console.log(`Listening http://localhost:${config.port}`);
});
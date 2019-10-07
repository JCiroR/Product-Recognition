// las importaciones de los modulos necesarios
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const compression = require('compression');
const app = express();


////////////////////////////////////////////////////
///////////////////MIDDLEWARE///////////////////////
////////////////////////////////////////////////////
//direccion de los html y css
console.log(__dirname + '/express/server/public');

//tipo de docuemento de vistas
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(compression());

app.use(express.static(__dirname + "/express/angular/dist/angular"));

//para conectar a las rutas
require('./express/server/routes/routes')(app);
require('./express/server/routes/api')(app);

////////////////////////////////////////////////////
///////////////////CONFIGURACION////////////////////
////////////////////////////////////////////////////

const host = '0.0.0.0';
const port = process.env.PORT || '80';
app.set('port', port);

const server = http.createServer(app);

module.exports = server.listen(port, host, () => console.log(`API running on ${host}:${port}`));

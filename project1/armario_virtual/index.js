/* Instanciamos las librerias que necesitamos */
require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')


/* Ejecutamos express y lo guardamos en una variable app */
const app = express();

/* Vinculación Express con Body-parser */
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

/* Secreto */
// El app.set sirve para acceder en toda la aplicación a secretKey sin tener que acceder a su valor.
app.set("secretKey", process.env.JWTSECRET);

/* Conectando con la base de datos */
mongoose.connect(process.env.CONNECTIONSTRING).then(() => console.log("Connected"));

/* Se puede borrar, es solo para ver por consola que el servidor está corriendo */
console.log('APP iniciada')

/* Usamos los enrutadores donde le mandamos el endpoint (primer parámetro)
y en el segundo parámetro el archivo  donde quiero mandar el enrutador */

app.use('/prendas',require('./routes/prenda.routes'))

app.use('/usuarios',require('./routes/usuario.routes'))

app.use('/armarios',require('./routes/armario.routes'))

/* Por último arrancamos el servidor */
app.listen(process.env.PORT);
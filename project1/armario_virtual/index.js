/* Instanciamos las librerias que necesitamos */
const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')


/* Ejecutamos express y lo guardamos en una variable app */
const app = express();

/* Vinculación Express con Body-parser */
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

/* Conectando con la base de datos */
mongoose.connect('mongodb+srv://sergioruiz:bqpx3BixVQnuBIeM@cluster0.zc2dgky.mongodb.net/armario_virtual')
    .then(() => console.log('Connected'))

/* Se puede borrar, es solo para ver por consola que el servidor está corriendo */
console.log('APP iniciada')

/* Usamos los enrutadores donde le mandamos el endpoint (primer parámetro)
y en el segundo parámetro el archivo  donde quiero mandar el enrutador */

app.use('/prendas',require('./routes/prenda.routes'))

app.use('/usuarios',require('./routes/usuario.routes'))


/* Por último arrancamos el servidor */
app.listen(3000)
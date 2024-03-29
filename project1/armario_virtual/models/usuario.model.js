const mongoose = require('mongoose')

const Schema = mongoose.Schema

const usuarioSchema = new Schema({
	nombre: {
		type: String,
		required: true,
	},
	apellidos: {
		type: String,
		required: true,
	},
	fechaNacimiento: {
		type: String,
		required: true,
	},
	genero: {
		type: String,
		required: false,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	movil: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	tipoDeCliente: {
		type: String,
		required: true,
	},
	tipoDeUsuario: {
		type: String,
		required: true,
	},
});

const Usuario = mongoose.model("usuario", usuarioSchema)

module.exports = Usuario;
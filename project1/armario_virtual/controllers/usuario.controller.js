const Usuario = require("../models/usuario.model");

async function buscarTodos() {
	const usuarios = await Usuario.find();
	return usuarios;
}

async function buscarPorId(id) {
	const usuarioEncontrado = await Usuario.findById(id);
	return usuarioEncontrado;
}

async function crearUsuario(body) {
	/* Creación del documento Usuario */
	const nuevoUsuario = new Usuario({
		nombre: body.nombre,
		apellidos: body.apellidos,
		email: body.email,
		movil: body.movil,
		fechaNacimiento: body.fechaNacimiento,
		genero: body.genero,
		tipoDeCliente: body.tipoDeCliente,
		tipoDeUsuario: body.tipoDeUsuario,
		password: body.password
	});
	/* Guardado del documento Usuario */
	await nuevoUsuario.save();
	/* Retornando el nuevo usuario a Router */
	return nuevoUsuario;
}

async function eliminarUsuario(id) {
	/* Búsqueda de id, borrado y asignación de documento borrado */
	const usuarioBorrado = await Usuario.findByIdAndDelete(id);
	return usuarioBorrado;
}

async function modificarUsuario(id, body) {
	const usuarioSinModificar = Usuario.findByIdAndUpdate(id, {
		nombre: body.nombre,
		apellidos: body.apellidos,
		email: body.email,
		movil: body.movil,
		fechaNacimiento: body.fechaNacimiento,
		genero: body.genero,
		tipoDeCliente: body.tipoDeCliente,
		tipoDeUsuario: body.tipoDeUsuario,
		password: body.password,
	});
	return usuarioSinModificar;
}

async function modificarUsuarioParcial(id, body) {
	let parametrosAModificar = new Object();

	body.nombre !== undefined ? (parametrosAModificar["nombre"] = body.nombre) : false;
	body.apellidos !== undefined ? (parametrosAModificar["apellidos"] = body.apellidos) : false;
	body.email !== undefined ? (parametrosAModificar["email"] = body.email) : false;
	body.movil !== undefined ? (parametrosAModificar["movil"] = body.movil) : false;
	body.fechaNacimiento !== undefined ? (parametrosAModificar["fechaNacimiento"] = body.fechaNacimiento) : false;
	body.genero !== undefined ? (parametrosAModificar["genero"] = body.genero) : false;
	body.tipoDeCliente !== undefined ? (parametrosAModificar["tipoDeCliente"] = body.tipoDeCliente) : false;
	body.tipoDeUsuario !== undefined ? (parametrosAModificar["tipoDeUsuario"] = body.tipoDeUsuario) : false;
	body.password !== undefined ? (parametrosAModificar["password"] = body.password) : false;

	const usuarioSinModificar = await Usuario.findByIdAndUpdate(id, parametrosAModificar);
	return usuarioSinModificar;
}

module.exports = {
	buscarTodos,
	buscarPorId,
	crearUsuario,
	eliminarUsuario,
	modificarUsuario,
	modificarUsuarioParcial,
};

const Armario = require("../models/armario.model");

/* Buscar todos los armarios */
async function buscarTodosArmarios() {
	const armarios = await Armario.find()
		.populate({ path: "usuario", select: "nombre apellidos tipoDeUsuario tipoDeCliente" })
		.populate({ path: "prendas", select: "categoria subcategoria color colorimetia ocasion estacion talla marca" });
	return armarios;
}

/* Buscar sólo un armario */
async function buscarPorIdArmarios(id) {
	const armarios = await Armario.findById(id)
		.populate({ path: "usuario", select: "nombre apellidos tipoDeUsuario tipoDeCliente" })
		.populate({ path: "prendas", select: "categoria subcategoria color colorimetia ocasion estacion talla marca" });
	return armarios;
}

/* Eliminar un armario por id */
async function eliminarArmario(id) {
	const armarioBorrado = await Armario.findByIdAndDelete(id);
	return armarioBorrado;
}

/* Crear un armario */
async function crearArmario(body) {
	/* Creación del documento Armario */
	const nuevoArmario = new Armario({
		nombreArmario: body.nombreArmario,
		descripcionArmario: body.descripcionArmario,
		usuario: body.usuario,
		prendas: body.prendas,
	});
	/* Guardado del documento Armario */
	await nuevoArmario.save();
	/* Retornando el nuevo Armario a Router */
	return nuevoArmario;
}

/* Modificar todos los atributos de armario (se obvia el id de usuario y las prendas) */
async function modificarArmarioCompleto(id, body) {
	const armarioSinModificar = Armario.findByIdAndUpdate(id, {
		nombreArmario: body.nombreArmario,
		descripcionArmario: body.descripcionArmario,
	});
	return armarioSinModificar;
}

/* Modificar sólo algunos atributos de armario (se obvia el id de usuario y las prendas)*/
async function modificarArmarioParcial(id, body) {
	let parametrosAModificar = new Object();

	body.nombreArmario !== undefined ? (parametrosAModificar["nombreArmario"] = body.nombreArmario) : false;
	body.descripcionArmario !== undefined
		? (parametrosAModificar["descripcionArmario"] = body.descripcionArmario)
		: false;

	const armarioSinModificar = await Armario.findByIdAndUpdate(id, parametrosAModificar);
	return armarioSinModificar;
}

async function anadirPrendaAArmario(id, prendas) {
	let parametrosAModificar = new Object();

	prendas !== undefined ? (parametrosAModificar["prendas"] = prendas) : false;

	const armarioSinModificar = await Armario.findByIdAndUpdate(id, parametrosAModificar);
	return armarioSinModificar;
}

// Faltaria añadirPrendaEnArmario para cuando se cree una prenda se añada al array de prendas.

// Faltaria borrarPrendaEnArmario pra cuando se borre un armario borrar todas las prendas asociadas a ese armario.

module.exports = {
	buscarTodosArmarios,
	buscarPorIdArmarios,
	eliminarArmario,
	crearArmario,
	modificarArmarioCompleto,
	modificarArmarioParcial,
	anadirPrendaAArmario,
};

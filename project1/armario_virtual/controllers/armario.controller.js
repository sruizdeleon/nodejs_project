const Armario = require("../models/armario.model")

async function buscarTodos() {
	const armarios = await Armario.find();

	return armarios;
}

async function buscarPorId(id) {
	const armarios = await Armario.findById(id);
	return armarios;
}

async function eliminarArmario(id) {
	/* Búsqueda de id, borrado y asignación de documento borrado */
	const armarioBorrado = await Armario.findByIdAndDelete(id);
	return armarioBorrado;
} // Eliminar todas las prendas del armario

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

async function modificarArmarioCompleto(id, body) {
	const armarioSinModificar = Armario.findByIdAndUpdate(id, {
		nombreArmario: body.nombreArmario,
		descripcionArmario: body.descripcionArmario
	});
	return armarioSinModificar;
}

async function modificarArmarioParcial(id, body) {
	let parametrosAModificar = new Object();

	body.nombreArmario !== undefined ? (parametrosAModificar["nombreArmario"] = body.nombreArmario) : false;
	body.descripcionArmario !== undefined ? (parametrosAModificar["descripcionArmario"] = body.descripcionArmario) : false;
	body.prendas !== undefined ? (parametrosAModificar["prendas"] = body.prendas) : false;

	const armarioSinModificar = await Armario.findByIdAndUpdate(id, parametrosAModificar);
	return armarioSinModificar;
}


// añadirPrendaEnArmario

// borrarPrendaEnArmario


module.exports = {
	buscarTodos,
	buscarPorId,
	eliminarArmario,
	crearArmario,
	modificarArmarioCompleto,
	modificarArmarioParcial,
};
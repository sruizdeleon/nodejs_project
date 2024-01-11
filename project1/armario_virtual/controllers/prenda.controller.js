const Prenda = require("../models/prenda.model");

/* Buscar todos las prendas */
async function buscarTodasPrendas() {
	const prendas = await Prenda.find();
	return prendas;
}

/* Buscar sólo una prenda */
async function buscarPorIdPrendas(id) {
	const prendaEncontrada = await Prenda.findById(id);
	return prendaEncontrada;
}

/* Crear una prenda */
async function crearPrenda(body) {
	/* Creación del documento Prenda */
	const nuevaPreda = new Prenda({
		categoria: body.categoria,
		subcategoria: body.subcategoria,
		ocasion: body.ocasion,
		estacion: body.estacion,
		color: body.color,
		colorimetria: body.colorimetria,
		talla: body.talla,
		marca: body.marca,
		armarioId: body.armarioId,
		usuarioId: body.usuarioId
	});
	/* Guardado del documento Prenda */
	await nuevaPreda.save();
	/* Retornando el nuevo Prenda a Router */
	return nuevaPreda;
}

/* Eliminar una prenda por id */
async function eliminarPrenda(id) {
	/* Búsqueda de id, borrado y asignación de documento borrado */
	const prendaBorrada = await Prenda.findByIdAndDelete(id);
	return prendaBorrada;
}

/* Modificar todos los atributos de prenda se obvian los id de armario y prenda */
async function modificarPrenda(id, body) {
	const prendaSinModificar = Prenda.findByIdAndUpdate(id, {
		categoria: body.categoria,
		subcategoria: body.subcategoria,
		ocasion: body.ocasion,
		estacion: body.estacion,
		color: body.color,
		colorimetria: body.colorimetria,
		talla: body.talla,
		marca: body.marca,
		armarioId: body.armarioId,
		usuarioId: body.usuarioId
	});
	return prendaSinModificar;
}

/* Modificar sólo algunos atributos de prenda */
async function modificarPrendaParcial(id, body) {
	let parametrosAModificar = new Object();

	body.categoria !== undefined ? parametrosAModificar["categoria"] = body.categoria : false;
	body.subcategoria !== undefined ? parametrosAModificar["subcategoria"] = body.subcategoria : false;
	body.marca !== undefined ? parametrosAModificar["marca"] = body.marca : false;
	body.talla !== undefined ? parametrosAModificar["talla"] = body.talla : false;
	body.color !== undefined ? parametrosAModificar["color"] = body.color : false;
	body.estacion !== undefined ? parametrosAModificar["estacion"] = body.estacion : false;
	body.ocasion !== undefined ? parametrosAModificar["ocasion"] = body.ocasion : false;
	body.colorimetria !== undefined ? parametrosAModificar["colorimetria"] = body.colorimetria : false;
	body.armarioId !== undefined ? parametrosAModificar["armarioId"] = body.armarioId : false;
	body.usuarioId !== undefined ? parametrosAModificar["usuarioId"] = body.usuarioId : false;

	const prendaSinModificar = await Prenda.findByIdAndUpdate(id, parametrosAModificar);
	return prendaSinModificar;
}

module.exports = {
	buscarTodasPrendas,
	buscarPorIdPrendas,
	crearPrenda,
	eliminarPrenda,
	modificarPrenda,
	modificarPrendaParcial,
};

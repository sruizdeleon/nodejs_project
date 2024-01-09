const Prenda = require("../models/prenda.model");

async function buscarTodos() {
	const prendas = await Prenda.find();
	return prendas;
}

async function buscarPorId(id) {
	const prendaEncontrada = await Prenda.findById(id);
	return prendaEncontrada;
}

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
		fechaDeCompra: body.fechaDeCompra,
	});
	/* Guardado del documento Prenda */
	await nuevaPreda.save();
	/* Retornando el nuevo Prenda a Router */
	return nuevaPreda;
}

async function eliminarPrenda(id) {
	/* Búsqueda de id, borrado y asignación de documento borrado */
	const prendaBorrada = await Prenda.findByIdAndDelete(id);
	return prendaBorrada;
}

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
		fechaDeCompra: body.fechaDeCompra,
	});
	return prendaSinModificar;
}

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

	const prendaSinModificar = await Prenda.findByIdAndUpdate(id, parametrosAModificar);
	return prendaSinModificar;
}

module.exports = {
	buscarTodos,
	buscarPorId,
	crearPrenda,
	eliminarPrenda,
	modificarPrenda,
	modificarPrendaParcial,
};

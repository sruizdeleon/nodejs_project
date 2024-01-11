const {
	validarAtributosPrendaCompleta,
	validarAtributosPrendaParcial,
} = require("../helpers/validators/prenda.validators");

const { buscarPorIdPrendas } = require("../controllers/prenda.controller")

/* Validación existencia de atributos, no vacíos y formato correcto */

async function middlewareValidacionPrendaCompleto(req, res, next) {
	const resultadoValidacion = await validarAtributosPrendaCompleta(req.body); // Validación de atributos en Helpers
	if (resultadoValidacion.valido === false) {
		res.status(400).json({ msg: resultadoValidacion.msg });
	} else {
		next();
	}
}

async function middlewareValidacionPrendaParcial(req, res, next) {
	try {
		const objetoEncontrado = await buscarPorIdPrendas(req.params.id);
		const resultadoValidacion = await validarAtributosPrendaParcial(req.body, objetoEncontrado); // Validación de atributos en Helpers
		if (resultadoValidacion.valido === false) {
				res.status(400).json({ msg: resultadoValidacion.msg });
		} else {
				next();
		}
	} catch (error) {
		res.status(404).json({ msg: "Error: prenda no encontrada" });
	}
}

module.exports = {
	middlewareValidacionPrendaCompleto,
	middlewareValidacionPrendaParcial,
};

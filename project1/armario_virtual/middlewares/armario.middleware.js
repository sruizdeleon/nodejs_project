const {
	validarAtributosArmarioCompleto,
	validarAtributosArmarioParcial,
} = require("../helpers/validators/armario.validators");

const { buscarPorIdArmarios } = require("../controllers/armario.controller");

/* Validación existencia de atributos, no vacíos y formato correcto */

async function middlewareValidacionPrendaCompleto(req, res, next) {
	const resultadoValidacion = await validarAtributosArmarioCompleto(req.body); // Validación de atributos en Helpers
	if (resultadoValidacion.valido === false) {
		res.status(400).json({ msg: resultadoValidacion.msg });
	} else {
		next();
	}
}

async function middlewareValidacionPrendaParcial(req, res, next) {
	try {
		const objetoEncontrado = await buscarPorIdArmarios(req.params.id);
		const resultadoValidacion = await validarAtributosArmarioParcial(req.body, objetoEncontrado); // Validación de atributos en Helpers
		if (resultadoValidacion.valido === false) {
			res.status(400).json({ msg: resultadoValidacion.msg });
		} else {
			next();
		}
	} catch (error) {
		res.status(404).json({ msg: "Error: armario no encontrada" });
	}
}

module.exports = {
	middlewareValidacionPrendaCompleto,
	middlewareValidacionPrendaParcial,
};


const {
	validarAtributosUsuarioCompleto,
	validarAtributosUsuarioParcial,
} = require('../helpers/validators/usuario.validators')

/* Validación existencia de atributos, no vacíos y formato correcto */

async function middlewareValidacionUsuarioCompleto(req, res, next) {
    const resultadoValidacion = await validarAtributosUsuarioCompleto(req.body) // Validación de atributos en Helpers
    if (resultadoValidacion.valido === false) {
        res.status(400).json({msg: resultadoValidacion.msg})
    } else {
        next()
    }
}

async function middlewareValidacionUsuarioParcial(req, res, next) {
	const resultadoValidacion = await validarAtributosUsuarioParcial(req.body); // Validación de atributos en Helpers
	if (resultadoValidacion.valido === false) {
		res.status(400).json({ msg: resultadoValidacion.msg });
	} else {
		next();
	}
}

module.exports = {
	middlewareValidacionUsuarioCompleto,
	middlewareValidacionUsuarioParcial,
};
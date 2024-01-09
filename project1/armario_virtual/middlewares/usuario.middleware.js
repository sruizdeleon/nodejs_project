require("dotenv").config();

const { buscarPorId } = require("../controllers/usuario.controller")

const {
	validarAtributosUsuarioCompleto,
	validarAtributosUsuarioParcial,
} = require("../helpers/validators/usuario.validators");

const jwt = require("jsonwebtoken");

/* Validación existencia de atributos, no vacíos y formato correcto */

async function middlewareValidacionUsuarioCompleto(req, res, next) {
	const resultadoValidacion = await validarAtributosUsuarioCompleto(req.body); // Validación de atributos en Helpers
	if (resultadoValidacion.valido === false) {
		res.status(400).json({ msg: resultadoValidacion.msg });
	} else {
		next();
	}
}

async function middlewareValidacionUsuarioParcial(req, res, next) {
	try {
		const resultadoValidacion = await validarAtributosUsuarioParcial(req.body); // Validación de atributos en Helpers
		if (resultadoValidacion.valido === false) {
			res.status(400).json({ msg: resultadoValidacion.msg });
		} else {
			next();
		}
	} catch (error) {
		res.status(404).json({ msg: "Error: usuario no encontrado" });
	}
}

function middlewareEstaLoggeado(req, res, next) {
	if (req.query.token) {
		try {
			const resultado = jwt.verify(req.query.token, process.env.JWTSECRET);
			if (resultado.id === req.params.id) {
				next()
			} else {
				res.status(403).json({ msg: "Error: no permitido" });
			}
		} catch (error) {
			res.status(401).json({ msg: "Error: token no válido" });
		}
	} else {
		res.status(400).json({ msg: "Error: no estás loggeado" });
	}
}

async function middlewareEsAdmin(req, res, next) {
	if (req.query.token) {
		try {
			const resultado = jwt.verify(req.query.token, process.env.JWTSECRET);
			console.log(resultado.id);
			const usuarioEncontrado = await buscarPorId(resultado.id)
			console.log(usuarioEncontrado.tipoDeUsuario);
			if (
				usuarioEncontrado.tipoDeUsuario === "administrador" ||
				usuarioEncontrado.tipoDeUsuario === "super administrador"
			) {
				next();
			} else {
				res.status(403).json({ msg: "Error: no permitido" });
			}
		} catch (error) {
			res.status(401).json({ msg: "Error: token no válido" });
		}
	} else {
		res.status(400).json({ msg: "Error: no estás loggeado" });
	}
}

module.exports = {
	middlewareValidacionUsuarioCompleto,
	middlewareValidacionUsuarioParcial,
	middlewareEstaLoggeado,
	middlewareEsAdmin
};

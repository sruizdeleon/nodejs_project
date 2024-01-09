const express = require("express");

const router = express.Router();

const {
	buscarTodos,
	buscarPorId,
	crearUsuario,
	eliminarUsuario,
	modificarUsuario,
	modificarUsuarioParcial,
	login,
} = require("../controllers/usuario.controller");

const {
	middlewareValidacionUsuarioCompleto,
	middlewareValidacionUsuarioParcial,
} = require("../middlewares/usuario.middleware");

/* GET */
router.get("/", async (req, res) => {
	try {
		let usuarios = await buscarTodos();
		res.json(usuarios);
	} catch (error) {
		res.status(500).json({ msg: "Error: fallo interno del servidor" });
	}
});

/* GET BY ID */
router.get("/:id", async (req, res) => {
	try {
		let objetoEncontrado = new Object();
		try {
			objetoEncontrado = await buscarPorId(req.params.id);
		} catch (error) {
			res.status(500).json({ msg: "Error: fallo del servidor" });
		}
		if (objetoEncontrado) {
			res.json(objetoEncontrado);
		} else {
			res.status(404).json({ msg: "Error: usuario no encontrado" });
		}
	} catch (error) {
		res.status(500).json({ msg: "Error: fallo interno del servidor" });
	}
});

/* POST */
router.post("/", middlewareValidacionUsuarioCompleto, async (req, res) => {
	try {
		let nuevoUsuario = await crearUsuario(req.body); // Acceso y creación en BBDD por Controllers
		res.json({ dato: nuevoUsuario, msg: `Se ha creado el usuario correctamente` });
	} catch (error) {
		res.status(500).json({ msg: "Error: fallo interno del servidor" });
	}
});

/* DELETE */
router.delete("/:id", async (req, res) => {
	try {
		const usuarioBorrado = await eliminarUsuario(req.params.id); // Acceso y modificación de BBDD en Controllers
		if (usuarioBorrado) {
			res.json({ dato: usuarioBorrado, msg: "usuario borrado correctamente" });
		} else {
			res.status(404).json({ msg: "Error: usuario no encontrado" });
		}
	} catch (error) {
		res.status(500).json({ msg: "Error: fallo interno del servidor" });
	}
});

/* PUT */
router.put("/:id", middlewareValidacionUsuarioCompleto, async (req, res) => {
	try {
		let encontrado = new Object();
		let usuarioActual = new Object();
		try {
			encontrado = await modificarUsuario(req.params.id, req.body); // Acceso y modificación de BBDD en Controllers
			usuarioActual = await buscarPorId(req.params.id); // Búsqueda nuevo dato en BBDD por Controllers para devolver dato antiguo y actual.
		} catch (error) {
			res.status(500).json({ msg: "Error: fallo del servidor" });
		}
		encontrado === null && res.status(404).json({ msg: "Error: usuario no encontrado" });
		encontrado !== null &&
			res.json({ datoAntiguo: encontrado, datoActual: usuarioActual, msg: "usuario actualizado correctamente" });
	} catch (error) {
		res.status(500).json({ msg: "Error: fallo interno del servidor" });
	}
});

/* PATCH */

router.patch("/:id", middlewareValidacionUsuarioParcial, async (req, res) => {
	try {
		let encontrado = new Object();
		let usuarioActual = new Object();
		try {
			encontrado = await modificarUsuarioParcial(req.params.id, req.body); // Acceso y modificación de BBDD en Controllers
			usuarioActual = await buscarPorId(req.params.id); // Búsqueda nuevo dato en BBDD por Controllers para devolver dato antiguo y actual.
		} catch (error) {
			res.status(500).json({ msg: "Error: fallo del servidor" });
		}
		encontrado === null && res.json({ msg: "Error: usuario no encontrado" });
		encontrado !== null &&
			res.json({ datoAntiguo: encontrado, datoActual: usuarioActual, msg: "usuario actualizado correctamente" });
	} catch (error) {
		res.status(500).json({ msg: "Error: fallo interno del servidor" });
	}
});

/* LOGIN */

router.post("/login", async (req, res) => {
	// try {
		const resultado = await login(req.body.email, req.body.password)
		res.json({token: resultado.token, msg: resultado.msg})
	// } catch (error) {
	// 	res.status(500).json({ msg: "Error: fallo interno del servidor" });
	// }
})

module.exports = router;

const express = require("express");

const router = express.Router();

const {
	buscarTodosUsuarios,
	buscarPorIdUsuario,
	crearUsuario,
	eliminarUsuario,
	modificarUsuario,
	modificarUsuarioParcial,
	login
} = require("../controllers/usuario.controller");

const {
	middlewareValidacionUsuarioCompleto,
	middlewareValidacionUsuarioParcial,
	middlewareEstaLoggeado,
	middlewareEsAdmin,
	middlewareEsMailDuplicado,
	middlewareEsMovilDuplicado
} = require("../middlewares/usuario.middleware");


/* GET */
router.get("/", async (req, res) => {
	try {
		let usuarios = await buscarTodosUsuarios();
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
			objetoEncontrado = await buscarPorIdUsuario(req.params.id);
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
router.post("/", middlewareValidacionUsuarioCompleto, middlewareEsMailDuplicado, middlewareEsMailDuplicado, async (req, res) => {
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
			usuarioActual = await buscarPorIdUsuario(req.params.id); // Búsqueda nuevo dato en BBDD por Controllers para devolver dato antiguo y actual.
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
			usuarioActual = await buscarPorIdUsuario(req.params.id); // Búsqueda nuevo dato en BBDD por Controllers para devolver dato antiguo y actual.
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

/* ZONA CLIENTE PERSONAL */
router.post("/zona-privada/cliente/:id", middlewareEstaLoggeado, async (req, res) => {
	const usuarioEncontrado = await buscarPorIdUsuario(req.params.id);
	res.json({ msg: "Te damos la bienvenda de nuevo " + usuarioEncontrado.nombre + "." });
})

/* ZONA ADMINISTRADORES */
router.post("/zona-privada/admin/", middlewareEsAdmin, async (req, res) => {
	res.json({ msg: "Te damos la bienvenda al área de administrador."});
})

module.exports = router;

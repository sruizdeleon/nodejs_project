const express = require("express");

const router = express.Router();

const {
	buscarTodos,
	buscarPorId,
	eliminarArmario,
	crearArmario,
	modificarArmarioCompleto,
	modificarArmarioParcial
} = require("../controllers/armario.controller");


/* GET */
router.get("/", async (req, res) => {
	// try {
		let armarios = await buscarTodos(); // Acceso y búsqueda en BBDD por Controllers
		res.json(armarios);
	// } catch (error) {
	// 	res.status(500).json({ msg: "Error: fallo interno del servidor" });
	// }
});

router.get("/:id", async (req, res) => {
	// try {
		let objetoEncontrado = new Object();
		// try {
		objetoEncontrado = await buscarPorId(req.params.id); // Acceso y búsqueda en BBDD por Controllers
		// } catch (error) {
		// 	res.status(500).json({ msg: "Error: fallo del servidor" });
		// }
		if (objetoEncontrado) {
			res.json(objetoEncontrado);
		} else {
			res.status(404).json({ msg: "Error: aramrio no encontrado" });
		}
	// } catch (error) {
	// 	res.status(500).json({ msg: "Error: fallo interno del servidor" });
	// }
});


/* POST */
router.post("/", async (req, res) => {
	// try {
		const nuevoArmario = await crearArmario(req.body); // Acceso y creación en BBDD por Controllers
		res.json({ dato: nuevoArmario, msg: `Se ha creado el armario correctamente` });
	// } catch (error) {
	// 	res.status(500).json({ msg: "Error: fallo interno del servidor" });
	// }
});

/* DELETE */
router.delete("/:id", async (req, res) => {
	// try {
        // try {
			let armarioBorrado = await eliminarArmario(req.params.id); // Acceso y modificación de BBDD en Controllers
		// } catch (error) {
		// 	res.status(500).json({ msg: "Error: fallo del servidor" });
		// }
		if (armarioBorrado) {
			res.json({ dato: armarioBorrado, msg: "armario borrado correctamente" });
		} else {
			res.status(404).json({ msg: "Error: armario no encontrada" });
		}
	// } catch (error) {
	// 	res.status(500).json({ msg: "Error: fallo interno del servidor" });
	// }
});

/* PUT */
router.put("/:id", async (req, res) => {
	// try {
		let encontrado = new Object();
		let armarioActual = new Object();
		// try {
			encontrado = await modificarArmarioCompleto(req.params.id, req.body); // Acceso y modificación de BBDD en Controllers
			armarioActual = await buscarPorId(req.params.id); // Búsqueda nuevo dato en BBDD por Controllers para devolver dato antiguo y actual.
		// } catch (error) {
		// 	res.status(500).json({ msg: "Error: fallo del servidor" });
		// }
		encontrado === null && res.status(404).json({ msg: "Error: armario no encontrado" });
		encontrado !== null &&
			res.json({
				datoAntiguo: encontrado,
				datoActual: armarioActual,
				msg: "armario actualizado correctamente",
			});
	// } catch (error) {
	// 	res.status(500).json({ msg: "Error: fallo interno del servidor" });
	// }
});

/* PATCH */

router.patch("/:id", async (req, res) => {
	// try {
		let encontrado = new Object;
		let armarioActual = new Object;
		// try {
			encontrado = await modificarArmarioParcial(req.params.id, req.body); // Acceso y modificación de BBDD en Controllers
			armarioActual = await buscarPorId(req.params.id); // Búsqueda nuevo dato en BBDD por Controllers para devolver dato antiguo y actual.
		// } catch (error) {
		// 	res.status(500).json({ msg: "Error: fallo del servidor" });
		// }
		encontrado === null && res.status(404).json({ msg: "Error: aramario no encontrado" });
		encontrado !== null &&
			res.json({
				datoAntiguo: encontrado,
				datoActual: armarioActual,
				msg: "armario actualizado correctamente",
			});
	// } catch (error) {
	// 	res.status(500).json({ msg: "Error: fallo interno del servidor" });
	// }
});



module.exports = router
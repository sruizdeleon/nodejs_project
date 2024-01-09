const express = require("express");

const router = express.Router();

const {
	buscarTodos,
	buscarPorId,
	crearPrenda,
	eliminarPrenda,
	modificarPrenda,
	modificarPrendaParcial,
} = require("../controllers/prenda.controller");

const {
	middlewareValidacionPrendaCompleto,
	middlewareValidacionPrendaParcial,
} = require("../middlewares/prenda.middleware");

/* GET */

router.get("/", async (req, res) => {
	try {
		let prendas = await buscarTodos(); // Acceso y búsqueda en BBDD por Controllers
		res.json(prendas);
	} catch (error) {
		res.status(500).json({ msg: "Error: fallo interno del servidor" });
	}
});

router.get("/:id", async (req, res) => {
	try {
		let objetoEncontrado = new Object();
		try {
			objetoEncontrado = await buscarPorId(req.params.id); // Acceso y búsqueda en BBDD por Controllers
		} catch (error) {
			res.status(500).json({ msg: "Error: fallo del servidor" });
		}
		if (objetoEncontrado) {
			res.json(objetoEncontrado);
		} else {
			res.status(404).json({ msg: "Error: prenda no encontrada" });
		}
	} catch (error) {
		res.status(500).json({ msg: "Error: fallo interno del servidor" });
	}
});

/* POST */

router.post("/", middlewareValidacionPrendaCompleto, async (req, res) => {
	try {
		const nuevaPrenda = await crearPrenda(req.body); // Acceso y creación en BBDD por Controllers
		res.json({ dato: nuevaPrenda, msg: `Se ha creado la prenda correctamente` });
	} catch (error) {
		res.status(500).json({ msg: "Error: fallo interno del servidor" });
	}
});

/* DELETE */

router.delete("/:id", async (req, res) => {
	try {
		let prendaBorrada = new Object();
		try {
			prendaBorrada = await eliminarPrenda(req.params.id); // Acceso y modificación de BBDD en Controllers
		} catch (error) {
			res.status(500).json({ msg: "Error: fallo del servidor" });
		}
		if (prendaBorrada) {
			res.json({ dato: prendaBorrada, msg: "prenda borrada correctamente" });
		} else {
			res.status(404).json({ msg: "Error: prenda no encontrada" });
		}
	} catch (error) {
		res.status(500).json({ msg: "Error: fallo interno del servidor" });
	}
});

/* PUT */

router.put("/:id", middlewareValidacionPrendaCompleto, async (req, res) => {
	try {
		let encontrado = new Object();
		let prendaActual = new Object();
		try {
			encontrado = await modificarPrenda(req.params.id, req.body); // Acceso y modificación de BBDD en Controllers
			prendaActual = await buscarPorId(req.params.id); // Búsqueda nuevo dato en BBDD por Controllers para devolver dato antiguo y actual.
		} catch (error) {
			res.status(500).json({ msg: "Error: fallo del servidor" });
		}
		encontrado === null && res.status(404).json({ msg: "Error: prenda no encontrada" });
		encontrado !== null &&
			res.json({
				datoAntiguo: encontrado,
				datoActual: prendaActual,
				msg: "prenda actualizada correctamente",
			});
	} catch (error) {
		res.status(500).json({ msg: "Error: fallo interno del servidor" });
	}
});

/* PATCH */

router.patch("/:id", middlewareValidacionPrendaParcial, async (req, res) => {
	try {
		let encontrado = new Object;
		let prendaActual = new Object;
		try {
			encontrado = await modificarPrendaParcial(req.params.id, req.body); // Acceso y modificación de BBDD en Controllers
			prendaActual = await buscarPorId(req.params.id); // Búsqueda nuevo dato en BBDD por Controllers para devolver dato antiguo y actual.
		} catch (error) {
			res.status(500).json({ msg: "Error: fallo del servidor" });
		}
		encontrado === null && res.status(404).json({ msg: "Error: prenda no encontrada" });
		encontrado !== null &&
			res.json({
				datoAntiguo: encontrado,
				datoActual: prendaActual,
				msg: "prenda actualizada correctamente",
			});
	} catch (error) {
		res.status(500).json({ msg: "Error: fallo interno del servidor" });
	}
});

module.exports = router;

const express = require('express')

const router = express.Router()

const { buscarTodos, buscarPorId, crearPrenda, eliminarPrenda, modificarPrenda, modificarPrendaParcial } = require('../controllers/prenda.controller')

const { validarAtributosPrendaCompleta, validarAtributosPrendaParcial } = require('../helpers/validadores')

/* GET */

router.get('/', async (req, res) =>{
    try {
        const prendas = await buscarTodos() // Acceso y búsqueda en BBDD por Controllers
        res.json(prendas)
    } catch (error) {
        res.status(500).json({msg: 'Error: fallo interno del servidor'})
    }
})

router.get('/:id', async (req, res) =>{
    try {
        const objetoEncontrado = await buscarPorId(req.params.id) // Acceso y búsqueda en BBDD por Controllers
        if (objetoEncontrado) {
            res.json(objetoEncontrado)
        }
        else {
            res.status(404).json({msg: 'Error: prenda no encontrada'})
        }
    } catch (error){
        res.status(500).json({msg: 'Error: fallo interno del servidor'})
    }
})


/* POST */

router.post('/', async (req, res) =>{
    try {
        const resultadoValidacion = await validarAtributosPrendaCompleta(req.body) // Validación de atributos en Helpers
        if (!resultadoValidacion.valido) {
            res.status(400).json({msg: resultadoValidacion.mensaje})
        }
        else {
            const nuevaPrenda = await crearPrenda( // Acceso y creación en BBDD por Controllers
                req.body.categoria.trim(),
                req.body.subcategoria.trim(),
                req.body.marca.trim(),
                req.body.talla.trim(),
                req.body.color.trim(),
            );
            res.json({dato: nuevaPrenda, msg: `Se ha creado la prenda correctamente`})
        }
    } catch (error) {
        res.status(500).json({msg: 'Error: fallo interno del servidor'})
    }
})


/* DELETE */

router.delete('/:id', async (req, res) =>{
    try {
        const prendaBorrada = await eliminarPrenda(req.params.id) // Acceso y modificación de BBDD en Controllers
        if (prendaBorrada) {
            res.json({dato: prendaBorrada, msg: 'prenda borrada correctamente'})
        }
        else {
            res.status(404).json({msg: 'Error: prenda no encontrada'})
        }
    } catch (error) {
        res.status(500).json({msg: 'Error: fallo interno del servidor'})
    }
})


/* PUT */

router.put('/:id', async (req, res) => {
    try {
        let encontrado = null;
        const resultadoValidacion = await validarAtributosPrendaCompleta(req.body)  // Validación de atributos en Helpers
        if (resultadoValidacion.valido === false) {
            res.status(400).json({msg: resultadoValidacion.msg})
        } else {
            encontrado = await modificarPrenda( // Acceso y modificación de BBDD en Controllers
                req.params.id,
                req.body.categoria.trim(),
                req.body.subcategoria.trim(),
                req.body.marca.trim(),
                req.body.talla.trim(),
                req.body.color.trim(),
            )
            const prendaActual = await buscarPorId(req.params.id) // Búsqueda nuevo dato en BBDD por Controllers para devolver dato antiguo y actual.
            encontrado === null && res.status(404).json({msg: "Error: prenda no encontrada"})
            encontrado !== null && res.json({datoAntiguo: encontrado, datoActual: prendaActual, msg: 'prenda actualizada correctamente'})
        }
    } catch (error) {
        res.status(500).json({msg: 'Error: fallo interno del servidor'})
    }
})


/* PATCH */

router.patch('/:id', async (req, res) => {
    try {
        let encontrado = null;
        let resultadoValidacion = await validarAtributosPrendaParcial(req.body)  // Validación de atributos en Helpers
        if (resultadoValidacion.valido === false) {
            res.status(400).json({msg: resultadoValidacion.msg})
        } else {
            encontrado = await modificarPrendaParcial(req.params.id, resultadoValidacion.atributos) // Acceso y modificación de BBDD en Controllers
            let prendaActual = await buscarPorId(req.params.id) // Búsqueda nuevo dato en BBDD por Controllers para devolver dato antiguo y actual.
            encontrado === null && res.status(404).json({msg: "Error: prenda no encontrada"})
            encontrado !== null && res.json({datoAntiguo: encontrado, datoActual: prendaActual, msg: 'prenda actualizada correctamente'})
        }
    } catch (erro) {
        res.status(500).json({msg: 'Error: fallo interno del servidor'})
    }
})

module.exports = router
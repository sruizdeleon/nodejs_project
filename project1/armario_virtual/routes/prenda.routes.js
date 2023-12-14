const express = require('express')

const router = express.Router()

const { buscarTodos, buscarPorId, crearPrenda, eliminarPrenda, modificarPrenda } = require('../controllers/prenda.controller')

const { validarAtributosPrenda } = require('../helpers/validadores')

/* GET */

router.get('/', async (req, res) =>{
    try {
        const prendas = await buscarTodos()
        res.json(prendas)
    } catch (error) {
        res.status(500).json({msg: 'Error: fallo interno del servidor'})
    }
})

router.get('/:id', async (req, res) =>{
    try {
        const objetoEncontrado = await buscarPorId(req.params.id)
        if (objetoEncontrado) { // Si existe
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
        const resultadoValidacion = await validarAtributosPrenda(req.body)
        if (!resultadoValidacion.valido) {
            res.status(400).json({msg: resultadoValidacion.mensaje})
        }
        else {
            const nuevaPrenda = await crearPrenda(
                req.body.categoria.trim(),
                req.body.subcategoria.trim(),
                req.body.marca.trim(),
                req.body.talla.trim(),
                req.body.color.trim(),
            )
            await nuevaPrenda.save()
            res.json({dato: nuevaPrenda, msg: `Se ha creado la prenda correctamente`})
        }
    } catch (error) {
        res.status(500).json({msg: 'Error: fallo interno del servidor'})
    }
})


/* DELETE */

router.delete('/:id', async (req, res) =>{
    try {
        const prendaBorrada = await eliminarPrenda(req.params.id)
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
        const resultadoValidacion = await validarAtributosPrenda(req.body)
        if (!resultadoValidacion.valido) {
            res.status(400).json({msg: resultadoValidacion.mensaje})
        } else {
            encontrado = await modificarPrenda(
                req.params.id,
                req.body.categoria.trim(),
                req.body.subcategoria.trim(),
                req.body.marca.trim(),
                req.body.talla.trim(),
                req.body.color.trim(),
            )
            const prendaActual = await buscarPorId(req.params.id)
            res.json(encontrado === null ? {msg: "Error: prenda no encontrada"} : {datoAntiguo: encontrado, datoActual: prendaActual, msg: 'prenda actualizada correctamente'})
        }
    } catch (error) {
        res.status(500).json({msg: 'Error: fallo interno del servidor'})
    }
})


/* PATCH */

/* A falta de crear validación */

/* router.patch('/:id', async (req, res) => {
    let encontrado = null;
    encontrado = await modificarPrenda(
        req.params.id,
        req.body.categoria.trim(),
        req.body.subcategoria.trim(),
        req.body.marca.trim(),
        req.body.talla.trim(),
        req.body.color.trim(),
    )
    const prendaActual = await buscarPorId(req.params.id)
    res.json(encontrado === null ? {msg: "Error: prenda no encontrada"} : {datoAntiguo: encontrado, datoActual: prendaActual, msg: 'prenda actualizada correctamente'})
}) */

module.exports = router
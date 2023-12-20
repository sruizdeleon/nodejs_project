const express = require('express')

const router = express.Router()

const { buscarTodos, buscarPorId, crearUsuario, eliminarUsuario, modificarUsuario, modificarUsuarioParcial } = require('../controllers/usuario.controller')

const { validarAtributosUsuarioCompleto, validarAtributosUsuarioParcial } = require('../helpers/validadores')

/* GET */
router.get('/', async(req, res) =>{
    try {
        const usuarios = await buscarTodos()
        res.json(usuarios)
    } catch (error) {
        res.status(500).json({msg: 'Error: fallo interno del servidor'})
    }
})


/* GET BY ID */
router.get('/:id', async (req, res) =>{
    try {
        const objetoEncontrado = await buscarPorId(req.params.id)
        if (objetoEncontrado) {
            res.json(objetoEncontrado)
        }
        else {
            res.status(404).json({msg: 'Error: usuario no encontrado'})
        }
    } catch (error) {
        res.status(500).json({msg: 'Error: fallo interno del servidor'})
    }
})


/* POST */
router.post('/', async (req, res) =>{
    try {
        const resultadoValidacion = await validarAtributosUsuario(req.body)
        if (!resultadoValidacion.valido) {
            res.status(400).json({msg: resultadoValidacion.mensaje})
        } else {
        const nuevoUsuario = await crearUsuario(
            req.body.nombre.trim(),
            req.body.apellidos.trim(),
            req.body.email.trim(),
            req.body.movil.trim(),
            req.body.fechaNacimiento.trim(),
            req.body.genero.trim(),
        );
            /* Control de respuesta si todo correcto */
            res.json({dato: nuevoUsuario, msg: `Se ha creado el usuario correctamente`})
        }
    } catch (error) {
        res.status(500).json({msg: 'Error: fallo interno del servidor'})
    }
})


/* DELETE */
router.delete('/:id', async (req, res) =>{
    try {
        const usuarioBorrado = await eliminarUsuario(req.params.id)
        if (usuarioBorrado) {
            res.json({dato: usuarioBorrado, msg: 'usuario borrado correctamente'})
        }
        else {
            res.status(404).json({msg: 'error: usuario no encontrado'})
        }
    } catch (error) {
        res.status(500).json({msg: 'Error: fallo interno del servidor'})
    }
})


/* PUT */
router.put('/:id', async (req, res) => {
    try {
        let encontrado = null;
        const resultadoValidacion = await validarAtributosUsuarioCompleto(req.body)
        if (resultadoValidacion.valido === false) {
            res.status(400).json({msg: resultadoValidacion.msg})
        } else {
            encontrado = await modificarUsuario(
                req.params.id,
                req.body.nombre.trim(),
                req.body.apellidos.trim(),
                req.body.email.trim(),
                req.body.movil.trim(),
                req.body.fechaNacimiento.trim(),
                req.body.genero.trim()
            )
            const usuarioActual = await buscarPorId(req.params.id)
            encontrado === null && res.status(404).json({msg: "Error: usuario no encontrado"})
            encontrado !== null && res.json({datoAntiguo: encontrado, datoActual: usuarioActual, msg: 'usuario actualizado correctamente'})
        }
    } catch (error) {
        res.status(500).json({msg: 'Error: fallo interno del servidor'})
    }
})


/* PATCH */

router.patch('/:id', async (req, res) => {
    try {
        let encontrado = null;
        let resultadoValidacion = await validarAtributosUsuarioParcial(req.body)
        if (resultadoValidacion.valido === false) {
            res.status(400).json({msg: resultadoValidacion.msg})
        } else {
            encontrado = await modificarUsuarioParcial(req.params.id, resultadoValidacion.atributos)
            let usuarioActual = await buscarPorId(req.params.id)
            encontrado === null && res.json({msg: "Error: usuario no encontrado"})
            encontrado !== null && res.json({datoAntiguo: encontrado, datoActual: usuarioActual, msg: 'usuario actualizado correctamente'})
        }
    } catch (erro) {
        res.status(500).json({msg: 'Error: fallo interno del servidor'})
    }
})


module.exports = router
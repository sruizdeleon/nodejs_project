const express = require('express')

const router = express.Router()

const { buscarTodos, buscarPorId, crearUsuario, eliminarUsuario, modificarUsuario, modificarUsuarioParcial } = require('../controllers/usuario.controller')

const { middlewareValidacionUsuarioParcial, middlewareValidacionUsuarioCompleto } = require('../middlewares/usuario.middleware')

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
        const resultadoValidacion = await validarAtributosUsuarioCompleto(req.body) // Validación de atributos en Helpers
        if (!resultadoValidacion.valido) {
            res.status(400).json({msg: resultadoValidacion.mensaje})
        } else {
        const nuevoUsuario = await crearUsuario( // Acceso y creación en BBDD por Controllers
            req.body.nombre.trim(),
            req.body.apellidos.trim(),
            req.body.email.trim(),
            req.body.movil.trim(),
            req.body.fechaNacimiento.trim(),
            req.body.genero.trim(),
        );
            res.json({dato: nuevoUsuario, msg: `Se ha creado el usuario correctamente`})
        }
    } catch (error) {
        res.status(500).json({msg: 'Error: fallo interno del servidor'})
    }
})


/* DELETE */
router.delete('/:id', async (req, res) =>{
    try {
        const usuarioBorrado = await eliminarUsuario(req.params.id) // Acceso y modificación de BBDD en Controllers
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
router.put('/:id', middlewareValidacionUsuarioCompleto, async (req, res) => {
    try {
        let encontrado = null;
        encontrado = await modificarUsuario(  // Acceso y modificación de BBDD en Controllers
            req.params.id,
            req.body.nombre.trim(),
            req.body.apellidos.trim(),
            req.body.email.trim(),
            req.body.movil.trim(),
            req.body.fechaNacimiento.trim(),
            req.body.genero.trim()
        )
        const usuarioActual = await buscarPorId(req.params.id) // Búsqueda nuevo dato en BBDD por Controllers para devolver dato antiguo y actual.
        encontrado === null && res.status(404).json({msg: "Error: usuario no encontrado"})
        encontrado !== null && res.json({datoAntiguo: encontrado, datoActual: usuarioActual, msg: 'usuario actualizado correctamente'})
    } catch (error) {
        res.status(500).json({msg: 'Error: fallo interno del servidor'})
    }
})


/* PATCH */

router.patch('/:id', middlewareValidacionUsuarioParcial, async (req, res) => {
    try {
        let encontrado = null;
        encontrado = await modificarUsuarioParcial(req.params.id, resultadoValidacion.atributos) // Acceso y modificación de BBDD en Controllers
        let usuarioActual = await buscarPorId(req.params.id) // Búsqueda nuevo dato en BBDD por Controllers para devolver dato antiguo y actual.
        encontrado === null && res.json({msg: "Error: usuario no encontrado"})
        encontrado !== null && res.json({datoAntiguo: encontrado, datoActual: usuarioActual, msg: 'usuario actualizado correctamente'})

    } catch (erro) {
        res.status(500).json({msg: 'Error: fallo interno del servidor'})
    }
})


module.exports = router
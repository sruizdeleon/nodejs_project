

const Usuario = require('../models/usuario.model')

async function buscarTodos() {
    const usuarios = await Usuario.find()
    return usuarios
}

async function buscarPorId(id) {
    const usuarioEncontrado = await Usuario.findById(id)
    return usuarioEncontrado
}

async function crearUsuario(nombre, apellidos, email, movil, fechaNacimiento, genero) {
    /* Creación del documento Usuario */
    const nuevoUsuario = new Usuario ({
        nombre: nombre,
        apellidos: apellidos,
        email: email,
        movil: movil,
        fechaNacimiento: fechaNacimiento,
        genero: genero
    })
    /* Guardado del documento Usuario */
    await nuevoUsuario.save()
    /* Retornando el nuevo usuario a Router */
    return nuevoUsuario
}

async function eliminarUsuario(id) {
    /* Búsqueda de id, borrado y asignación de documento borrado */
    const usuarioBorrado = await Usuario.findByIdAndDelete(id)
    return usuarioBorrado
}

async function modificarUsuario(id, nombre, apellidos, email, movil, fechaNacimiento, genero) {
    const usuarioSinModificar = Usuario.findByIdAndUpdate (
    id,
    {
        nombre: nombre,
        apellidos: apellidos,
        email: email,
        movil: movil,
        fechaNacimiento: fechaNacimiento,
        genero: genero
    })
    return usuarioSinModificar
}

module.exports = {
    buscarTodos,
    buscarPorId,
    crearUsuario,
    eliminarUsuario,
    modificarUsuario
}
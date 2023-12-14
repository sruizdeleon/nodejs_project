

const Prenda = require('../models/prenda.model')

async function buscarTodos() {
    const prendas = await Prenda.find()
    return prendas
}

async function buscarPorId(id) {
    const prendaEncontrada = await Prenda.findById(id)
    return prendaEncontrada
}

async function crearPrenda(categoria, subcategoria, marca, talla, color) {
    /* Creación del documento Prenda */
    const nuevaPreda = new Prenda ({
        categoria: categoria,
        subcategoria: subcategoria,
        marca: marca,
        talla: talla,
        color: color
    })
    /* Guardado del documento Prenda */
    await nuevaPreda.save()
    /* Retornando el nuevo Prenda a Router */
    return nuevaPreda
}

async function eliminarPrenda(id) {
    /* Búsqueda de id, borrado y asignación de documento borrado */
    const prendaBorrada = await Prenda.findByIdAndDelete(id)
    return prendaBorrada
}

async function modificarPrenda(id, categoria, subcategoria, marca, talla, color) {
    const prendaSinModificar = Prenda.findByIdAndUpdate (
    id,
    {
        categoria: categoria,
        subcategoria: subcategoria,
        marca: marca,
        talla: talla,
        color: color
    })
    return prendaSinModificar
}

module.exports = {
    buscarTodos,
    buscarPorId,
    crearPrenda,
    eliminarPrenda,
    modificarPrenda
}
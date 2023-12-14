const mongoose = require('mongoose')

const Schema = mongoose.Schema

const prendaSchema = new Schema({
    marca: {
        type: String,
        required: false
    },
    categoria: {
        type: String,
        required: true
    },
    subcategoria: {
        type: String,
        required: true
    },
    talla: {
        type: String,
        required: false
    },
    color: {
        type: String,
        required: true
    }
})

const Prendas = mongoose.model("prendas", prendaSchema)

module.exports = Prendas;
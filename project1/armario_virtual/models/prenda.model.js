const mongoose = require('mongoose')

const Schema = mongoose.Schema

const prendaSchema = new Schema({
    categoria: {
        type: String,
        required: true
    },
    subcategoria: {
        type: String,
        required: true
    },
    ocasion: {
        type: String,
        required: true
    },
    estacion: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    colorimetria: {
        type: String,
        required: true
    },
    talla: {
        type: String,
        required: false
    },
    marca: {
        type: String,
        required: false
    },
    armarioId: {
		type: mongoose.Types.ObjectId,
		ref: "armario",
		required: true,
    },
    usuarioId: {
		type: mongoose.Types.ObjectId,
		ref: "usuario",
		required: true,
    }
})

const Prenda = mongoose.model("prenda", prendaSchema)

module.exports = Prenda;
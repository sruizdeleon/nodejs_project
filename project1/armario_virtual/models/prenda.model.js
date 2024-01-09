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
    // armario: {
	// 	type: mongoose.Types.ObjectId,
	// 	ref: "usuarios",
	// 	required: true,
    // }
})

const Prendas = mongoose.model("prendas", prendaSchema)

module.exports = Prendas;
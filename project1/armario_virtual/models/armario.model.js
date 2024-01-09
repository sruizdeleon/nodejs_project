const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const armarioSchema = new Schema({
    nombreArmario: {
        type: String,
        required: true,
    },
    descripcionArmario: {
        type: String,
        required: false,
    },
	usuario: {
		type: mongoose.Types.ObjectId,
		ref: "usuarios",
		required: true,
	},
	prendas: [{
		type: mongoose.Types.ObjectId,
		ref: "prendas",
		required: false,
	}],
});

const Armario = mongoose.model("armario", armarioSchema);

module.exports = Armario;
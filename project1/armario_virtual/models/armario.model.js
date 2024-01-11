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
		ref: "usuario",
		required: true,
	},
	prendas: [{
		type: mongoose.Types.ObjectId,
		ref: "prenda",
		required: false,
	}],
});

const Armario = mongoose.model("armario", armarioSchema);

module.exports = Armario;
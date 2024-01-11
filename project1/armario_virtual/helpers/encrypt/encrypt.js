const bcrypt = require("bcryptjs");

/* Encriptado de contraseña */
async function encriptar(password) {
    const salt = await bcrypt.genSalt(12)
    const hash = bcrypt.hash(password, salt)
    return hash;
}

/* Comprobación de contraseña */
async function comprobar(hash, passwordAComprobar) {
    const resultado = await bcrypt.compare(passwordAComprobar, hash);
    return resultado
}

module.exports = {
    encriptar,
    comprobar
}
/* ARMARIO */

/* Funciones de formato ARMARIO */

async function formatoNombreArmario(nombreArmarioAComprobar) {
	let regexNombreArmario = await cargarRegexNombreArmario();
	const formatoValido = regexNombreArmario.test(nombreArmarioAComprobar);
	return formatoValido;
}

async function formatoDescripcionArmario(descripcionArmarioAComprobar) {
	let regexDescripcionArmario = await cargarRegexDescripcionArmario();
	const formatoValido = regexDescripcionArmario.test(descripcionArmarioAComprobar);
	return formatoValido;
}

async function formatoUsuario(usuarioAComprobar) {
	let regexUsuario = await cargarRegexUsuario();
	const formatoValido = regexUsuario.test(usuarioAComprobar);
	return formatoValido;
}

/* ---------------------------------------------------------------------------------------------------------------- */

/* CATEGORIZACIÓN DE ARMARIO */
// Aquí se representan todas las categorías y expresiones regulares elegibles por cada atributo de la entidad ARMARIO

/* INDICE */
// Nombre del armario
// Descripción del armario
// id de usuario
// id de producto

/* Nombre del armario */
async function cargarRegexNombreArmario() {
	let objetoACargar = new Promise((resolve) => {
		const regexNombreArmario = /^[a-zA-Z0-9áéíóúüÁÉÍÓÚÜñÑ,.;:\s']{1,40}$/;
		resolve(regexNombreArmario);
	});
	return await objetoACargar;
}

/* Descripción del armario */
async function cargarRegexDescripcionArmario() {
	let objetoACargar = new Promise((resolve) => {
		const regexDescripcionArmario = /^[a-zA-Z0-9áéíóúüÁÉÍÓÚÜñÑ,.;:\s']{1,200}$/;
		resolve(regexDescripcionArmario);
	});
	return await objetoACargar;
}

/* Descripción del armario */
async function cargarRegexUsuario() {
	let objetoACargar = new Promise((resolve) => {
		const cargarRegexUsuario = /^[0-9a-fA-F]{24}$/;
		resolve(cargarRegexUsuario);
	});
	return await objetoACargar;
}

module.exports = {
	formatoNombreArmario,
	formatoDescripcionArmario,
	formatoUsuario,
};

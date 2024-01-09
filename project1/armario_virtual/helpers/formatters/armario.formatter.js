





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


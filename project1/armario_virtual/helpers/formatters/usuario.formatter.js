/* USUARIO */

/* Funciones de formato USUARIO */

async function formatoNombre(nombreAComprobar) {
	let regexNombre = await cargarRegexNombre();

	let formatoValido = regexNombre.test(nombreAComprobar);

	const nombresCompuestos = nombreAComprobar.split(/\s+/).length - 1;

	if (nombresCompuestos > 4 || nombreAComprobar.length > 40) {
		formatoValido = false;
	}
	return formatoValido;
}

async function formatoApellidos(apellidosAComprobar) {
	let regexApellidos = await cargarRegexApellidos();
	let formatoValido = regexApellidos.test(apellidosAComprobar);
	const apellidosCompuestos = apellidosAComprobar.split(/\s+/).length - 1;
	apellidosCompuestos > 5 ? (formatoValido = false) : true;
	return formatoValido;
}

async function formatoEmail(emailAComprobar) {
	let regexEmail = await cargarRegexEmail();
	const formatoValido = regexEmail.test(emailAComprobar);
	return formatoValido;
}

async function formatoMovil(movilAComprobar) {
	let regexMovil = await cargarRegexMovil();
	const formatoValido = regexMovil.test(movilAComprobar);
	return formatoValido;
}

async function formatoFechaNacimiento(fechaAComprobar) {
	let regexFecha = await cargarRegexFecha();
	let formatoValido = true;

	regexFecha.test(fechaAComprobar) ? (formatoValido = true) : (formatoValido = false);

	if (formatoValido) {
		let comprobacionFecha = new Array();

		const [dia, mes, ano] = fechaAComprobar.split("/").map(Number);

		mes < 1 || mes > 12 ? comprobacionFecha.push("false") : true;

		let mesesCon31Dias = [1, 3, 5, 7, 8, 10, 12];
		let mesesCon30Dias = [4, 6, 9, 11];
		mesesCon31Dias.includes(mes) && (dia >= 1 && dia <= 31 ? true : comprobacionFecha.push("false"));
		mesesCon30Dias.includes(mes) && (dia >= 1 && dia <= 30 ? true : comprobacionFecha.push("false"));

		let anoBisiesto = (ano % 4 === 0 && ano % 100 !== 0) || ano % 400 === 0;
		mes === 2 && anoBisiesto && (dia >= 1 && dia <= 29 ? true : comprobacionFecha.push("false"));
		mes === 2 && !anoBisiesto && (dia >= 1 && dia <= 28 ? true : comprobacionFecha.push("false"));

		if (comprobacionFecha.length > 0) {
			return (formatoValido = false);
		} else {
			return (formatoValido = true);
		}
	} else {
		return formatoValido;
	}
}

async function formatoGenero(generoAComprobar) {
	let tiposDeGeneros = await cargarTiposDeGeneros();
	let formatoValido = null;
	tiposDeGeneros.includes(generoAComprobar) === true ? (formatoValido = true) : (formatoValido = false);
	return formatoValido;
}

async function formatoTiposDeUsuario(tipoDeUsuarioAComprobar) {
	let tiposDeUsuario = await cargarTiposDeUsuario();
	let formatoValido = null;
	tiposDeUsuario.includes(tipoDeUsuarioAComprobar) === true ? (formatoValido = true) : (formatoValido = false);
	return formatoValido;
}

async function formatoPassword(passwordAComprobar) {
	let regexPassword = await cargarRegexPassword();
	const formatoValido = regexPassword.test(passwordAComprobar);
	return formatoValido;
}

async function formatoTiposDeCliente(tipoDeClienteAComprobar) {
	let tiposDeCliente = await cargarTiposDeClientes();
	let formatoValido = null;
	tiposDeCliente.includes(tipoDeClienteAComprobar) === true ? (formatoValido = true) : (formatoValido = false);
	return formatoValido;
}

/* ---------------------------------------------------------------------------------------------------------------- */

/* CATEGORIZACIÓN DE USUARIO */
// Aquí se representan todas las categorías y expresiones regulares elegibles por cada atributo de la entidad USUARIO

/* INDICE */
// Nombre
// Apellido
// Email
// Movil
// Password
// Fecha de Nacimiento
// Género
// Tipo de cliente
// Tipo de usuario

/* Nombre */
async function cargarRegexNombre() {
	let objetoACargar = new Promise((resolve) => {
		const regexNombre = /^[a-zA-ZáéíóúüÁÉÍÓÚÜñÑ\s']{1,40}$/;
		resolve(regexNombre);
	});
	return await objetoACargar;
}

/* Apellidos */
async function cargarRegexApellidos() {
	let objetoACargar = new Promise((resolve) => {
		let regexApellidos = /^[a-zA-ZáéíóúüÁÉÍÓÚÜñÑ\s']{1,80}$/;
		resolve(regexApellidos);
	});
	return await objetoACargar;
}

/* Email */
async function cargarRegexEmail() {
	let objetoACargar = new Promise((resolve) => {
		let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		resolve(regexEmail);
	});
	return await objetoACargar;
}

/* Movil */

async function cargarRegexMovil() {
	let objetoACargar = new Promise((resolve) => {
		let regexMovil = /^[0-9]{9}$/;
		resolve(regexMovil);
	});
	return await objetoACargar;
}

/* Password */

async function cargarRegexPassword() {
	let objetoACargar = new Promise((resolve) => {
		let regexPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&.,;:-])([A-Za-z\d@$!%*?&.,;:-]{8,16})$/;
		resolve(regexPassword);
	});
	return await objetoACargar;
}

/* Fecha de nacimiento */
async function cargarRegexFecha() {
	let objetoACargar = new Promise((resolve) => {
		let regexFecha = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
		resolve(regexFecha);
	});
	return await objetoACargar;
}

/* Género */
async function cargarTiposDeGeneros() {
	let objetoACargar = new Promise((resolve) => {
		let tiposDeGeneros = ["hombre", "mujer", "prefiero no decirlo"];
		resolve(tiposDeGeneros);
	});
	return await objetoACargar;
}

/* Tipo de cliente */
async function cargarTiposDeClientes() {
	let objetoACargar = new Promise((resolve) => {
		let tiposDeClientes = ["basico", "avanzado", "premium"];
		resolve(tiposDeClientes);
	});
	return await objetoACargar;
}

/* Tipo de usuario */
async function cargarTiposDeUsuario() {
	let objetoACargar = new Promise((resolve) => {
		let tiposDeUsuario = ["usuario", "administrador", "super administrador"];
		resolve(tiposDeUsuario);
	});
	return await objetoACargar;
}

module.exports = {
	formatoNombre,
	formatoApellidos,
	formatoEmail,
	formatoMovil,
	formatoFechaNacimiento,
	formatoGenero,
	formatoTiposDeUsuario,
	formatoPassword,
	formatoTiposDeCliente,
};

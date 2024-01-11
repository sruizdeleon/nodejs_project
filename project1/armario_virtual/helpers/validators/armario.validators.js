const { formatoNombreArmario, formatoDescripcionArmario, formatoUsuario } = require("../formatters/armario.formatter");

/* Validadores POST y PUT */

async function validarAtributosArmarioCompleto(body) {
	const atributosErroneos = new Array();

	/* Comprobación si existen todos los atributos, si no existen se acumula el error "no definido" */
	body.nombreArmario !== undefined
		? body.nombreArmario.trim() !== ""
			? (await formatoNombreArmario(body.nombreArmario.trim())) === true
				? (body.nombreArmario = body.nombreArmario.trim())
				: atributosErroneos.push("Nombre del armario: formato erróneo")
			: atributosErroneos.push("Nombre del armario: en blanco")
		: atributosErroneos.push("Nombre del armario: no definido");

	body.descripcionArmario !== undefined
		? body.descripcionArmario.trim() !== ""
			? (await formatoDescripcionArmario(body.descripcionArmario.trim())) === true
				? (body.descripcionArmario = body.descripcionArmario.trim())
				: atributosErroneos.push("descripcionArmario: formato erróneo")
			: atributosErroneos.push("descripcionArmario: en blanco")
		: atributosErroneos.push("descripcionArmario: no definido");

	if (atributosErroneos.length > 0) {
		return {
			valido: false,
			msg: `Error: los siguientes atributos han resultado erróneos: ${atributosErroneos.join(", ")}.`,
		};
	} else {
		return {
			valido: true,
			msg: null,
		};
	}
}

/* Validadores PATCH */

async function validarAtributosArmarioParcial(body) {
	let existenAtributos = false;
	const atributosErroneos = new Array();

	/* Comprobación si existen todos los atributos, si no existen se acumula el error "no definido" */
	console.log(body.nombreArmario, body.descripcionArmario);
	body.nombreArmario !== undefined
		? body.nombreArmario.trim() !== ""
			? (await formatoNombreArmario(body.nombreArmario.trim())) === true
				? ((body.nombreArmario = body.nombreArmario.trim()) && (existenAtributos = true))
				: atributosErroneos.push("Nombre del armario: formato erróneo")
			: atributosErroneos.push("Nombre del armario: en blanco")
		: false;
	console.log(atributosErroneos, existenAtributos);
	body.descripcionArmario !== undefined
		? body.descripcionArmario.trim() !== ""
			? (await formatoDescripcionArmario(body.descripcionArmario.trim())) === true
				? ((body.descripcionArmario = body.descripcionArmario.trim()) && (existenAtributos = true))
				: atributosErroneos.push("descripcionArmario: formato erróneo")
			: atributosErroneos.push("descripcionArmario: en blanco")
		: false;

	body.usuario !== undefined
		? body.usuario.trim() !== ""
			? (await formatoUsuario(body.usuario.trim().toLowerCase())) === true
				? ((body.usuario = body.usuario.trim().toLowerCase()) && (existenAtributos = true))
				: atributosErroneos.push("usuario: formato erróneo")
			: atributosErroneos.push("usuario: en blanco")
		: false;

	if (existenAtributos === false) {
		return {
			valido: false,
			msg: `Error: no se ha proporcionado ningún atributo válido.`,
		};
	}

	if (atributosErroneos.length > 0) {
		return {
			valido: false,
			msg: `Error: los siguientes atributos han resultado erróneos: ${atributosErroneos.join(", ")}.`,
		};
	} else {
		return {
			valido: true,
			msg: null,
		};
	}
}

module.exports = {
	validarAtributosArmarioCompleto,
	validarAtributosArmarioParcial,
};

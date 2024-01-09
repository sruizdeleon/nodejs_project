const {
	formatoNombre,
	formatoApellidos,
	formatoEmail,
	formatoMovil,
	formatoFechaNacimiento,
	formatoGenero,
	formatoTiposDeUsuario,
	formatoPassword,
	formatoTiposDeCliente,
} = require("../formatters/usuario.formatter");

/* Validadores POST y PUT */

async function validarAtributosUsuarioCompleto(body) {
	const atributosErroneos = new Array();

		/* Comprobación si existen todos los atributos, si no existen se acumula el error "no definido" */
	body.nombre !== undefined
		? body.nombre.trim() !== ""
			? ((await formatoNombre(body.nombre.trim())) === true)
				? (body.nombre = body.nombre.trim())
				: atributosErroneos.push("nombre: formato erróneo")
			: atributosErroneos.push("nombre: en blanco")
		: atributosErroneos.push("nombre: no definido");

	body.apellidos !== undefined
		? body.apellidos.trim() !== ""
			? ((await formatoApellidos(body.apellidos.trim())) === true)
				? (body.apellidos = body.apellidos.trim())
				: atributosErroneos.push("apellidos: formato erróneo")
			: atributosErroneos.push("apellidos: en blanco")
		: atributosErroneos.push("apellidos: no definido");

	body.email !== undefined
		? body.email.trim() !== ""
			? ((await formatoEmail(body.email.trim().toLowerCase())) === true)
				? (body.email = body.email.trim().toLowerCase())
				: atributosErroneos.push("email: formato erróneo")
			: atributosErroneos.push("email: en blanco")
		: atributosErroneos.push("email: no definido");

	body.movil !== undefined
		? body.movil.trim() !== ""
			? ((await formatoMovil(body.movil.replace(/ /g, ""))) === true)
				? (body.movil = body.movil.replace(/ /g, ""))
				: atributosErroneos.push("movil: formato erróneo")
			: atributosErroneos.push("movil: en blanco")
		: atributosErroneos.push("móvil: no definido");

	body.genero !== undefined
		? body.genero.trim() !== ""
			? ((await formatoGenero(body.genero.trim())) === true)
				? (body.genero = body.genero.trim())
				: atributosErroneos.push("género: formato erróneo")
			: atributosErroneos.push("género: en blanco")
		: atributosErroneos.push("género: no definido");

	body.fechaNacimiento !== undefined
		? body.fechaNacimiento.trim() !== ""
			? ((await formatoFechaNacimiento(body.fechaNacimiento.trim())) === true)
				? (body.fechaNacimiento = body.fechaNacimiento.trim())
				: atributosErroneos.push("fecha de nacimiento: formato erróneo")
			: atributosErroneos.push("fecha de nacimiento: en blanco")
		: atributosErroneos.push("fechaNacimiento: no definida");

	body.tipoDeCliente !== undefined
		? body.tipoDeCliente.trim() !== ""
			? ((await formatoTiposDeCliente(body.tipoDeCliente.trim())) === true)
				? (body.tipoDeCliente = body.tipoDeCliente.trim())
				: atributosErroneos.push("Tipo de cliente: formato erróneo")
			: atributosErroneos.push("Tipo de cliente: en blanco")
		: atributosErroneos.push("Tipo de cliente: no definida");

	body.tipoDeUsuario !== undefined
		? body.tipoDeUsuario.trim() !== ""
			? ((await formatoTiposDeUsuario(body.tipoDeUsuario.trim())) === true)
				? (body.tipoDeUsuario = body.tipoDeUsuario.trim())
				: atributosErroneos.push("Tipo de usuario: formato erróneo")
			: atributosErroneos.push("Tipo de usuario: en blanco")
		: atributosErroneos.push("Tipo de usuario: no definida");

	body.password !== undefined
		? body.password.trim() !== ""
			? ((await formatoPassword(body.password)) === true)
				? true
				: atributosErroneos.push("Password: formato erróneo")
			: atributosErroneos.push("Password: en blanco")
		: atributosErroneos.push("Password: no definida");

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

/* Validadores PUT */

async function validarAtributosUsuarioParcial(body) {
	let existenAtributos = false;
	const atributosErroneos = new Array();

	/* Comprobación si existen todos los atributos, si no existen se acumula el error "no definido" */
	body.nombre !== undefined
		? body.nombre.trim() !== ""
			? (await formatoNombre(body.nombre.trim())) === true
				? (body.nombre = body.nombre.trim()) && (existenAtributos = true)
				: atributosErroneos.push("nombre: formato erróneo")
			: atributosErroneos.push("nombre: en blanco")
		: false;

	body.apellidos !== undefined
		? body.apellidos.trim() !== ""
			? (await formatoApellidos(body.apellidos.trim())) === true
				? (body.apellidos = body.apellidos.trim()) && (existenAtributos = true)
				: atributosErroneos.push("apellidos: formato erróneo")
			: atributosErroneos.push("apellidos: en blanco")
		: false;

	body.email !== undefined
		? body.email.trim() !== ""
			? (await formatoEmail(body.email.trim().toLowerCase())) === true
				? (body.email = body.email.trim().toLowerCase()) && (existenAtributos = true)
				: atributosErroneos.push("email: formato erróneo")
			: atributosErroneos.push("email: en blanco")
		: false;

	body.movil !== undefined
		? body.movil.trim() !== ""
			? (await formatoMovil(body.movil.replace(/ /g, ""))) === true
				? (body.movil = body.movil.replace(/ /g, "")) && (existenAtributos = true)
				: atributosErroneos.push("movil: formato erróneo")
			: atributosErroneos.push("movil: en blanco")
		: false;

	body.genero !== undefined
		? body.genero.trim() !== ""
			? (await formatoGenero(body.genero.trim())) === true
				? (body.genero = body.genero.trim()) && (existenAtributos = true)
				: atributosErroneos.push("género: formato erróneo")
			: atributosErroneos.push("género: en blanco")
		: false;

	body.fechaNacimiento !== undefined
		? body.fechaNacimiento.trim() !== ""
			? (await formatoFechaNacimiento(body.fechaNacimiento.trim())) === true
				? (body.fechaNacimiento = body.fechaNacimiento.trim()) && (existenAtributos = true)
				: atributosErroneos.push("fecha de nacimiento: formato erróneo")
			: atributosErroneos.push("fecha de nacimiento: en blanco")
		: false;

	body.tipoDeCliente !== undefined
		? body.tipoDeCliente.trim() !== ""
			? (await formatoTiposDeCliente(body.tipoDeCliente.trim())) === true
				? (body.tipoDeCliente = body.tipoDeCliente.trim())
				: atributosErroneos.push("Tipo de cliente: formato erróneo")
			: atributosErroneos.push("Tipo de cliente: en blanco")
		: false;

	body.tipoDeUsuario !== undefined
		? body.tipoDeUsuario.trim() !== ""
			? (await formatoTiposDeUsuario(body.tipoDeUsuario.trim())) === true
				? (body.tipoDeUsuario = body.tipoDeUsuario.trim())
				: atributosErroneos.push("Tipo de usuario: formato erróneo")
			: atributosErroneos.push("Tipo de usuario: en blanco")
		: false;

	body.password !== undefined
		? body.password.trim() !== ""
			? (await formatoPassword(body.password)) === true
				? true
				: atributosErroneos.push("Password: formato erróneo")
			: atributosErroneos.push("Password: en blanco")
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
	validarAtributosUsuarioCompleto,
	validarAtributosUsuarioParcial,
};

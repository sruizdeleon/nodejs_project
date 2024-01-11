const {
	formatoCategoria,
	formatoCategoriaPatch,
	formatoSubcategoria,
	formatoOcasion,
	formatoTalla,
	formatoMarca,
	formatoColor,
	formatoColorimetria,
	formatoEstacion,
	formatoArmarioId,
	formatoUsuarioId
} = require("../formatters/prenda.formatter");

/* Validadores POST y PUT */

async function validarAtributosPrendaCompleta(body) {
	const atributosErroneos = new Array();

	/* Comprobación si existe al menos un atributo válido */
	body.categoria !== undefined
		? body.categoria.trim() !== ""
			? (await formatoCategoria(body.categoria.trim())) === true
				? (body.categoria = body.categoria.trim())
				: atributosErroneos.push("categoria: formato erróneo")
			: atributosErroneos.push("categoria: en blanco")
		: atributosErroneos.push("categoria: no definida");

	body.subcategoria !== undefined
		? body.subcategoria.trim() !== ""
			? (await formatoSubcategoria(body.categoria.trim(), body.subcategoria.trim())) === true
				? (body.subcategoria = body.subcategoria.trim())
				: atributosErroneos.push("subcategoria: formato erróneo")
			: atributosErroneos.push("subcategoria: en blanco")
		: atributosErroneos.push("subcategoria: no definida");

	body.talla !== undefined
		? body.talla.trim() !== ""
			? (await formatoTalla(body.talla.trim())) === true
				? (body.talla = body.talla.trim())
				: atributosErroneos.push("talla: formato erróneo")
			: atributosErroneos.push("talla: en blanco")
		: atributosErroneos.push("talla: no definido");

	body.marca !== undefined
		? body.marca.trim() !== ""
			? (await formatoMarca(body.marca.trim())) === true
				? (body.marca = body.marca.trim())
				: atributosErroneos.push("marca: formato erróneo")
			: atributosErroneos.push("marca: en blanco")
		: atributosErroneos.push("marca: no definido");

	body.estacion !== undefined
		? body.estacion.trim() !== ""
			? (await formatoEstacion(body.estacion.trim())) === true
				? (body.estacion = body.estacion.trim())
				: atributosErroneos.push("estación: formato erróneo")
			: atributosErroneos.push("estación: en blanco")
		: atributosErroneos.push("estación: no definido");

	body.ocasion !== undefined
		? body.ocasion.trim() !== ""
			? (await formatoOcasion(body.ocasion.trim())) === true
				? (body.ocasion = body.ocasion.trim())
				: atributosErroneos.push("ocasión: formato erróneo")
			: atributosErroneos.push("ocasión: en blanco")
		: atributosErroneos.push("ocasión: no definido");

	body.colorimetria !== undefined
		? body.colorimetria.trim() !== ""
			? (await formatoColorimetria(body.colorimetria.trim())) === true
				? (body.colorimetria = body.colorimetria.trim())
				: atributosErroneos.push("colorimetría: formato erróneo")
			: atributosErroneos.push("colorimetría: en blanco")
		: atributosErroneos.push("colorimetría: no definido");

	body.armarioId !== undefined
		? body.armarioId.trim() !== ""
			? (await formatoArmarioId(body.armarioId.trim())) === true
				? (body.armarioId = body.armarioId.trim())
				: atributosErroneos.push("Id de Armario: formato erróneo")
			: atributosErroneos.push("Id de Armario: en blanco")
		: atributosErroneos.push("Id de Armario: no definido");

	body.usuarioId !== undefined
		? body.usuarioId.trim() !== ""
			? (await formatoUsuarioId(body.usuarioId.trim())) === true
				? (body.usuarioId = body.usuarioId.trim())
				: atributosErroneos.push("Id de Usuario: formato erróneo")
			: atributosErroneos.push("Id de Usuario: en blanco")
		: atributosErroneos.push("Id de Usuario: no definido");

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

async function validarAtributosPrendaParcial(body, prendaActual) {
	let existenAtributos = false;
	const atributosErroneos = new Array();
	/* Comprobación si existe al menos un atributo válido */
	body.categoria !== undefined
		? body.categoria.trim() !== ""
			? (await formatoCategoriaPatch(body.categoria.trim(), body.subcategoria.trim())) === true
				? ((body.categoria = body.categoria.trim()) && (existenAtributos = true))
				: atributosErroneos.push("categoria: formato erróneo")
			: atributosErroneos.push("categoria: en blanco")
		: false;

	body.subcategoria !== undefined
		? body.subcategoria.trim() !== ""
			? (await formatoSubcategoria(
				(body.categoria !== undefined ? body.categoria.trim() : prendaActual.categoria),
				body.subcategoria.trim())) === true
				? ((body.subcategoria = body.subcategoria.trim()) && (existenAtributos = true))
				: atributosErroneos.push("subcategoria: formato erróneo")
			: atributosErroneos.push("subcategoria: en blanco")
		: false;

	body.talla !== undefined
		? body.talla.trim() !== ""
			? (await formatoTalla(body.talla.trim())) === true
				? ((body.talla = body.talla.trim()) && (existenAtributos = true))
				: atributosErroneos.push("talla: formato erróneo")
			: atributosErroneos.push("talla: en blanco")
		: false;

	body.marca !== undefined
		? body.marca.trim() !== ""
			? (await formatoMarca(body.marca.trim())) === true
				? ((body.marca = body.marca.trim()) && (existenAtributos = true))
				: atributosErroneos.push("marca: formato erróneo")
			: atributosErroneos.push("marca: en blanco")
		: false;

	body.color !== undefined
		? body.color.trim() !== ""
			? (await formatoColor(body.color.trim())) === true
				? ((body.color = body.color.trim()) && (existenAtributos = true))
				: atributosErroneos.push("color: formato erróneo")
			: atributosErroneos.push("color: en blanco")
		: false;

	body.estacion !== undefined
		? body.estacion.trim() !== ""
			? (await formatoEstacion(body.estacion.trim())) === true
				? ((body.estacion = body.estacion.trim()) && (existenAtributos = true))
				: atributosErroneos.push("estación: formato erróneo")
			: atributosErroneos.push("estación: en blanco")
		: false;

	body.ocasion !== undefined
		? body.ocasion.trim() !== ""
			? (await formatoOcasion(body.ocasion.trim())) === true
				? ((body.ocasion = body.ocasion.trim()) && (existenAtributos = true))
				: atributosErroneos.push("ocasión: formato erróneo")
			: atributosErroneos.push("ocasión: en blanco")
		: false;

	body.colorimetria !== undefined
		? body.colorimetria.trim() !== ""
			? (await formatoColorimetria(body.colorimetria.trim())) === true
				? ((body.colorimetria = body.colorimetria.trim()) && (existenAtributos = true))
				: atributosErroneos.push("colorimetría: formato erróneo")
			: atributosErroneos.push("colorimetría: en blanco")
		: false;

	body.colorimetria !== undefined
		? body.colorimetria.trim() !== ""
			? (await formatoColorimetria(body.colorimetria.trim())) === true
				? ((body.colorimetria = body.colorimetria.trim()) && (existenAtributos = true))
				: atributosErroneos.push("colorimetría: formato erróneo")
			: atributosErroneos.push("colorimetría: en blanco")
		: false;

	body.armarioId !== undefined
		? body.armarioId.trim() !== ""
			? (await formatoArmarioId(body.armarioId.trim())) === true
				? (body.armarioId = body.armarioId.trim())
				: atributosErroneos.push("Id de Armario: formato erróneo")
			: atributosErroneos.push("Id de Armario: en blanco")
		: false;

	body.usuarioId !== undefined
		? body.usuarioId.trim() !== ""
			? (await formatoUsuarioId(body.usuarioId.trim())) === true
				? (body.usuarioId = body.usuarioId.trim())
				: atributosErroneos.push("Id de Usuario: formato erróneo")
			: atributosErroneos.push("Id de Usuario: en blanco")
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
	validarAtributosPrendaCompleta,
	validarAtributosPrendaParcial,
};

/* PRENDA */

/* Funciones de formato PRENDA */

// Comprobaciones para el Put o el Post
async function formatoCategoria(categoriaAComprobar) {
	let tiposDeCategoriasYSubcategorias = await cargarTiposDeCategoriasYSubcategorias();
	let formatoValido = false;
	for (let tipo of tiposDeCategoriasYSubcategorias) {
		if (tipo.categoria === categoriaAComprobar) {
			formatoValido = true;
			break;
		}
	}
	return formatoValido;
}

// Comprobaciones en el Patch para que concuerde con la subcategoría.
async function formatoCategoriaPatch(categoriaAComprobar, subcategoriaAComprobar) {
	let tiposDeCategoriasYSubcategorias = await cargarTiposDeCategoriasYSubcategorias();
	let formatoValido = false;
	if (categoriaAComprobar === undefined || subcategoriaAComprobar === undefined) {
		return formatoValido;
	} else {
		for (let tipo of tiposDeCategoriasYSubcategorias) {
			if (tipo.categoria === categoriaAComprobar) {
				formatoValido = true;
				break;
			}
		}

		if (formatoValido === false) {
			return formatoValido;
		} else {
			formatoValido = false;
			for (let tipo of tiposDeCategoriasYSubcategorias) {
				if (tipo.categoria === categoriaAComprobar) {
					for (let tipoDeSubcategoria of tipo.subcategorias) {
						if (tipoDeSubcategoria === subcategoriaAComprobar) {
							formatoValido = true;
							break;
						}
					}
				}
			}
			return formatoValido;
		}
	}
}

async function formatoSubcategoria(categoriaAComprobar, subcategoriaAComprobar) {
	let tiposDeCategoriasYSubcategorias = await cargarTiposDeCategoriasYSubcategorias();
	let formatoValido = false;
	if (categoriaAComprobar === undefined) {
		return formatoValido;
	} else {
		for (let tipoDeCategoria of tiposDeCategoriasYSubcategorias) {
			if (tipoDeCategoria.categoria === categoriaAComprobar) {
				formatoValido = true;
				break;
			}
		}

		if (formatoValido === false) {
			return formatoValido;
		} else {
			formatoValido = false;
			for (let tipoDeCategoria of tiposDeCategoriasYSubcategorias) {
				if (tipoDeCategoria.categoria === categoriaAComprobar) {
					for (let tipoDeSubcategoria of tipoDeCategoria.subcategorias) {
						if (tipoDeSubcategoria === subcategoriaAComprobar) {
							formatoValido = true;
							break;
						}
					}
				}
			}
			return formatoValido;
		}
	}
}

async function formatoMarca(marcaAComprobar) {
	let formatoValido = false;
	let tiposDeMarcas = await cargarTiposDeMarcas();
	tiposDeMarcas.includes(marcaAComprobar) ? (formatoValido = true) : (formatoValido = false);
	return formatoValido;
}

async function formatoTalla(tallaAComprobar) {
	let formatoValido = false;
	let tiposDeTallas = await cargarTiposDeTallas();
	tiposDeTallas.includes(tallaAComprobar) ? (formatoValido = true) : (formatoValido = false);
	return formatoValido;
}

async function formatoColorimetria(colorimetriaAComprobar) {
	let formatoValido = false;
	let tiposDeColorimetrias = await cargarTiposDeColorimetrias();
	tiposDeColorimetrias.includes(colorimetriaAComprobar) ? (formatoValido = true) : (formatoValido = false);
	return formatoValido;
}

async function formatoColor(coloresAComprobar) {
	let formatoValido = false;
	let tiposDeColores = await cargarTiposDeColores();
	tiposDeColores.includes(coloresAComprobar) ? (formatoValido = true) : (formatoValido = false);
	return formatoValido;
}

async function formatoOcasion(ocasionesAComprobar) {
	let formatoValido = false;
	let tiposDeOcasiones = await cargarTiposDeOcasiones();
	tiposDeOcasiones.includes(ocasionesAComprobar) ? (formatoValido = true) : (formatoValido = false);
	return formatoValido;
}

async function formatoEstacion(estacionesAComprobar) {
	let formatoValido = false;
	let tiposDeEstaciones = await cargarTiposDeEstaciones();
	tiposDeEstaciones.includes(estacionesAComprobar) ? (formatoValido = true) : (formatoValido = false);
	return formatoValido;
}

/* ----------------------------------------------------------------------------------------- */

/* CATEGORIZACIÓN DE PRENDAS */
// Aquí se representan todas las categorías elegibles por cada atributo de la entidad PRENDA

/* INDICE */
// Categorías y Subcatergorías
// Ocasión de vestir
// Talla
// Marca
// Color
// Estación
// Colorimetría


/* Categorias y subcategorias */
async function cargarTiposDeCategoriasYSubcategorias() {
	let objetoACargar = new Promise((resolve) => {
		let tiposDeCategoriasYSubcategorias = [
			{
				categoria: "Bolsos y bolsas",
				subcategorias: [
					"Bolsas de cordones",
					"Bolsas de embarque",
					"Bolsas de hombro",
					"Bolsas de lona",
					"Bolsos Tote",
					"Maletas",
					"Maletines",
					"Mochilas",
					"Otros",
					"Riñoneras",
				],
			},
			{
				categoria: "Complementos",
				subcategorias: [
					"Bufandas",
					"Carteras/monedero",
					"Cinturones",
					"Corbatas",
					"Fulares",
					"Gafas",
					"Guantes",
					"Pañuelos",
				],
			},
			{
				categoria: "Faldas",
				subcategorias: ["Faldas largo medio", "Faldas largas", "Minifaldas", "Otros"],
			},
			{
				categoria: "Joyeria",
				subcategorias: ["Anillos", "Aretes", "Broches", "Collares", "Otros", "Pulseras", "Relojes"],
			},
			{
				categoria: "Pantalones",
				subcategorias: [
					"Leggings",
					"Otros",
					"Pantalones cortos",
					"Pantalones de deporte",
					"Pantalones de vestir",
					"Pantalones largos",
					"Pantalones vaqueros",
				],
			},
			{
				categoria: "Prendas  de arriba",
				subcategorias: [
					"Blusas",
					"Bodysuits",
					"Cárdigans",
					"Camisas",
					"Camisetas",
					"Camisetas de manga larga",
					"Camisetas polo",
					"Camisetas sin mangas",
					"Crop Tops",
					"Otros",
					"Sin mangas",
					"Sudaderas",
					"Sudaderas con capucha",
					"Sudaderas de deporte",
					"Suéteres",
					"Suéteres Chaleco",
				],
			},
			{
				categoria: "Prendas exteriores",
				subcategorias: [
					"Abrigo de piel",
					"Abrigo vaquero",
					"Agrigo",
					"Blazers",
					"Cazadora",
					"Cazadora polar",
					"Chaquetas",
					"Chaquetas Trucker",
					"Chaquetas Varsity",
					"Chaquetas de campo",
					"Chaquetas de deporte",
					"Chaquetas de motocicleta",
					"Chalecos",
					"Chaqueta de plumas",
					"Chaquetón acolchado",
					"Gabardina",
					"Otros",
					"Parkas",
					"Sudaderas con cremallera",
				],
			},
			{
				categoria: "Sombreros",
				subcategorias: ["Beanies", "Boinas", "Gorras", "Gorros", "Otros", "Sombreros", "Sombreros Fedora"],
			},
			{
				categoria: "Vestidos",
				subcategorias: [
					"Enterizos",
					"Mini vestidos",
					"Otros",
					"Sudaderas/vestidos con capucha",
					"Vestidos con tiradores",
					"Vestidos de chaqueta",
					"Vestidos de fiesta",
					"Vestidos informales",
					"Vestidos suéter",
					"Vestidos tipo camisa",
					"Vestidos tipo camiseta",
				],
			},
			{
				categoria: "Zapatos",
				subcategorias: [
					"Botas",
					"Botas militares",
					"Botas Ugg",
					"Cantoneras o Mules",
					"Otros",
					"Pantuflas",
					"Sandalias bajas",
					"Sandalias con tacón",
					"Talones tipo Mule",
					"Zapatillas",
					"Zapatillas Slip-On",
					"Zapatillas deportivas",
					"Zapato mocasín",
					"Zapatos bajos",
					"Zapatos con tacón",
					"Zapatos de senderismo",
				],
			},
		];
		resolve(tiposDeCategoriasYSubcategorias);
	});
	return await objetoACargar;
}

/* Ocasión para vestir */
async function cargarTiposDeOcasiones() {
	let objetoACargar = new Promise((resolve) => {
		let tiposDeOcasiones = [
			"Casa",
			"Casual",
			"Cita",
			"Deporte",
			"Especial",
			"Escuela",
			"Fiesta",
			"Formal",
			"Otro",
			"Trabajo",
			"Viaje",
		];
		resolve(tiposDeOcasiones);
	});
	return await objetoACargar;
}

/* Marcas */
async function cargarTiposDeMarcas() {
	let objetoACargar = new Promise((resolve) => {
		let tiposDeMarcas = [
			"Adidas",
			"Adolfo Domínguez",
			"Alexander McQueen",
			"Armani",
			"Balenciaga",
			"Balmain",
			"Bershka",
			"Bottega Veneta",
			"Burberry",
			"C&A",
			"Camper",
			"Calvin Klein",
			"Celine",
			"Chanel",
			"Christian Louboutin",
			"Coach",
			"Cortefiel",
			"Desigual",
			"Diesel",
			"Diesel Black Gold",
			"Dior",
			"Dsquared2",
			"Dolce & Gabbana",
			"El Corte Inglés",
			"Emporio Armani",
			"Etro",
			"Fendi",
			"GAP",
			"Givenchy",
			"Gucci",
			"Guess",
			"H&M",
			"Hollister",
			"Hugo Boss",
			"Isabel Marant",
			"Jimmy Choo",
			"Kenzo",
			"Lacoste",
			"Levi's",
			"Loewe",
			"Lululemon",
			"Maje",
			"Mango",
			"Massimo Dutti",
			"Michael Kors",
			"Miu Miu",
			"Moncler",
			"Moschino",
			"Nike",
			"Oysho",
			"Paul Smith",
			"Philipp Plein",
			"Prada",
			"Primark",
			"Pull & Bear",
			"Puma",
			"Rag & Bone",
			"Ralph Lauren",
			"Reebok",
			"Rick Owens",
			"Salvatore Ferragamo",
			"Sandro",
			"Sisley",
			"Springfield",
			"Stella McCartney",
			"Stradivarius",
			"Superdry",
			"Ted Baker",
			"The North Face",
			"Thom Browne",
			"Timberland",
			"Tom Ford",
			"Tommy Hilfiger",
			"True Religion",
			"Ugg",
			"Under Armour",
			"Uniqlo",
			"Valentino",
			"Valentino Garavani",
			"Vans",
			"Versace",
			"Victoria's Secret",
			"Vivienne Westwood",
			"Woolrich",
			"Y-3",
			"Yves Saint Laurent",
			"Zadig & Voltaire",
			"Zara",
			"Zegna",
		];
		resolve(tiposDeMarcas);
	});
	return await objetoACargar;
}

/* Talla */
async function cargarTiposDeTallas() {
	let objetoACargar = new Promise((resolve) => {
		let tiposDeTallas = [
			"XXS",
			"XS",
			"S",
			"M",
			"L",
			"XL",
			"XXL",
			"XXXL",
			"34",
			"35",
			"36",
			"37",
			"38",
			"39",
			"40",
			"41",
			"42",
			"43",
			"44",
			"45",
			"46",
			"47",
			"30",
			"32",
			"34",
			"36",
			"38",
			"40",
			"42",
			"44",
			"46",
			"48",
			"50",
			"52",
			"54",
			"56",
			"58",
			"60",
		];
		resolve(tiposDeTallas);
	});
	return await objetoACargar;
}

/* Color */
async function cargarTiposDeColores() {
	let objetoACargar = new Promise((resolve) => {
		let tiposDeColores = [
			"Amarillo",
			"Azul",
			"Azul claro",
			"Azul marino",
			"Beige",
			"Blanco",
			"Cafe",
			"Camel",
			"Caqui",
			"Coral",
			"Crema",
			"Gris claro",
			"Gris oscuro",
			"Multicolor",
			"Naranja",
			"Negro",
			"Oro",
			"Plata",
			"Rojo",
			"Rosa",
			"Rosa claro",
			"Turquesa",
			"Verde",
			"Verde claro",
			"Violeta",
			"Violeta claro",
			"Vino",
		];
		resolve(tiposDeColores);
	});
	return await objetoACargar;
}

/* Estación */
async function cargarTiposDeEstaciones() {
	let objetoACargar = new Promise((resolve) => {
		let tiposDeEstaciones = ["Primavera", "Verano", "Otoño", "Invierno"];
		resolve(tiposDeEstaciones);
	});
	return await objetoACargar;
}

/* Colorimentría */
async function cargarTiposDeColorimetrias() {
	let objetoACargar = new Promise((resolve) => {
		let tiposDeColorimetrias = ["Color primavera", "Color verano", "Color otoño", "Color invierno"];
		resolve(tiposDeColorimetrias);
	});
	return await objetoACargar;
}

module.exports = {
	formatoCategoria,
	formatoCategoriaPatch,
	formatoSubcategoria,
	formatoOcasion,
	formatoTalla,
	formatoMarca,
	formatoColor,
	formatoColorimetria,
	formatoEstacion
};

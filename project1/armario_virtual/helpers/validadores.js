/* Validadores PUT */

async function validarAtributosPrendaCompleta(body) {
    const atributosAModificar = new Object();
    const atributosErroneos = new Array();

    /* Validación si existen o vacíos */
    body.marca ?
        (body.marca.trim() !== "" ? true : (atributosErroneos.push("marca: vacía")))
        : (atributosErroneos.push("marca: no existe o vacía"));
    body.categoria ?
        (body.categoria.trim() !== "" ? true : (atributosErroneos.push("categoria: vacía")))
        : (atributosErroneos.push("categoria: no existe o vacía"));
    body.subcategoria ?
        (body.subcategoria.trim() !== "" ? true : (atributosErroneos.push("subcategoria: vacía")))
        : (atributosErroneos.push("subcategoria: no existe o vacía"));
    body.talla ?
        (body.talla.trim() !== "" ? true : (atributosErroneos.push("talla: vacía")))
        : (atributosErroneos.push("talla: no existe o vacía"));
    body.color ?
        (body.color.trim() !== "" ? true : (atributosErroneos.push("color: vacío")))
        : (atributosErroneos.push("color: no existe o vacío"));

    if (atributosErroneos.length > 0) {
        return {
            valido: false,
            msg: `Error: los siguientes atributos han resultado erróneos: ${atributosErroneos.join(", ")}.`
        }
    } else {
        return {
            valido: true,
            msg: null
        }
    }
}

async function validarAtributosUsuarioCompleto (body) {
    const atributosAModificar = new Object();
    const atributosErroneos = new Array();

/* Validación si existen o vacíos */
    body.nombre ?
        (body.nombre.trim() !== "" ? true : (atributosErroneos.push("nombre: vacío")))
        : (atributosErroneos.push("nombre: no existe o vacío"));
    body.apellidos ?
        (body.apellidos.trim() !== "" ? true : (atributosErroneos.push("apellidos: vacío")))
        : (atributosErroneos.push("apellidos: no existe o vacío"));
    body.email ?
        (body.email.trim() !== "" ? true : (atributosErroneos.push("email: vacío")))
        : (atributosErroneos.push("email: no existe o vacío"));
    body.genero ?
        (body.genero.trim() !== "" ? true : (atributosErroneos.push("genero: vacío")))
        : (atributosErroneos.push("genero: no existe o vacío"));
    body.fechaNacimiento ?
        (body.fechaNacimiento.trim() !== "" ? true : (atributosErroneos.push("fechaNacimiento: vacío")))
        : (atributosErroneos.push("fechaNacimiento: no existe o vacío"));

    if (atributosErroneos.length > 0) {
        return {
            valido: false,
            msg: `Error: los siguientes atributos han resultado erróneos: ${atributosErroneos.join(", ")}.`
        }
    } else {
        return {
            valido: true,
            msg: null
        }
    }
}

/* Validadores PATCH */


module.exports = {
    validarAtributosPrendaCompleta,
    validarAtributosUsuarioCompleto
}
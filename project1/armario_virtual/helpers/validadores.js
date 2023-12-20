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

async function validarAtributosPrendaParcial (body) {
    const atributosAModificar = new Object();
    const atributosErroneos = new Array();

    /* Comprobación si existe y creación de propiedad */
    body.marca !== undefined ? atributosAModificar.marca = body.marca.trim() : null;
    body.categoria !== undefined ? atributosAModificar.categoria = body.categoria.trim() : null;
    body.subcategoria !== undefined ? atributosAModificar.subcategoria = body.subcategoria.trim() : null;
    body.talla !== undefined ? atributosAModificar.talla = body.talla.trim() : null;
    body.color !== undefined ? atributosAModificar.color = body.color.trim() : null;

    /* Comprobación si la propiedad está vacía o con espacios en blanco */
    atributosAModificar.marca === "" ? atributosErroneos.push("marca") : null;
    atributosAModificar.categoria === "" ? atributosErroneos.push("categoria") : null;
    atributosAModificar.subcategoria === "" ? atributosErroneos.push("subcategoria") : null;
    atributosAModificar.talla === "" ? atributosErroneos.push("talla") : null;
    atributosAModificar.color === "" ? atributosErroneos.push("color") : null;

    if (atributosErroneos.length > 0) {
        return { // Si tiene espacios o vacía, pero venía la propiedad, pedimos que la rellenen.
            valido: false,
            msg: `Error: se han enviado los siguientes atributos vacíos o con espacios en blanco: ${atributosErroneos.join(", ")}.`
        }
    } else {
        return { // Si las propiedades vienen correctamente rellenas se devuelve el objeto con las propiedades a modificar.
            valido: true,
            msg: null,
            atributos: atributosAModificar
        }
    }
}



async function validarAtributosUsuarioParcial (body) {
    const atributosAModificar = new Object();
    const atributosErroneos = new Array();

    /* Comprobación si existe y creación de propiedad */
    body.nombre !== undefined ? atributosAModificar.nombre = body.nombre.trim() : null;
    body.apellidos !== undefined ? atributosAModificar.apellidos = body.apellidos.trim() : null;
    body.email !== undefined ? atributosAModificar.email = body.email.trim() : null;
    body.movil !== undefined ? atributosAModificar.movil = body.movil.trim() : null;
    body.genero !== undefined ? atributosAModificar.genero = body.genero.trim() : null;
    body.fechaNacimiento !== undefined ? atributosAModificar.fechaNacimiento = body.fechaNacimiento.trim() : null;

    /* Comprobación si la propiedad está vacía o con espacios en blanco */
    atributosAModificar.nombre === "" ? atributosErroneos.push("nombre") : null;
    atributosAModificar.apellidos === "" ? atributosErroneos.push("apellidos") : null;
    atributosAModificar.email === "" ? atributosErroneos.push("email") : null;
    atributosAModificar.movil === "" ? atributosErroneos.push("movil") : null;
    atributosAModificar.genero === "" ? atributosErroneos.push("genero") : null;
    atributosAModificar.fechaNacimiento === "" ? atributosErroneos.push("fecha de nacimiento") : null;

    if (atributosErroneos.length > 0) {
        return { // Si tiene espacios o vacía, pero venía la propiedad, pedimos que la rellenen.
            valido: false,
            msg: `Error: se han enviado los siguientes atributos vacíos o con espacios en blanco: ${atributosErroneos.join(", ")}.`
        }
    } else {
        return { // Si las propiedades vienen correctamente rellenas se devuelve el objeto con las propiedades a modificar.
            valido: true,
            msg: null,
            atributos: atributosAModificar
        }
    }
}



module.exports = {
    validarAtributosPrendaCompleta,
    validarAtributosUsuarioCompleto,
    validarAtributosPrendaParcial,
    validarAtributosUsuarioParcial
}
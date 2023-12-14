
/* async function validarAtributosPrenda(body) {
    let mensajeError = new Array;
    if (body.marca === undefined || body.marca.trim() === "") {
        mensajeError.push('marca')
    }
    if (body.categoria === undefined || body.categoria.trim() === "") {
        mensajeError.push('categoria')
    }
    if (body.subcategoria === undefined || body.subcategoria.trim() === "") {
        mensajeError.push('subcategoria')
    }
    if (body.talla === undefined || body.talla.trim() === "") {
        mensajeError.push('talla')
    }
    if (body.color === undefined || body.color.trim() === "") {
        mensajeError.push('color')
    }

    if (mensajeError.length === 0) {
        if (mensajeError.length > 0) {
            if (mensajeError.length > 1) {
                return {
                    valido: false,
                    mensaje: `Error: falta introducir la siguiente información: ${mensajeError.join(', ')}.`
                }
            } else {
                return {
                    valido: false,
                    mensaje: `Error: falta introducir la siguiente información: ${mensajeError[0]}.`
                }
            }
        }
    } else {
        return {
            valido: false,
            mensaje: null
        }
    }
} */

async function validarAtributosPrenda (body) {
    if (body.categoria === undefined
        || body.categoria.trim() === ""
        || body.subcategoria === undefined
        || body.subcategoria.trim() === ""
        || body.talla === undefined
        || body.talla.trim() === ""
        || body.color === undefined
        || body.color.trim() === ""
        || body.marca === undefined
        || body.marca.trim() === "") {
            return {
                valido: false,
                mensaje: "Error: falta algún atributo"
            }
    } else {
        return {
            valido: true,
            mensaje: null
        }
    }
}


async function validarAtributosUsuario (body) {
    if (body.nombre === undefined
        || body.nombre.trim() === ""
        || body.apellidos === undefined
        || body.apellidos.trim() === ""
        || body.email === undefined
        || body.email.trim() === ""
        || body.movil === undefined
        || body.movil.trim() === ""
        || body.genero === undefined
        || body.genero.trim() === ""
        || body.fechaNacimiento === undefined
        || body.fechaNacimiento.trim() === "") {
            return {
                valido: false,
                mensaje: "Error: falta algún atributo"
            }
    } else {
        return {
            valido: true,
            mensaje: null
        }
    }
}


module.exports = {
    validarAtributosPrenda,
    validarAtributosUsuario
}
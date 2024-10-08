import { peliculas } from "./js/module/peliculas.js";
import { boletas } from "./js/module/boletas.js";
import { reservar } from "./js/module/reservarAsientos.js";
import { tarjetas } from "./js/module/tarjetas.js";
import { clientes } from "./js/module/clientes.js";

/**
 * @file main.js
 * @description Archivos principales para interactuar con la API
 */

// Instanciar clases para interactuar con la API
//    let pelicula = new peliculas();
//    let boleta = new boletas();
//    let reserva = new reservar();
//    let tarjeta = new tarjetas();
//    let cliente = new clientes();

//Selección de Películas
// ! Consultar todas las películas disponibles en el catálogo con detalles como título, género, duración y horarios de proyección
//console.log(await pelicula.getAllPeliculasConLugarYDuracion());

// ! Consultar información detallada sobre una película específica, incluyendo sinopsis
//console.log(await pelicula.getPelicula("66a574a8e558765a8b22b046"));

//Compra de Boletos:
/**
 * @description Permitir la compra de boletos para una película específica, 
 * incluyendo la selección de la fecha y la hora de la proyección.
 * @param {Object} JsonBoletos - Objeto que contiene los datos necesarios para la compra del boleto.
 * @param {string} JsonBoletos.id_movimiento - ID del movimiento.
 * @param {string} JsonBoletos.id_asiento - ID del asiento.
 * @param {string} JsonBoletos.fecha_adquisicion - Fecha de adquisición del boleto.
 * @returns {Promise<Object>} Resultado de la compra del boleto.
 */

const JsonBoletos = {
    id_movimiento: '66a66836c95fdf47d22d6954',
    id_asiento: '66a6550fc95fdf47d22d6946',
    fecha_adquisicion: '2024-06-01T18:00:00.000+00:00'
};

// ! Permitir la compra de boletos para una película específica, incluyendo la selección de la fecha y la hora de la proyección.
//console.log(await boleta.setComprarBoletas(JsonBoletos));

/**
 * @description Permitir la consulta de la disponibilidad de asientos.
 * @param {string} id_asiento - ID del asiento.
 * @returns {Promise<Object>} Resultado de la verificacion del boleto.
 */
// ! Permitir la consulta de la disponibilidad de asientos en una sala para una proyección específica.
//console.log(await boleta.getVerificacionAsiento(id_asiento));

//Asignación de Asientos

/**
 * @description Permitir la selección y reserva de asientos para una proyección específica.
 * @param {Object} JsonReserva - Objeto que contiene los datos necesarios para la reserva del asiento.
 * @param {string} JsonReserva.id_cliente - ID del cliente.
 * @param {string} JsonReserva.id_asiento - ID del asiento.
 * @param {string} JsonReserva.id_funcion - ID de la funcion.
 * @param {string} JsonReserva.fecha_reserva - Fecha de la reserva
 * @returns {Promise<Object>} Resultado de la compra del boleto.
 */
const JsonReserva = {
    id_cliente: '66a66409c95fdf47d22d694e',
    id_asiento: '66a6550fc95fdf47d22d6942',
    id_funcion: '66a4792522edecf73bf6e6db',
    fecha_reserva: '2024-07-01T18:00:00.000+00:00'
};
// ! Permitir la selección y reserva de asientos para una proyección específica.
//console.log(await reserva.setReservar(JsonReserva))

// ! Permitir la cancelación de una reserva de asiento ya realizada. 
//console.log(await reserva.cancelarReserva("66a69db7c95fdf47d22d6970"))

//Descuentos y Tarjetas VIP:

// ! Permitir la verificación de la validez de una tarjeta VIP durante el proceso de compra.
//console.log(await tarjeta.getValidarTarjetas("66a66409c95fdf47d22d694b"))

//Roles Definidos

/**
 * Crea un nuevo usuario en la base de datos y en el sistema de autenticación de MongoDB.
 * 
 * @param {Object} usuario - Objeto que contiene la información del usuario a crear.
 * @param {string} nombre - Nombre del usuario.
 * @param {string} apellido - Apellido del usuario.
 * @param {string} nick - Nickname o nombre de usuario.
 * @param {string} email - Correo electrónico del usuario.
 * @param {string} telefono - Número de teléfono del usuario.
 * @param {string} id_tipo_de_categoria - ID de la categoría del usuario.
 * @param {string} cedula - Cédula o documento de identidad del usuario.
 * @param {string} rol - Rol del usuario en la base de datos de MongoDB.
 * @returns {Object} Mensaje de éxito o error y el usuario creado.
 */
const data = {
    nombre: "Jaime",
    apellido: "Alexander",
    nick: "Aki1130",
    email: "Aki1130@example.com",
    telefono: "555-5678",
    id_tipo_de_categoria: "66a663a914eddb58d943e299",
    cedula: "98765432",
    rol: "usuarioVip"
};

// !  Permitir la creación de nuevos usuarios en el sistema, asignando roles y privilegios específicos (usuario estándar, usuario VIP o administrador).
//console.log(await cliente.crearUsuario(data))

/**
 * Obtiene detalles completos de un usuario específico, incluyendo su rol y el estado de su tarjeta VIP.
 * 
 * @param {string} idUsuario - El identificador único del usuario en formato de cadena.
 * @returns {Promise<Array>} - Una promesa que se resuelve con un array que contiene la información detallada del usuario.
 * ? 66a868348da716e4dc8f9227
 */
// ! Permitir la consulta de información detallada sobre un usuario, incluyendo su rol y estado de tarjeta VIP.
//console.log(await cliente.detalleUsuario("66a868348da716e4dc8f9227"))


/**
 * Actualiza el rol de un usuario en la base de datos.
 * 
 * @param {string} idUsuario - El identificador único del usuario en formato de cadena.
 * @param {string} nuevoRol - El nuevo rol que se asignará al usuario. Los valores válidos son: 'usuarioEstandar', 'usuarioVip', 'Administrador'.
 * @returns {Object} Mensaje de éxito o error y el usuario actualizado.
 * ?66a868348da716e4dc8f9227, usuarioEstandar
 */

// ! Permitir la actualización del rol de un usuario (por ejemplo, cambiar de usuario estándar a VIP, o viceversa).
//console.log(await cliente.actualizarRol("66a868348da716e4dc8f9227", "usuarioVip"))

// ! Permitir la consulta de todos los usuarios del sistema, con la posibilidad de filtrar por rol (VIP, estándar o administrador).
//console.log(await cliente.consultarUsuarios("usuarioEstandar"))
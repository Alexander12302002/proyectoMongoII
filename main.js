import { peliculas } from "./js/module/peliculas.js";
import { boletas } from "./js/module/boletas.js";
import { reservar } from "./js/module/reservarAsientos.js";
import { tarjetas } from "./js/module/tarjetas.js";

/**
 * @file main.js
 * @description Archivo principal para interactuar con la API de compra de boletos y consulta de películas.
 */
let mongo = new tarjetas();

//Selección de Películas

// ! Consultar todas las películas disponibles en el catálogo con detalles como título, género, duración y horarios de proyección
//console.log(await mongo.getAllPeliculasConLugarYDuracion());

// ! Consultar información detallada sobre una película específica, incluyendo sinopsis
// console.log(await mongo.getPelicula("66a574a8e558765a8b22b046"));

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
//console.log(await mongo.setComprarBoletas(JsonBoletos));

/**
 * @description Permitir la consulta de la disponibilidad de asientos.
 * @param {string} id_asiento - ID del asiento.
 * @returns {Promise<Object>} Resultado de la verificacion del boleto.
 */
// ! Permitir la consulta de la disponibilidad de asientos en una sala para una proyección específica.
//console.log(await mongo.getVerificacionAsiento(id_asiento));

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
//console.log(await mongo.setReservar(JsonReserva))

// ! Permitir la cancelación de una reserva de asiento ya realizada. 
//console.log(await mongo.cancelarReserva("66a69db7c95fdf47d22d6970"))

//Descuentos y Tarjetas VIP:

// ! Permitir la verificación de la validez de una tarjeta VIP durante el proceso de compra.
//console.log(await mongo.getValidarTarjetas("66a66409c95fdf47d22d694b"))
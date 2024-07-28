import { peliculas } from "./js/module/peliculas.js";
import { boletas } from "./js/module/boletas.js";

/**
 * @file main.js
 * @description Archivo principal para interactuar con la API de compra de boletos y consulta de películas.
 */
let mongo = new boletas();

// ! Consultar todas las películas disponibles en el catálogo con detalles como título, género, duración y horarios de proyección
// console.log(await mongo.getAllPeliculasConLugarYDuracion());

// ! Consultar información detallada sobre una película específica, incluyendo sinopsis
// console.log(await mongo.getPelicula("66a574a8e558765a8b22b046"));

/**
 * @description Permitir la compra de boletos para una película específica, 
 * incluyendo la selección de la fecha y la hora de la proyección.
 * @param {Object} JsonBoletos - Objeto que contiene los datos necesarios para la compra del boleto.
 * @param {string} JsonBoletos.id_movimiento - ID del movimiento.
 * @param {string} JsonBoletos.id_asiento - ID del asiento.
 * @param {string} JsonBoletos.fecha_adquisicion - Fecha de adquisición del boleto.
 * @returns {Promise<Object>} Resultado de la compra del boleto.
 */

/**const JsonBoletos = {
    id_movimiento: '66a66836c95fdf47d22d6954',
    id_asiento: '66a6550fc95fdf47d22d6946',
    fecha_adquisicion: '2024-06-01T18:00:00.000+00:00'
};*/

// ! Permitir la compra de boletos para una película específica, incluyendo la selección de la fecha y la hora de la proyección.
//console.log(await mongo.setComprarBoletas(JsonBoletos));

    /**
     * @description Permitir la consulta de la disponibilidad de asientos.
     * @param {string} id_asiento - ID del asiento.
     * @returns {Promise<Object>} Resultado de la verificacion del boleto.
     */
// ! Permitir la consulta de la disponibilidad de asientos en una sala para una proyección específica.
//console.log(await mongo.getVerificacionAsiento(id_asiento));
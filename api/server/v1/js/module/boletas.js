const  movimientos = require('./movimientos')
const  asientos = require("./asientos");
const Connect = require("../../helpers/db/connect.js");
const { ObjectId } = require("mongodb");

module.exports = class boletas extends Connect{
    constructor(){
        if(typeof boletas.instance === "object") {
            return boletas.instance;
        }
        super();
        this.collection = this.db.collection("boleta");
        boletas.instance = this;
        return this;
    }

    //Permitir la compra de boletos para una película específica, 
    //incluyendo la selección de la fecha y la hora de la proyección.
    /**
     * @function setComprarBoletas
     * @description Permite la compra de un boleto verificando la existencia del movimiento y asiento, y asegurándose de que el asiento no esté ya comprado.
     * @param {Object} JsonDatos - Objeto que contiene los datos del boleto a comprar.
     * @param {string} JsonDatos.id_movimiento - ID del movimiento.
     * @param {string} JsonDatos.id_asiento - ID del asiento.
     * @param {string} JsonDatos.fecha_adquisicion - Fecha de adquisición del boleto.
     * @returns {Promise<Object>} Resultado de la inserción del nuevo boleto.
     */
    async setComprarBoletas(JsonDatos) {
        console.log(JsonDatos)
        const { id_movimiento, asientos, fecha_adquisicion } = JsonDatos;
    
        try {
            console.log("Datos recibidos para insertar:", {
                id_movimiento,
                asientos,
                fecha_adquisicion
            });
    
            const boleto = {
                id_movimiento: new ObjectId(id_movimiento),
                id_asiento: asientos.map(id_asiento => new ObjectId(id_asiento)),
                fecha_adquisicion: new Date(fecha_adquisicion)
            };
    
            console.log("Boletos a insertar:", boleto);
    
            const res = await this.collection.insertOne(boleto);
            console.log("Boletos comprados con éxito:", res);
            return res;
    
        } catch (error) {

            console.log("Error al intentar comprar los boletos. Verifique los datos", error);
            throw error; 
        }
    }

    /**
     * @function getVerificacionAsiento
     * @description Verifica si el asiento ya ha sido comprado.
     * @param {string} id_asiento - ID del asiento.
     * @returns {Promise<boolean>} `true` si el asiento ya ha sido comprado, `false` en caso contrario.
     */
    async getVerificacionAsiento(id_asiento){
        try{
            // Verificar si el asiento ya ha sido comprado para esta función
           let boletoExistente = await this.collection.findOne({
               id_asiento: new ObjectId(id_asiento)
           })
           // ! Verificar si el asiento ya está ocupado
            return boletoExistente !== null;
       } catch (error){
           // * Error al intentar verificar  el boleto
           console.log("Error a la hora de verificar el boleto verifique los datos", error)
       }   
    }
} 
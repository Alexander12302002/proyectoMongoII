import { Connect } from "../../helpers/db/connect.js";
import { movimientos } from "./movimientos.js";
import { asientos } from "./asientos.js";
import { ObjectId } from "mongodb";

export class boletas extends Connect{
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
    async setComprarBoletas(JsonDatos){
        let id_movimiento = JsonDatos.id_movimiento;
        let id_asiento = JsonDatos.id_asiento;
        let fecha_adquisicion = JsonDatos.fecha_adquisicion
        try{
            // Instanciar la clase movimientos y obtener el movimiento
            let movimiento = new movimientos();
            let movimientoRes = await movimiento.getMovimiento(id_movimiento)
             // ! Verificar si el movimiento existe
            if (movimientoRes.length === 0) {
                console.log("Movimiento no encontrado");
                return;
            }
            try{
                // Instanciar la clase asientos y obtener el asiento
                let asiento = new asientos();
                let asientoRes = await asiento.getAsiento(id_asiento)
                // ! Verificar si el asiento existe
                if (asientoRes.length === 0) {
                    console.log("asiento no encontrado");
                    return;
                }
                try{
                     // Verificar si el asiento ya ha sido comprado para esta función
                    let boletoExistente = await this.collection.findOne({
                        id_asiento: new ObjectId(id_asiento)
                    })
                    // ! Verificar si el asiento ya está ocupado
                    if (boletoExistente) {
                        console.log("El asiento ya ha sido comprado para esta función");
                        return;
                    }
                    // Crear el nuevo boleto
                    const nuevoBoleto = {
                        id_movimiento: new ObjectId(id_movimiento),
                        id_asiento: new ObjectId(id_asiento),
                        fecha_adquisicion: new Date(fecha_adquisicion)
                    };
                     // Insertar el nuevo boleto en la colección
                    const res = await this.collection.insertOne(nuevoBoleto);
                    return res;
                } catch (error){
                    // * Error al intentar comprar el boleto
                    console.log("Error a la hora de comprar el boleto verifique los datos", error)
                }   
            } catch (error){
                // * Error al intentar verificar el asiento
                console.log("Error a la hora de verificar el asiento verifique los datos", error)
            }
        } catch (error){
            // * Error al intentar verificar el movimiento
            console.log("Error a la hora de verificar el movimiento verifique los datos", error)
        }
    }
} 
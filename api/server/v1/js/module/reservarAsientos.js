const Connect = require("../../helpers/db/connect.js");
const { ObjectId } = require("mongodb");
const  boletas  = require("./boletas");
const  funciones  = require("./funciones");
const  clientes  = require("./clientes");
const  asientos  = require("./asientos");

module.exports =  class reservar extends Connect{
    constructor(){
        if(typeof reservar.instance === "object") {
            return reservar.instance;
        }
        super();
        this.collection = this.db.collection("reservar_asiento");
        reservar.instance = this;
        return this;
    }

    async getAsientosReservadosConfirmados(idFuncion = null) {
        const objectId = new ObjectId(idFuncion);
        try {
            const res = await this.collection.find({ estado: "confirmada", id_funcion: objectId}, {}).toArray();
            return res;
        } catch (error) {
            console.error('Error fetching confirmed reserved seats:', error);
            throw error;
        }
    }

    /**
    * @function setReservar
    * @description Realiza una reserva de asiento para un cliente en una función específica.
    * Verifica la existencia del cliente, del asiento y de la función, y si el asiento ya está reservado.
    * @param {Object} JsonReserva - Objeto que contiene los datos necesarios para la reserva.
    * @param {string} JsonReserva.id_cliente - ID del cliente.
    * @param {string} JsonReserva.id_asiento - ID del asiento.
    * @param {string} JsonReserva.id_funcion - ID de la función.
    * @param {string} JsonReserva.fecha_reserva - Fecha y hora de la reserva.
    * @returns {Promise<Object>} Resultado de la operación de reserva.
    */
    async setReservar(JsonReserva){
        let id_cliente = JsonReserva.id_cliente;
        let id_asiento = JsonReserva.id_asiento;
        let id_funcion = JsonReserva.id_funcion;
        let fecha_reserva = JsonReserva.fecha_reserva
        try{
            // Instanciar la clase asientos y obtener el asiento
            let asiento = new asientos();
            let asientoRes = await asiento.getAsiento(id_asiento)
            // ! Verificar si el asiento existe
            if (asientoRes.length === 0) {
                console.log("asiento no encontrado");
                return;
            }

            // Instanciar la clase cliente y obtener el asiento
            let cliente = new clientes();
            let clienteRes = await cliente.getCliente(id_cliente)
            // ! Verificar si el asiento existe
            if (clienteRes.length === 0) {
                console.log("cliente no encontrado");
                return;
            }
            
            // Instanciar la clase funcion y obtener el asiento
            let funcion = new funciones();
            let funcionRes = await funcion.getFuncion(id_funcion)
            // ! Verificar si el asiento existe
            if (funcionRes.length === 0) {
                console.log("funcion no encontrada");
                return;
            }

            // Verificar si el asiento ya está reservado
            const reservaExistente = await this.collection.findOne({ id_asiento: new ObjectId(id_asiento), id_funcion: new ObjectId(id_funcion) });
            if (reservaExistente) {
                console.log("El asiento ya ha sido reservado con esa funcion.");
                return;
            }

            // 4. Crear la nueva reserva
            const nuevaReserva = {
                id_cliente: new ObjectId(id_cliente),
                id_asiento: new ObjectId(id_asiento),
                id_funcion: new ObjectId(id_funcion),
                fecha_reserva: new Date(fecha_reserva)
            };

            // 5. Insertar la nueva reserva en la colección
            const res = await this.collection.insertOne(nuevaReserva);
            console.log("Reserva creada con éxito.");
            return res;

        } catch (error){
            console.log("Error a la hora de realizar la reserva. Verifique los datos", error);
        }
    }

    async cancelarReserva(id_reserva) {
        try {
            // Verificar que id_reserva es válido
            if (!ObjectId.isValid(id_reserva)) {
                console.log("ID de reserva no válido");
                return { error: "ID de reserva no válido" };
            }
    
            // Intentar eliminar la reserva
            let res = await this.collection.deleteOne({ _id: new ObjectId(id_reserva) });
    
            // Verificar si se eliminó alguna reserva
            if (res.deletedCount === 0) {
                console.log("No se encontró la reserva");
                return { error: "No se encontró la reserva" };
            }
    
            console.log("Reserva cancelada con éxito");
            return { success: "Reserva cancelada con éxito" };
    
        } catch (error) {
            console.log("Error al cancelar la reserva", error);
            return { error: "Error al cancelar la reserva" };
        }
    }
}
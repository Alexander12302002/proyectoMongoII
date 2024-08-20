import { Connect } from "../../helpers/db/connect.js";
import { ObjectId } from "mongodb";

export class tarjetas extends Connect{
    constructor(){
        if(typeof tarjetas.instance === "object") {
            return tarjetas.instance;
        }
        super();
        this.collection = this.db.collection("tarjeta");
        tarjetas.instance = this;
        return this;
    }

    /**
     * Obtiene el estado de la tarjeta asociada a un cliente.
     * 
     * @param {string} id_cliente - El ID del cliente.
     * @returns {string|null} El estado de la tarjeta o null si no se encuentra.
     * ? 66a66409c95fdf47d22d694b
     */
    async getValidarTarjetas(id_cliente) {
        try {
            // Busca en la colección de tarjetas las que coinciden con el ID de cliente proporcionado
            let res = await this.collection.find({ codigo_usuario: new ObjectId(id_cliente) }).toArray();
            
            // Si se encontraron resultados, devuelve el estado de la primera tarjeta
            if (res.length > 0) {
                let estado = res[0].estado;
                return `La tarjeta se encuentra: ${estado}`;
            } else {
                // Si no se encontraron resultados, devuelve null
                console.log("No se encontraron tarjetas para el id proporcionado.");
                return null;
            }
        } catch (error) {
            // Si ocurre un error, devuelve null y muestra un mensaje de error en la consola
            console.log("No se encuentra la tarjeta, verifique el id", error);
            return null;
        }
    }
}
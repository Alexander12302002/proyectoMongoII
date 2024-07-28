import { Connect } from "../../helpers/db/connect.js";
import { ObjectId } from "mongodb";

export class clientes extends Connect{
    constructor(){
        if(typeof clientes.instance === "object") {
            return clientes.instance;
        }
        super();
        this.collection = this.db.collection("cliente");
        clientes.instance = this;
        return this;
    }

    async getCliente(id_cliente){
        try{
            let res = this.collection.find({_id: new ObjectId(id_cliente)},{}).toArray()
            return res
        } catch (error){
            console.log("No se encuentra el movimiento verifique el id", error)
        }
    }
}
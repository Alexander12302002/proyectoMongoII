import { Connect } from "../../helpers/db/connect.js";
import { ObjectId } from "mongodb";

export class asientos extends Connect{
    constructor(){
        if(typeof asientos.instance === "object") {
            return asientos.instance;
        }
        super();
        this.collection = this.db.collection("asiento");
        asientos.instance = this;
        return this;
    }

    async getAsiento(id_asiento){
        try{
            let res = this.collection.find({_id: new ObjectId(id_asiento)},{}).toArray()
            return res
        } catch (error){
            console.log("No se encuentra el asiento verifique el id", error)
        }
    }
}
const Connect = require("../../helpers/db/connect.js");
const { ObjectId } = require("mongodb");

module.exports = class asientos extends Connect{
    constructor(){
        if(typeof asientos.instance === "object") {
            return asientos.instance;
        }
        super();
        this.collection = this.db.collection("asiento");
        asientos.instance = this;
        return this;
    }

    async getAllasientos(){
        let res = this.collection.find({}, {}).toArray()
        return res
    }  
    
    async getAsiento(id_asiento){
        try{
            let res = this.collection.find({_id: new ObjectId(id_asiento)},{}).toArray()
            return res
        } catch (error){
            console.log("No se encuentra el asiento verifique el id", error)
        }
    }

    async getAsientoForCode(codes) {
        try {
            if (!Array.isArray(codes)) {
                throw new Error('El parámetro codes debe ser un array');
            }
    
            let res = await this.collection.find({ codigo: { $in: codes } }).toArray();
            return res;
        } catch (error) {
            console.log("No se encuentra el asiento, verifique el id", error);
        }
    }
}
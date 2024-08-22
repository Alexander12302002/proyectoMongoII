const Connect = require("../../helpers/db/connect.js");
const { ObjectId } = require("mongodb");

module.exports =  class movimientos extends Connect{
    constructor(){
        if(typeof movimientos.instance === "object") {
            return movimientos.instance;
        }
        super();
        this.collection = this.db.collection("movimiento");
        movimientos.instance = this;
        return this;
    }

    async getMovimiento(id_movimiento){
        try{
            let res = this.collection.find({_id: new ObjectId(id_movimiento)},{}).toArray()
            return res
        } catch (error){
            console.log("No se encuentra el movimiento verifique el id", error)
        }
    }
}
const Connect = require("../../helpers/db/connect.js");
const { ObjectId } = require("mongodb");

module.exports =  class funciones extends Connect{
    constructor(){
        if(typeof funciones.instance === "object") {
            return funciones.instance;
        }
        super();
        this.collection = this.db.collection("funcion");
        funciones.instance = this;
        return this;
    }

    async getFuncion(id_funcion){
        try{
            let res = this.collection.find({_id: new ObjectId(id_funcion)},{}).toArray()
            return res
        } catch (error){
            console.log("No se encuentra la funcion verifique el id", error)
        }
    }
}
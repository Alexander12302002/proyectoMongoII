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

    async getFuncionCine(id_pelicula){
        try {
            // Asegúrate de que id_pelicula sea un ObjectId válido
            if (!ObjectId.isValid(id_pelicula)) {
                throw new Error('Invalid ObjectId format');
            }
            const res = await this.collection.aggregate([
                {
                    $match: {
                        id_pelicula: new ObjectId(id_pelicula)
                    }
                },
                {
                    $lookup: {
                        from: 'lugar',  // Nombre de la colección de cines
                        localField: 'id_lugar',
                        foreignField: '_id',
                        as: 'cineDetalles'
                    }
                },
                {
                    $unwind: '$cineDetalles'
                },
                {
                    $project: {
                        _id: 1,
                        fecha_hora_inicio: 1,
                        fecha_hora_fin: 1,
                        'cineDetalles._id': 1,
                        'cineDetalles.nombre': 1,
                        'cineDetalles.precio': 1
                    }
                }
            ]).toArray();
            return res;
        } catch (error) {
            console.error("Error al obtener los detalles del cine:", error);
            throw error;
        }
    }
}
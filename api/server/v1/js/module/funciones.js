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
        try {
            if (!ObjectId.isValid(id_funcion)) {
                throw new Error('ID de función no válido');
            }

            const objectId = new ObjectId(id_funcion);

            let res = await this.collection.find({ _id: objectId }).toArray();
            return res;
        } catch (error) {
            console.log("No se encuentra la función, verifique el ID", error);
            return null; 
        }
    }

    async getAsientosFuncion(id_funcion){
        let res = this.collection.aggregate([
            // Filtra por id_funcion
            {
                $match: {
                    _id: new ObjectId(id_funcion)
                }
            },
            // Une con la colección de asientos
            {
                $lookup: {
                    from: "asiento",          // Nombre de la colección de asientos
                    localField: "id_lugar",   // Campo en 'funciones' que contiene el ID del lugar
                    foreignField: "id_lugar", // Campo en 'asiento' que se relaciona con el campo local
                    as: "asientosAsignados"   // Nombre del nuevo array que contendrá los asientos encontrados
                }
            },
            // Proyección para incluir solo los campos deseados
            {
                $project: {
                    _id: 1,
                    id_pelicula: 1,
                    id_lugar: 1,
                    fecha_hora_inicio: 1,
                    fecha_hora_fin: 1,
                    asientosAsignados: 1
                }
            }
        ]).toArray();
        return res
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
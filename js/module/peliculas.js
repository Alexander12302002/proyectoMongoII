import { Connect } from "../../helpers/db/connect.js";

export class peliculas extends Connect{
    constructor(){
        if(typeof peliculas.instance === "object") {
            return peliculas.instance;
        }
        super();
        this.collection = this.db.collection("pelicula");
        peliculas.instance = this;
        return this;
    }

    async getAllPeliculas(){
        let res = await this.collection.find({},{}).toArray();
        return res
    }

    //Permitir la consulta de todas las películas disponibles en el catálogo, 
    //con detalles como título, género, duración y horarios de proyección.
    async getAllPeliculasConLugarYDuracion(){
        try{
            let res = await this.collection.aggregate([
                {
                    $lookup: {
                      from: "funcion",
                      localField: "_id",
                      foreignField: "id_pelicula",
                      as: "funcion"
                    }
                  },
                  {
                    $unwind: "$funcion"
                  },
                  {
                    $lookup: {
                      from: "lugar",
                      localField: "funcion.id_lugar",
                      foreignField: "_id",
                      as: "lugar"
                    }
                  },
                  {
                    $unwind: "$lugar"
                  },
                  {
                    $project: {
                      _id: 0,
                      "lugar.nombre": 1,
                      "funcion.fecha_hora_inicio": 1,
                      "funcion.fecha_hora_fin": 1,
                      titulo: 1,
                      duracion: 1
                    }
                  }
            ]).toArray()
            return res
        } catch (error){
            console.error('Error al insertar al realizar la consulta', error);
        }
    }
}
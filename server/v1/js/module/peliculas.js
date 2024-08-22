const Connect = require("../../helpers/db/connect.js");
const { ObjectId } = require("mongodb");

module.exports = class peliculas extends Connect{
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
            return {mensaje: "Lista de peliculas", data: res}
        } catch (error){
            console.error('Error al insertar al realizar la consulta', error);
        }
    }

    //Permitir la consulta de información detallada sobre una película específica,
    //incluyendo sinopsis.
    /**
     * Obtiene una película de la base de datos según su ID.
     * 
     * @param {string} idPelicula - El ID de la película que se desea obtener.
     * @returns {Promise<Array>} Un arreglo que contiene la película encontrada, o un arreglo vacío si no se encuentra ninguna película con el ID proporcionado.
     */
    async  getPelicula(idPelicula){
      try{
        let res = await this.collection.find({ 
          _id: new ObjectId(idPelicula)
        },{projection:
            { 
              _id: 0,
              duracion: 0, 
              genero: 0
            }}).toArray()
        return res
      } catch (error){
        console.log("Error en la consult, verifique el id", error)
      }
    }
}


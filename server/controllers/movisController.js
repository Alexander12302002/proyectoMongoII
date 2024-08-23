const peliculas = require('../v1/js/module/peliculas')

const getAllMovis = async(req, res)=>{
    const obj = new peliculas();
    res.status(201).json({logica: await obj.getAllPeliculasConLugarYDuracion()})
}

module.exports = getAllMovis
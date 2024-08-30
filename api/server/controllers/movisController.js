const { validationResult } = require('express-validator');
const peliculas = require('../v1/js/module/peliculas')

const getMovisInBillboard = async(req, res)=>{
    const obj = new peliculas();
    res.status(201).json(await obj.getAllPeliculasConLugarYDuracion())
}

const getAllMovis = async(req, res)=>{
    const obj = new peliculas();
    res.status(201).json(await obj.getAllPeliculas())
}

const getMovie = async (req, res) => {
    const obj = new peliculas();
    const nombrePelicula = req.query.nombre; // Obtener el nombre de la película desde el query param
    let resModel = await obj.getPelicula(nombrePelicula);
    if (resModel) {
        res.status(200).json(resModel);
    } else {
        res.status(404).json({ message: 'Película no encontrada' });
    }
};

const getMovieForId = async (req, res) => {
    const obj = new peliculas();
    const id_pelicula = req.query.id; 
    let resModel = await obj.getPeliculaForId(id_pelicula);
    if (resModel) {
        res.status(200).json(resModel);
    } else {
        res.status(404).json({ message: 'Película no encontrada' });
    }
};

module.exports = {
    getMovisInBillboard,
    getAllMovis,
    getMovie,
    getMovieForId
}

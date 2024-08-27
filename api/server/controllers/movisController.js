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

module.exports = {
    getMovisInBillboard,
    getAllMovis,
}
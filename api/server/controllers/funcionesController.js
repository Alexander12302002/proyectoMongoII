const funciones = require("../v1/js/module/funciones")

const getAllFuncion = async(req, res) =>{
    const obj = new funciones
    res.status(201).json(await obj.getAllfunciones())
}

module.exports = {
    getAllFuncion 
}




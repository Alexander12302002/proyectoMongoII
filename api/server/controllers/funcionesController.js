const funciones = require("../v1/js/module/funciones")

const getAllFuncion = async(req, res) =>{
    const obj = new funciones
    res.status(201).json(await obj.getAllfunciones())
}

const getAllFuncionCine = async(req ,res) =>{
    const obj = new funciones
    const idFuncion = req.query.id;
    let resModel = await obj.getFuncionCine(idFuncion);
    if (resModel) {
        res.status(200).json(resModel);
    } else {
        res.status(404).json({ message: 'Funcion no encontrada' });
    }
}

module.exports = {
    getAllFuncion,
    getAllFuncionCine
}




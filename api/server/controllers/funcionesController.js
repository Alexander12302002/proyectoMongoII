const funciones = require("../v1/js/module/funciones")

const getAllFuncion = async(req, res) =>{
    const obj = new funciones
    res.status(201).json(await obj.getAllfunciones())
}

const getFuncion = async(req, res) =>{
    const obj = new funciones
    const idFuncion = req.query.id;
    try {
        let resModel = await obj.getFuncion(idFuncion);

        if (resModel && resModel.length > 0) {
            res.status(200).json(resModel);
        } else {
            res.status(404).json({ message: 'Función no encontrada' });
        }
    } catch (error) {
        // Manejo de errores adicionales si es necesario
        res.status(500).json({ message: 'Error al obtener la función', error: error.message });
    }
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

const getFuncionAsientos = async(req, res) =>{
    const obj = new funciones
    const idFuncion = req.query.id;
    let resModel = await obj.getAsientosFuncion(idFuncion)
    if (resModel) {
        res.status(200).json(resModel);
    } else {
        res.status(404).json({ message: 'Funcion no encontrada' });
    }
}

module.exports = {
    getAllFuncion,
    getAllFuncionCine,
    getFuncionAsientos,
    getFuncion
}




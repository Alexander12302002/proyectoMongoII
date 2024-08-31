const asiento = require("../v1/js/module/asientos")

const getAllAsientos = async(req, res) =>{
    const obj = new asiento
    res.status(201).json(await obj.getAllasientos())
}

const getAsientoForcode = async (req, res) => {
    try {
        const obj = new asiento();
        // Convierte req.query.codes en un array si es una cadena JSON
        let codes = req.query.codes;
        if (typeof codes === 'string') {
            codes = JSON.parse(codes); // Convierte la cadena JSON a un array
        }

        // Verifica que 'codes' sea un array
        if (!Array.isArray(codes)) {
            throw new Error('El parámetro codes debe ser un array');
        }

        let resModel = await obj.getAsientoForCode(codes);
        if (resModel && resModel.length > 0) {
            res.status(200).json(resModel);
        } else {
            res.status(404).json({ message: 'No se encontraron asientos' });
        }
    } catch (error) {
        console.error('Error al obtener asientos:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = {
    getAllAsientos,
    getAsientoForcode
}
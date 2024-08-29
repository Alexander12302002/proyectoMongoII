const asientoReserva = require("../v1/js/module/reservarAsientos")

const getReserveSeatsConfirmed = async(req, res) =>{
    const obj = new asientoReserva
    const idFuncion = req.query.id;
    let resModel = await obj.getAsientosReservadosConfirmados(idFuncion)
    if (resModel) {
        res.status(200).json(resModel);
    } else {
        res.status(404).json({ message: 'Funcion no encontrada' });
    }
}

module.exports = {
    getReserveSeatsConfirmed 
}


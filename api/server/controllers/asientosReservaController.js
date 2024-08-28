const asientoReserva = require("../v1/js/module/reservarAsientos")

const getReserveSeatsConfirmed = async(req, res) =>{
    const obj = new asientoReserva
    res.status(201).json(await obj.getAsientosReservadosConfirmados())
}

module.exports = {
    getReserveSeatsConfirmed 
}


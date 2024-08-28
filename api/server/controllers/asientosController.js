const asiento = require("../v1/js/module/asientos")

const getAllAsientos = async(req, res) =>{
    const obj = new asiento
    res.status(201).json(await obj.getAllasientos())
}

module.exports = {
    getAllAsientos
}
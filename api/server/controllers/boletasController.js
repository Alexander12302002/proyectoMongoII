const { validationResult } = require('express-validator');
const Boleta = require('../v1/js/module/boletas');

const createBoleta = async (req, res) => {
    const obj = new Boleta();
    console.log(req.body)
    let resModel = await obj.setComprarBoletas(req.body)
    res.status(200).json(resModel)
};

module.exports = { createBoleta };
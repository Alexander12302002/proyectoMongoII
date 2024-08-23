const { validationResult } = require('express-validator');
const cliente = require("../v1/js/module/clientes")
const UserDTO = require('../dto/userDto');

const createUser = async(req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const obj = new cliente();
    let resModel = await obj.crearUsuario(req.body)
    res.status(200).json(resModel)
}

module.exports = createUser
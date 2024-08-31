const { body } = require('express-validator');

exports.boletaValidationRules = () => {
    return [
        body('id_asientos')
            .isArray({ min: 1 }).withMessage('El campo id_asientos debe ser un array no vacío.')
            .bail()
            .custom((value) => {
                if (!Array.isArray(value)) {
                    throw new Error('El campo id_asientos debe ser un array.');
                }
                return value.every(id => /^[0-9a-fA-F]{24}$/.test(id));
            }).withMessage('Cada id_asiento debe ser un ObjectId válido.'),

        body('id_movimiento')
            .isString().withMessage('El campo id_movimiento debe ser una cadena.')
            .isLength({ min: 24, max: 24 }).withMessage('El campo id_movimiento debe tener 24 caracteres.')
            .matches(/^[0-9a-fA-F]+$/).withMessage('El campo id_movimiento debe ser un ObjectId válido.'),

        body('fecha_adquisicion')
            .isISO8601().withMessage('El campo fecha_adquisicion debe ser una fecha en formato ISO 8601.')
            .toDate() 
    ];
};

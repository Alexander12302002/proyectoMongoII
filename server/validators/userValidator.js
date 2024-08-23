const {body} = require("express-validator")

exports.userValidationRules = () => {
    return [
        body('nombre').notEmpty().withMessage('El nombre es requerido'),
        body("apellido").notEmpty().withMessage('El apellido es requerido'),
        body("nick").notEmpty().withMessage('El nick es requerido'),
        body('email').isEmail().withMessage('El email no es valido'),
        body("rol").notEmpty().isIn(['Administrador', 'usuarioEstandar', 'usuarioVip']).withMessage('El rol debe ser uno de los siguientes: Administrador, usuarioEstandar, usuarioVip'),
        body('telefono').isLength({ min: 10, max: 10  }).withMessage('El telefono tiene que tener 10 caracteres'),
        body('cedula').isLength({ min: 10, max: 10  }).withMessage('la cedula tiene que tener 10 caracteres'),
    ];
};

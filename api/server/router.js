const router = require('express').Router();
const path = require('path');
const { getAllMovis, getMovisInBillboard, getMovie, getMovieForId} = require('./controllers/movisController');
const {getAllAsientos, getAsientoForcode} = require('./controllers/asientosController')
const createUser  = require('./controllers/userController');
const {getAllFuncionCine, getFuncionAsientos, getFuncion} = require('./controllers/funcionesController')
const { userValidationRules } = require('./validators/userValidator');
const { boletaValidationRules } = require('./validators/boletasValidator')
const {getReserveSeatsConfirmed} = require('./controllers/asientosReservaController')
const { createBoleta } = require('./controllers/boletasController');

router.get("/", (req, res)=>{
    res.sendFile(path.join(req.__dirname, process.env.EXPRESS_STATIC, "index.html"))
})

router.get('/pelicula/v0', getAllMovis)
router.get('/pelicula/v1', getMovisInBillboard)
router.get('/pelicula/v2', getMovie)
router.get('/pelicula/v3', getMovieForId)
router.get('/funciones/v0', getAllFuncionCine)
router.get('/funciones/v1', getFuncionAsientos)
router.get('/funciones/v2', getFuncion)
router.get('/asientos/v0', getAllAsientos)
router.get('/asientos/v1', getAsientoForcode)
router.get('/asientosReserva/v0', getReserveSeatsConfirmed)
router.post('/user/v1', userValidationRules(), createUser);
router.post('/boletas/v0', createBoleta);


module.exports = router;
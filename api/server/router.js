const router = require('express').Router();
const path = require('path');
const { getAllMovis, getMovisInBillboard, getMovie} = require('./controllers/movisController');
const {getAllAsientos} = require('./controllers/asientosController')
const createUser  = require('./controllers/userController');
const { userValidationRules } = require('./validators/userValidator');
const {getReserveSeatsConfirmed} = require('./controllers/asientosReservaController')

router.get("/", (req, res)=>{
    res.sendFile(path.join(req.__dirname, process.env.EXPRESS_STATIC, "index.html"))
})

router.get('/pelicula/v0', getAllMovis)
router.get('/pelicula/v1', getMovisInBillboard)
router.get('/pelicula/v2', getMovie)
router.get('/asientos/v0', getAllAsientos)
router.get('/asientosReserva/v0', getReserveSeatsConfirmed)
router.post('/user/v1', userValidationRules(), createUser);


module.exports = router;
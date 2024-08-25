const router = require('express').Router();
const path = require('path');
const getAllMovis = require('./controllers/movisController');
const createUser  = require('./controllers/userController');
const { userValidationRules } = require('./validators/userValidator');

router.get("/", (req, res)=>{
    res.sendFile(path.join(req.__dirname, process.env.EXPRESS_STATIC, "index.html"))
})

router.get("/pelicula", (req, res)=>{
    res.sendFile(path.join(req.__dirname, process.env.EXPRESS_STATIC, 'views/peliculas.html'))
})

router.get("/servicio", (req, res)=>{
    res.sendFile(path.join(req.__dirname, process.env.EXPRESS_STATIC, "views/servicio.html"))
})

router.get("/usuario", (req, res)=>{
    res.sendFile(path.join(req.__dirname, process.env.EXPRESS_STATIC, "views/usuarios.html"))
})

router.get('/pelicula/v1', getAllMovis)
router.post('/user/v1', userValidationRules(), createUser);


module.exports = router;
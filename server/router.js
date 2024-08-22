const router = require('express').Router();
const path = require('path');
const getAllMovis = require('./controllers/movisController');


router.get("/pelicula", (req, res)=>{
    res.sendFile(path.join(req.__dirname, process.env.EXPRESS_STATIC, 'views/peliculas.html'))
})

router.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname, process.env.EXPRESS_STATIC, "index.html"))
})

router.get("/servicio", (req, res)=>{
    res.sendFile(path.join(__dirname, process.env.EXPRESS_STATIC, "views/servicio.html"))
})

router.get('/pelicula/v1', getAllMovis)
module.exports = router;
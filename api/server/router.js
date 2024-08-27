const router = require('express').Router();
const path = require('path');
const { getAllMovis, getMovisInBillboard} = require('./controllers/movisController');
const createUser  = require('./controllers/userController');
const { userValidationRules } = require('./validators/userValidator');

router.get("/", (req, res)=>{
    res.sendFile(path.join(req.__dirname, process.env.EXPRESS_STATIC, "index.html"))
})

router.get('/pelicula/v0', getAllMovis)
router.get('/pelicula/v1', getMovisInBillboard)
router.post('/user/v1', userValidationRules(), createUser);


module.exports = router;
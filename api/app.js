const express = require("express");
const path = require("path")
const app = express();
const router = require("./server/router");
const cors = require('cors');

app.use(cors())
app.use(express.json())
app.use("/css", express.static(path.join(__dirname, process.env.EXPRESS_STATIC, "css")));
app.use("/js", express.static(path.join(__dirname, process.env.EXPRESS_STATIC, "js")));
app.use(express.static(process.env.EXPRESS_STATIC))


app.use((req, res, next)=>{
  req.__dirname = __dirname;
  next();
}, router);

app.use((req, res)=>{
  res.status(404).json({message: "No tiene autorizacion"})
})

let config = {
    port: process.env.EXPRESS_PORT,
    host: process.env.EXPRESS_HOST
}

app.listen(config, ()=>{
    console.log(`http://${config.host}:${config.port}`);
});
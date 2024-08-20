const express = require("express");
const path = require("path")
const app = express();

app.use(express.json())
app.use("/css", express.static(path.join(__dirname, process.env.EXPRESS_STATIC, "css")));
app.use("/js", express.static(path.join(__dirname, process.env.EXPRESS_STATIC, "js")));

app.use(express.static(process.env.EXPRESS_STATIC))

app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname, process.env.EXPRESS_STATIC, "index.html"))
})

app.get("/servicio", (req, res)=>{
    res.sendFile(path.join(__dirname, process.env.EXPRESS_STATIC, "views/servicio.html"))
})

app.use((req, res)=>{
    res.status(400).json({message: "No tienes autorizacion"})
})

let config = {
    port: process.env.EXPRESS_PORT,
    host: process.env.EXPRESS_HOST
}
app.listen(config, ()=>{
    console.log(`http://${config.host}:${config.port}`);
});
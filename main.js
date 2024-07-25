import { peliculas } from "./js/module/peliculas.js";

let mongo = new peliculas()
console.log(await mongo.getAllPeliculas())
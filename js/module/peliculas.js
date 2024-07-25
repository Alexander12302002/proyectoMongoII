import { Connect } from "../../helpers/db/connect.js";

export class peliculas extends Connect{
    constructor(){
        if(typeof peliculas.instance === "object") {
            return peliculas.instance;
        }
        super();
        this.collection = this.db.collection("peliculas");
        peliculas.instance = this;
        return this;
    }

    async getAllPeliculas(){
        let res = await this.collection.find({},{}).toArray();
        return res
    }
}
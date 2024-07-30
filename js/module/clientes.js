import { Connect } from "../../helpers/db/connect.js";
import { ObjectId } from "mongodb";

export class clientes extends Connect{
    constructor(){
        if(typeof clientes.instance === "object") {
            return clientes.instance;
        }
        super();
        this.collection = this.db.collection("cliente");
        clientes.instance = this;
        return this;
    }

    async getCliente(id_cliente){
        try{
            let res = this.collection.find({_id: new ObjectId(id_cliente)},{}).toArray()
            return res
        } catch (error){
            console.log("No se encuentra el movimiento verifique el id", error)
        }
    }



    /**
     * Crea un nuevo usuario en la base de datos y en el sistema de autenticación de MongoDB.
     * 
     * @param {Object} usuario - Objeto que contiene la información del usuario a crear.
     * @param {string} usuario.nombre - Nombre del usuario.
     * @param {string} usuario.apellido - Apellido del usuario.
     * @param {string} usuario.nick - Nickname o nombre de usuario.
     * @param {string} usuario.email - Correo electrónico del usuario.
     * @param {string} usuario.telefono - Número de teléfono del usuario.
     * @param {string} usuario.id_tipo_de_categoria - ID de la categoría del usuario.
     * @param {string} usuario.cedula - Cédula o documento de identidad del usuario.
     * @param {string} usuario.rol - Rol del usuario en la base de datos de MongoDB.
     * @returns {Object} Mensaje de éxito o error y el usuario creado.
     */
    async crearUsuario(usuario) {
         // Desestructurar los campos necesarios del objeto 'usuario'   
        let { nombre, apellido, nick, email, telefono, id_tipo_de_categoria: id, cedula, rol } = usuario;
         // Verificar si ya existe un usuario con el mismo nick, cedula o email
        const condicion = await this.collection.find({
          $or: [
            { nick: nick },
            { cedula: cedula },
            { email: email }
          ]
        }).toArray();
         // Si el usuario ya existe, retornar un mensaje indicando el conflicto
        if (condicion.length) return { mensaje: "El usuario ya existe", usuario };
        // Insertar el nuevo usuario en la colección de usuarios
        const res = await this.collection.insertOne({
            id_tipo_de_categoria: new ObjectId(id),
            nombre,
            apellido,
            nick,
            email,
            telefono,
            cedula,
            rol
        });
        // Crear el usuario en el sistema de autenticación de MongoDB
        const crearUsuario = await this.db.command({
            createUser: nick,
            pwd: `${cedula}`,
            roles: [
                {role: rol, db: process.env.MONGO_DB}
            ]
        });
        await this.close();
        return { mensaje: "El usuario fue creado", usuario: res}
    }
}
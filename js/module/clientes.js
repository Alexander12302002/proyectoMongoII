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

    /**
     * Obtiene detalles completos de un usuario específico, incluyendo su rol y el estado de su tarjeta VIP.
     * 
     * @param {string} idUsuario - El identificador único del usuario en formato de cadena.
     * @returns {Promise<Array>} - Una promesa que se resuelve con un array que contiene la información detallada del usuario.
     */
    async detalleUsuario(idUsuario){
         // **Filtra** el documento del usuario específico basado en el _id proporcionado
         let res = await this.collection.aggregate([
            {
              $match: {
                _id: new ObjectId(idUsuario)
              }
            },
            // **Realiza un join** con la colección 'tarjeta' para obtener detalles adicionales de la tarjeta asociada al usuario
            {
              $lookup: {
                from: "tarjeta",
                localField: "_id",
                foreignField: "codigo_usuario",
                as: "tarjeta_info"
              }
            },
            // **Descompone** el array 'tarjeta_info' para obtener un solo documento por tarjeta
            {
              $unwind: {
                path: "$tarjeta_info",
                preserveNullAndEmptyArrays: true
              }
            },
            // **Proyecta** los campos deseados para el resultado final
            {
              $project: {
                _id: 0,
                nombre: 1,
                apellido: 1,
                nick: 1,
                email: 1,
                telefono: 1,
                id_tipo_de_categoria: 0,
                cedula: 1,
                rol: 1,
                tarjeta: {
                  codigo_usuario: "$tarjeta_info.codigo_usuario",
                  fecha_expedicion: "$tarjeta_info.fecha_expedicion",
                  estado: "$tarjeta_info.estado"
                }
              }
            }
          ]).toArray()
        return res // Retorna el resultado de la consulta
    }
}
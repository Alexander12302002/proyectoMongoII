const Connect = require("../../helpers/db/connect.js");
const { ObjectId } = require("mongodb");

module.exports =  class clientes extends Connect{
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
     * @param {string} usuario.cedula - Cédula o documento de identidad del usuario.
     * @param {string} usuario.rol - Rol del usuario en la base de datos de MongoDB.
     * @returns {Object} Mensaje de éxito o error y el usuario creado.
     */
    async crearUsuario(usuario) {
         // Desestructurar los campos necesarios del objeto 'usuario'   
        let { nombre, apellido, nick, email, telefono, cedula, rol } = usuario;
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
            nombre,
            apellido,
            nick,
            email,
            telefono,
            cedula,
            rol
        });
        // Crear el usuario en el sistema de autenticación de MongoDB
        await this.db.command({
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

    /**
     * Actualiza el rol de un usuario en la base de datos.
     * 
     * @param {string} idUsuario - El identificador único del usuario en formato de cadena.
     * @param {string} nuevoRol - El nuevo rol que se asignará al usuario. Los valores válidos son: 'usuarioEstándar', 'usuarioVip', 'administrador'.
     * @returns {Object} Mensaje de éxito o error y el usuario actualizado.
     */
        async actualizarRol(idUsuario, nuevoRol) {
            const rolesValidos = ['usuarioEstandar', 'usuarioVip', 'Administrador'];
            let usuario = await this.collection.find({_id: new ObjectId(idUsuario)},{}).toArray()
            // Verificar que el nuevo rol sea válido
            if (!rolesValidos.includes(nuevoRol)) {
                return { mensaje: "Rol inválido", error: "El rol especificado no es válido." };
            }
            
            try {
                // Actualizar el rol del usuario en la base de datos
                const resultado = await this.collection.updateOne(
                    { _id: new ObjectId(idUsuario) },
                    { $set: { rol: nuevoRol } }
                );
                
                // Verificar si el usuario fue encontrado y actualizado
                if (resultado.matchedCount === 0) {
                    return { mensaje: "Usuario no encontrado", error: "No se encontró un usuario con el ID proporcionado." };
                }

                // Actualizar el rol del usuario en el sistema de autenticación de MongoDB
                await this.db.command({
                  updateUser: usuario[0].nick, 
                  roles: [
                      { role: nuevoRol, db: process.env.MONGO_DB }
                  ]
              });
        
                return { mensaje: "El rol del usuario fue actualizado exitosamente", usuario: { idUsuario, nuevoRol } };
            } catch (error) {
                console.log("Error al actualizar el rol del usuario:", error);
                return { mensaje: "Error en la actualización del rol", error: error.message };
            }
        }

/**
 * Consulta usuarios en la base de datos según un rol específico.
 * Si no se proporciona un rol, se obtienen todos los usuarios.
 * 
 * @param {string} [rol] - El rol de los usuarios a consultar (opcional)
 * @returns {Promise<object[]>} Una promesa que resuelve con un arreglo de objetos de usuario
 */
  async consultarUsuarios(rol) {
    try {
      // Filtro por defecto para obtener todos los usuarios
      let filtro = {};

      // Si se proporciona un rol, agregarlo al filtro después de validar su validez
      if (rol) {
        /**
         * Roles válidos para filtrar usuarios
         * @type {string[]}
         */
        const rolesValidos = ['usuarioEstandar', 'usuarioVip', 'Administrador'];
        
        // Validar si el rol proporcionado es válido
        if (!rolesValidos.includes(rol)) {
          throw new Error('Rol inválido');
        }
        
        // Agregar el rol válido al filtro
        filtro.rol = rol;
      }

      // Consultar la base de datos con el filtro aplicado
      const usuarios = await this.collection.find(filtro).toArray();

      // Devolver el arreglo de usuarios consultados
      return usuarios;

    } catch (error) {
      // Loguear el error en la consola
      console.error("Error al consultar usuarios:", error);
      
      // Lanzar un nuevo error con un mensaje más informativo
      throw new Error(`Error en la consulta de usuarios: ${error.message}`);
    }
  }
}
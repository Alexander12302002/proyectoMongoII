### **Requisitos Funcionales**

1. Selección de Películas:
   - **API para Listar Películas:** Permitir la consulta de todas las películas disponibles en el catálogo, con detalles como título, género, duración y horarios de proyección.

##### getAllPeliculasConLugarYDuracion()

- ##### Descripción:

  Esta función asincrónica devuelve una lista de películas con información adicional sobre el lugar y la duración de cada función.

- ##### Parámetros:

  Ninguno

- ##### Retorno:

  Una lista de objetos que contienen la siguiente información:

  **lugar.nombre**: El nombre del lugar donde se proyecta la película.
  **funcion.fecha_hora_inicio**: La fecha y hora de inicio de la función.
  **funcion.fecha_hora_fin**: La fecha y hora de fin de la función.
  **titulo**: El título de la película.
  **duracion**: La duración de la película.
  

  - **API para Obtener Detalles de Película:** Permitir la consulta de información detallada sobre una película específica, incluyendo sinopsis.

##### getPelicula(idPelicula)

- ##### Descripción:

  Esta función asincrónica devuelve una película con información adicional, excluyendo su ID, duración y género.

- ##### Parámetros:

  - `idPelicula`: El ID de la película que se desea obtener.

- ##### Retorno:

  Un objeto que contiene la siguiente información:

  **titulo**: El título de la película.
  **sinopsis**: La sinopsis de la película.

  - **API para Reservar Asientos:** Permitir la selección y reserva de asientos para una proyección específica.

2. Compra de Boletos:

##### setComprarBoletas(JsonDatos)

- ##### Descripción:

  Esta función asincrónica permite la compra de un boleto verificando la existencia del movimiento y asiento, y asegurándose de que el asiento no esté ya comprado.

- ##### Parámetros:

  - `id_movimiento`: ID del movimiento.
  - `id_asiento`: ID del asiento.
  - `fecha_adquisicion`: Fecha de adquisición del boleto.

- ##### Retorno:

  Un objeto que contiene el resultado de la inserción del nuevo boleto o mensajes de error si se encuentran problemas durante el proceso.

  - **API para Verificar Disponibilidad de Asientos:** Permitir la consulta de la disponibilidad de asientos en una sala para una proyección específica.

#### getVerificacionAsiento(id_asiento)

- ##### Descripción:

  Esta función asincrónica verifica si un asiento específico ya ha sido comprado para una función.

- ##### Parámetros:

  - `id_asiento`: El ID del asiento que se desea verificar.

- ##### Retorno:

Un booleano que indica si el asiento ya ha sido comprado:

  - `true`: El asiento ya ha sido comprado.
  - `false`: El asiento está disponible.

3. Compra de Boletos:

#### setReservar(JsonReserva)

- ##### Descripción:

  Esta función asincrónica realiza la reserva de un asiento para una función específica, verificando previamente que el asiento, el cliente y la función existan y que el asiento no esté ya reservado.

- ##### Parámetros:

  - `id_cliente`: El ID del cliente que desea reservar el asiento.
  - `id_asiento`: El ID del asiento que se desea reservar.
  - `id_funcion`: El ID de la función para la que se desea reservar el asiento.
  - `fecha_reserva`: La fecha en la que se realiza la reserva.

- ##### Retorno:

  Un objeto que indica el resultado de la operación de reserva:

  - `Success`: La reserva fue creada con éxito.
  - `Error`: Mensaje de error si ocurrió un problema durante el proceso.

#### cancelarReserva(id_reserva)

- ##### Descripción:

  Esta función asincrónica cancela una reserva específica mediante su ID.

- ##### Parámetros:

  - `id_reserva`: El ID de la reserva que se desea cancelar.

- ##### Retorno:

  Un objeto que indica el resultado de la operación de cancelación:

  - `Success`: Mensaje indicando que la reserva fue cancelada con éxito.
  - `Error`: Mensaje de error si ocurrió un problema durante el proceso o si la reserva no fue encontrada.

#### getValidarTarjetas(id_cliente)

- ##### Descripción:

  Esta función asincrónica recupera el estado de una tarjeta asociada a un cliente específico mediante su ID de usuario.

- ##### Parámetros:

  id_cliente: El ID del cliente cuya tarjeta se desea consultar. Este ID se convierte en un ObjectId para la búsqueda en la base de datos.

- ##### Retorno:

  Un mensaje que indica el estado de la tarjeta o un mensaje de error en caso de problemas:
  
  - `La tarjeta se encuentra: <estado>`: Mensaje indicando el estado actual de la tarjeta asociada al cliente.
  - `No se encontraron tarjetas para el id proporcionado.`: Mensaje si no se encuentran tarjetas asociadas al ID proporcionado.
  - `Error al buscar la tarjeta. Verifique el id.`: Mensaje de error si ocurre un problema durante la búsqueda en la base de datos.

#### crearUsuario(usuario)

- ##### **Descripción:**

  Esta función asincrónica permite la creación de un nuevo usuario en el sistema. Verifica la existencia previa del usuario basándose en el `nick`, `cedula`, o `email`, y si no existe, lo inserta en la base de datos y en el sistema de autenticación de MongoDB.

- ##### **Parámetros:**

  `usuario`: Un objeto que contiene la información del nuevo usuario con los siguientes campos:

  - `nombre`: Nombre del usuario.
  - `apellido`: Apellido del usuario.
  - `nick`: Nombre de usuario o alias.
  - `email`: Correo electrónico del usuario.
  - `telefono`: Número de teléfono del usuario.
  - `id_tipo_de_categoria`: ID de la categoría del usuario, que se convierte en `ObjectId` para la búsqueda en la base de datos.
  - `cedula`: Documento de identificación del usuario.
  - `rol`: Rol del usuario, que puede ser `usuarioEstándar`, `usuarioVip`, o `administrador`.

- ##### **Retorno:**

  Un objeto con el siguiente formato:

  - ```
    mensaje
    ```

    : Mensaje indicando el resultado de la operación. Puede ser uno de los siguientes:

    - `"El usuario ya existe"`: Si ya existe un usuario con el mismo `nick`, `cedula`, o `email`.
    - `"El usuario fue creado"`: Si el usuario fue creado exitosamente en la base de datos y en el sistema de autenticación de MongoDB.

  - `usuario`: El objeto de usuario que fue creado o el objeto que causó el conflicto (si ya existía).

#### detalleUsuario(idUsuario)

- ##### **Descripción:**

  Esta función asincrónica permite consultar la información detallada de un usuario específico en el sistema. Realiza una agregación en MongoDB para obtener datos del usuario junto con el estado de su tarjeta VIP, si existe. La consulta incluye el nombre, apellido, nick, email, teléfono, cédula, rol del usuario, y los detalles de la tarjeta asociada, como el código de usuario, la fecha de expedición y el estado de la tarjeta.

- ##### **Parámetros:**

  `idUsuario`: Un string que representa el identificador único del usuario en formato de cadena. Este ID se utiliza para buscar el usuario en la colección `cliente` y recuperar la información relacionada con la tarjeta del usuario en la colección `tarjeta`.

- ##### **Retorno:**

  Una promesa que se resuelve con un array que contiene la información detallada del usuario en el siguiente formato:

  - `nombre`: Nombre del usuario.

  - `apellido`: Apellido del usuario.

  - `nick`: Nombre de usuario o alias.

  - `email`: Correo electrónico del usuario.

  - `telefono`: Número de teléfono del usuario.

  - `cedula`: Documento de identificación del usuario.

  - `rol`: Rol del usuario, que puede ser `usuarioEstándar`, `usuarioVip`, o `administrador`.

  - ```
    tarjeta
    ```

    : Objeto que contiene detalles de la tarjeta del usuario, si existe:

    - `codigo_usuario`: Código de usuario asociado a la tarjeta.
    - `fecha_expedicion`: Fecha en que se emitió la tarjeta.
    - `estado`: Estado de la tarjeta (por ejemplo, `Activa` o `Inactiva`).

#### actualizarRol(idUsuario, nuevoRol)

- ##### **Descripción:**

  Esta función asincrónica permite actualizar el rol de un usuario en la base de datos. Primero, verifica si el nuevo rol es válido. Luego, actualiza el rol del usuario en la colección de la base de datos y, adicionalmente, intenta actualizar el rol del usuario en el sistema de autenticación de MongoDB. Finalmente, proporciona un mensaje de éxito o error dependiendo del resultado de la operación.

- ##### **Parámetros:**

  - `idUsuario`: Un string que representa el identificador único del usuario en formato de cadena. Este ID se utiliza para encontrar al usuario en la colección de la base de datos y para actualizar su rol.
  - `nuevoRol`: Un string que especifica el nuevo rol que se asignará al usuario. Los valores válidos son: `'usuarioEstandar'`, `'usuarioVip'`, o `'Administrador'`.

- ##### **Retorno:**

  Una promesa que se resuelve con un objeto que puede tener uno de los siguientes formatos:

  - **Mensaje de éxito:**

    ```json
    jsonCopy code{
      "mensaje": "El rol del usuario fue actualizado exitosamente",
      "usuario": {
        "idUsuario": "<idUsuario>",
        "nuevoRol": "<nuevoRol>"
      }
    }
    ```

  - **Mensaje de error:**

    ```json
    jsonCopy code{
      "mensaje": "Rol inválido",
      "error": "El rol especificado no es válido."
    }
    ```

    ```json
    jsonCopy code{
      "mensaje": "Usuario no encontrado",
      "error": "No se encontró un usuario con el ID proporcionado."
    }
    ```

    ```json
    jsonCopy code{
      "mensaje": "Error en la actualización del rol",
      "error": "<error.message>"
    }
    ```

#### consultarUsuarios(rol)

- ##### **Descripción:**

  Esta función asincrónica permite consultar la información de usuarios en el sistema, con la opción de filtrar por un rol específico. Realiza una consulta en la base de datos para obtener datos de usuarios que coincidan con el filtro proporcionado. La consulta incluye todos los campos de la colección `cliente`.

- ##### **Parámetros:**

  `rol`: Un string opcional que representa el rol de los usuarios que se desean consultar. Si se proporciona, la función valida su validez y lo utiliza para filtrar los resultados. Los roles válidos son `usuarioEstandar`, `usuarioVip`, y `Administrador`.

- ##### **Retorno:**

  Una promesa que se resuelve con un array que contiene la información de los usuarios consultados. Cada objeto de usuario incluye los siguientes campos:

  - `nombre`: Nombre del usuario.
  - `apellido`: Apellido del usuario.
  - `nick`: Nombre de usuario o alias.
  - `email`: Correo electrónico del usuario.
  - `telefono`: Número de teléfono del usuario.
  - `cedula`: Documento de identificación del usuario.
  - `rol`: Rol del usuario.

- ##### **Errores:**

  - Si se proporciona un rol inválido, la función lanza un error con el mensaje "Rol inválido".
  - Si ocurre un error durante la consulta a la base de datos, la función lanza un error con un mensaje que incluye el mensaje original del error.
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

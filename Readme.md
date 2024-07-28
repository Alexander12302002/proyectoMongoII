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
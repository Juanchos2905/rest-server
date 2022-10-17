const Server = require('./models/server')

require('dotenv').config() //Aca se requiere el puerto.


/*Server = Clase de models */
const server = new Server()
server.listen()


/*Express es una librería que nos facilita levantar un server
ahorrando muchos procesos manuales.  */

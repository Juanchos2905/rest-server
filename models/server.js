const express = require('express') //Se importa express
const cors = require('cors')
const { dbConection } = require('../database/config.db')

class Server{
    constructor(){
        this.app = express() //Se usa express
        this.port = process.env.PORT /* En local no sirve pero por ejemplo cuando lo desplegamos en heroku
                                        Se asigna un puerto.*/
        this.userPath = '/api/users' /**Esta es la url de usuarios 
                                        Porción dedicada a usuarios. Esta encaja en la función rutas(). */

        //Conectar a base de datos
        this.conectarDB()

        // this.productsPath = '/api/productos'

        // Middlewares
        this.middlewares()

        

        //Rutas de mi app
        this.routes()
    }

    conectarDB(){
        dbConection()
    }

    middlewares(){
        //CORS
        this.app.use(cors())

        //Lectura y parseo del body
        this.app.use(express.json())


        // Directorio 'publico'
        this.app.use(express.static('public'))
    }


    routes(){
        this.app.use(this.userPath, require('../routes/user.routes'))
    }
    

    listen(){
        this.app.listen(this.port, () => {
            console.log(`App escuchando en http://localHost:${this.port}`)
          })
    }
}

module.exports = Server
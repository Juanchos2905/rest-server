const {Schema, model} = require('mongoose')
//Esto es un molde para una base de datos

const RoleSchema = Schema({
    role:{
        type: String,
        required: [true, 'El rol es requerido'],
    },
})

module.exports = model('roles', RoleSchema)

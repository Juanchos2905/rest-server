const {Schema, model} = require('mongoose')
//Esto es un molde para una base de datos

const UserSchema = Schema({
    name:{
        type: String,
        required: [true, 'El nombre es requerido'],
    },

    email:{
        type: String,
        required: [true, 'El email es requerido'],
        unique: true,
    },

    password:{
        type: String,
        required: [true, 'La contraseña es requerida'],
    }, 

    img:{
        type: String,
    },
    
    
    role:{
        type: String,
        required: [true, 'El rol es requerido'],
        // enum: ['ADMIN_ROLE', 'USER_ROLE'] Se comenta porque se valida desde una base de datos
    },  

    status:{
        type: Boolean,
        default: true,
    }, 

    google:{
        type: Boolean,
        default: false,
    }, 

})

UserSchema.methods.toJSON = function(){
    const {__V, password, ...user} = this.toObject()
    return user
}

module.exports = model('users', UserSchema)

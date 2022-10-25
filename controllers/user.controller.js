const {request, response } = require('express')
const bcryptjs = require('bcryptjs')
const User = require('../models/user')
const { validationResult } = require('express-validator')
const user = require('../models/user')

const getUser = async(req = request, res = response) => {
  // URL/api/user/?name=Juan&age=18-08-2005 -- Query
    try {
      let  {from = 0, lot = 5} = req.query
      from = from <= 0 || isNaN(from) ? 0 : from -1
      

      // promedio 270
      const query = {status: true}
      const [users, total] = await Promise.all([
        User.find(query).skip(from).limit(lot),
        User.countDocuments(query),
      ])


      

      req.res.status(200).json({
        total,
        users,
        from: from + 1,
        lot: Number(lot)
      })
      
    } catch (error) {
      console.log(error)
      res.status(500).json({
      msg: 'Error en el servidor',
      })
    }
  }

  const getUserById = (req = request, res = response) =>{
  // URL/api/user/25 -- Segmentación
  //Nombrarlo en la ruta
    const id = req.params.id
    res.json({
      msg: 'Usuario por id - controller',
      id,
    })
  }

  const createUser = async (req = request, res = response) => {
  // URL/api/user/ -- Body: activar raw y Json
  //Es el objeto en JSON
    // const {name, edad} = req.body

    try{
      const {name, email, password, role} = req.body
    const user = new User({name, email, password, role})

    //Verificar si el correo ya existe en la BD

    user.password = bcryptjs.hashSync(password, bcryptjs.genSaltSync())
 
    await user.save()
    res.status(201).json({
        msg: 'create API - controller',
        user,
    })
    }catch(error){
      console.log(error)
      res.status(500).json({
        msg: 'Error en el servidor',
      })
    }

 
    
    
  }

  const updateUser = async (req = request, res = response) => {
    // URL/api/user/3 -- Segementación

    try{
      const id = req.params.id
      const {password, google, ...data} = req.body

      if(password){
        data.password = bcryptjs.hashSync(password, bcryptjs.genSaltSync())
      }

      const user = await User.findByIdAndUpdate(id, data, {new : true})
      
      res.json({
        msg: 'update API - controller',
        user,
      })
    }catch(error){
      console.log(error)
      res.status(500).json({
        msg: 'Error en el servidor',
      })
    }
  }

  const deleteUser = async (req = request, res = response) => {
    // URL/api/user/ -- Segmentación
    try {
      const {id} = req.params

      //Borrado fisico de la base datos
      // const deleteUser = await User.findByIdAndDelete(id)

      //Borrado suave
      const deleteUser = await User.findByIdAndUpdate(id, {status: false}, {new: true})
      res.json({
         msg: 'delete API - controller',
         deleteUser
  
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({
        msg: 'Error en el servidor',
      })
    }
  }

  module.exports = {
    getUser,
    createUser,
    updateUser,
    deleteUser,
    getUserById,
  }
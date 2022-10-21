const {request, response } = require('express')
const bcryptjs = require('bcryptjs')
const User = require('../models/user')
const { validationResult } = require('express-validator')

const getUser = (req = request, res = response) => {
  // URL/api/user/?name=Juan&age=18-08-2005 -- Query
  const {name, date} = req.query
    req.res.status(200).json({
      msg: 'Get - Controller',
      name,
      date,
    })
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

 
    
    const {name, email, password, role} = req.body
    const user = new User({name, email, password, role})

    //Verificar si el correo ya existe en la BD



    user.password = bcryptjs.hashSync(password, bcryptjs.genSaltSync())



    await user.save()
    res.status(201).json({
        msg: 'create API - controller',
        user,
    })
  }

  const updateUser = (req = request, res = response) => {
    // URL/api/user/3 -- Segementación
    const id = req.params.id
    // const body = req.body
    res.json({
      msg: 'create API - controller',
      id,
      // body,
    })
  }

  const deleteUser = (req = request, res = response) => {
    // URL/api/user/ -- Segmentación
    const id = req.params.id
    res.json({
       msg: 'delete API - controller',
       id

    })
  }

  module.exports = {
    getUser,
    createUser,
    updateUser,
    deleteUser,
    getUserById,
  }
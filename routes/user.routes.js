const {Router} = require('express')
const { getUser, createUser, updateUser, deleteUser, getUserById } = require('../controllers/user.controller')

const router = Router()

  router.get('/', getUser)

  router.get('/:id', getUserById)

  router.post('/', createUser)

  router.put('/:id', updateUser)

  router.delete('/:id', deleteUser )

  module.exports = router
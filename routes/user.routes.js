const {Router} = require('express')
const {check} = require('express-validator')
const { getUser, createUser, updateUser, deleteUser, getUserById } = require('../controllers/user.controller')
const { isValidRole, emailExist, userByIdExist } = require('../helpers/db-validators')

// const { validateFields } = require('../middlewares/validate-fields')
// const {validateJWT} = require('../middlewares/validate-jwt')
// const { isRole } = require('../middlewares/validate-role')

const {isRole, validateFields, validateJWT} = require('../middlewares')

const Role = require('../models/role')

const router = Router()

  router.get('/', getUser)

  router.get('/:id', getUserById)

  router.post('/', [
    check('name', 'El nombre es requerido').not().isEmpty(),
    check('email', 'El correo es requerido').not().isEmpty(),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom(emailExist),
    check('password', 'La contraseña es requerida').not().isEmpty(),
    check('password', 'La contraseña debe tener 6 caracteres o más').isLength({min :6,}),
    check('role', 'El role es requerido').not().isEmpty(),
    // check('role', 'El rol no es válido, debe ser ADMIN_ROLE o USER_ROLE').isIn(
    //   ['ADMIN_ROLE', 'USER_ROLE']
    // ),
    check('role').custom(isValidRole),
    validateFields,

  ], createUser)

  router.put('/:id', [
  check('id', 'El ID no es válido').isMongoId(),
  check('id').custom(userByIdExist)
  , validateFields
  ], updateUser)

  router.delete('/:id', [
    validateJWT,
    isRole('ADMIN_ROLE'),
    check('id', 'El ID no es válido').isMongoId(),
    check('id').custom(userByIdExist)
    , validateFields
  ],deleteUser )

  module.exports = router
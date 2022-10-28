const {Router} = require('express') /*RE NECESARIO */
const {check} = require('express-validator') /*es para chekear cosas */
const { login } = require('../controllers/auth.controller')
const { emailExist } = require('../helpers/db-validators')
const { validateFields } = require('../middlewares/validate-fields')

const router = Router()

router.post('/login', [
    check('email', 'El email es requerido').not().isEmpty(),
    check('password', 'El password es requerido').not().isEmpty(),
    validateFields
    ],
    login),
    

module.exports = router
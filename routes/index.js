const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController.js')
// Ruta para crear usuario que brinda servicios
router.route('/user/provider')
.post(userController.addUserProvider)

module.exports = router

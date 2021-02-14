const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController.js')
// Ruta para crear usuario que brinda servicios
router.route('/user/provider')
.post(userController.addUserProvider)
// Ruta para crear usuario que pide servicios
router.route('/user/customer')
.post(userController.addUserCustomer)

module.exports = router

const express = require('express')
const router = express.Router()
require('../config/passport')
const passport = require('passport')

const userController = require('../controllers/userController.js')
const articleController = require('../controllers/articleController')
// Ruta para crear usuario que brinda servicios
router.route('/user/provider')
.post(userController.addUserProvider)
// Ruta para crear usuario que solicita servicios
router.route('/user/customer')
.post(userController.addUserCustomer)
// Ruta para cargar y obtener artículos
router.route('/article')
.get(articleController.getArticles)
.post(articleController.addArticle)

router.route('/user/storage')
.post(passport.authenticate('jwt', {session:false}), userController.preserveLog)
module.exports = router

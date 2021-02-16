const express = require('express')
const router = express.Router()
require('../config/passport')
const passport = require('passport')
const validator = require('../controllers/validator')
const userController = require('../controllers/userController.js')
const articleController = require('../controllers/articleController')
const professionalController=require('../controllers/professionController')
// Ruta para crear usuario que brinda servicios
router.route('/user/provider')
.post(userController.addUserProvider)
// Ruta para crear usuario que solicita servicios
router.route('/user/signIn')
.post(userController.signIn)
//Ruta user registrado
router.route('/user/customer')
.get(userController.getCustomers)
.post(validator.validNewUser, userController.addUserCustomer)

router.route('/user/providers')
.get(userController.getProviders)

//Obtener professionales por id de profesiones
router.route('/user/professionals/:id')
.get(userController.getProfessionalsForId)

// Ruta para cargar y obtener artículos
router.route('/article')
.get(articleController.getArticles)
.post(articleController.addArticle)

router.route('/professions')
.get(professionalController.getProfession)
.post(professionalController.addProfession)


router.route('/user/storage')
.post(passport.authenticate('jwt', {session:false}), userController.preserveLog)
module.exports = router

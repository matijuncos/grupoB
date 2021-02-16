const UserBase = require('../models/UserBase')
const UserProvider = require('../models/UserProvider')
const UserConsumer = require('../models/UserConsumer')
const bcryptjs = require('bcryptjs');
const jwtoken = require('jsonwebtoken');

const userController = {
   addUserProvider: async (req, res) =>{
      // Desestructuro la req del front-end
      console.log(req.body)
      var {firstName, lastName, urlPic, email, phone, password, country,
      website, arrayValoration, review, rol, idProfession} = req.body
      if(req.body.idUserBase !== "undefined"){
         const userBaseExists = await UserBase.findOne({_id: req.body.idUserBase})
         firstName=userBaseExists.firstName, 
         lastName=userBaseExists.lastName,
         urlPic=userBaseExists.urlPic,
         email=userBaseExists.email,
         phone=userBaseExists.phone,
         password=userBaseExists.password
      }
      console.log(req.body)
      const hashedPassword =  bcryptjs.hashSync(password, 10)
      const userBase = new UserBase ({
         firstName, lastName, urlPic, email, phone, password: hashedPassword, country
      })
      // Guardo en la base de datos el usuario base y luego lo voy a popular en el idUserBase para tener el resto de los datos      
      try{
         const newUserBase = await userBase.save()
         const idUserBase = newUserBase
         const userProvider = new UserProvider({
            //_id:idUserBase,
            idUserBase: idUserBase._id, website, arrayValoration, review, rol, idProfession
         })
         userProvider.save()
         .then(async newUserProvider =>{
            // Populo el UserBase dentro del UserProvider para obtener el usuario mas sus datos
            const populateUserProvider = await UserProvider.findById(newUserProvider._id).populate('idUserBase')
            var token = jwtoken.sign({...populateUserProvider}, process.env.SECRET_KEY, {})
            res.json({
               success:true, 
               response:
               {token,
                firstName: userBase.firstName,
                urlPic: userBase.urlPic,
                email: userBase.email,
               //  _id:idUserBase._id
               _id: idUserBase._id
               }})
         })
         .catch(error => {return res.json({success:false, error})})
      }
      catch{
         return res.json({success:false, error:{"error":"Fallo la creacion del usuario base"}})
      }      
   },
   addUserCustomer: async (req, res) =>{
      const {firstName, lastName, urlPic, email, phone, password, country} = req.body
      const emailExists = await UserBase.findOne({email: email})
      if (emailExists){ res.json({success: false, message: "Este correo ya esta siendo usado."})}
      else{
      const hashedPassword =  bcryptjs.hashSync(password, 10)
      const userBase = new UserBase ({
         firstName, lastName, urlPic, email, phone, password:hashedPassword, country
      })
      // Guardo en la base de datos el usuario base y luego lo voy a popular en el idUserBase para tener el resto de los datos         
      try{
         const newUserBase = await userBase.save()
         const idUserBase = newUserBase._id
         const userConsumer = new UserConsumer({
            //_id:idUserBase,
            idUserBase:idUserBase
         })
         userConsumer.save()
         .then(async newUserConsumer =>{
            // Populo el UserBase dentro del UserProvider para obtener el usuario mas sus datos
            const populateUserConsumer = await UserConsumer.findById(newUserConsumer._id).populate('idUserBase')
            var token = jwtoken.sign({...populateUserConsumer}, process.env.SECRET_KEY, {})
            res.json({
               success:true, 
               response:{
                  token,
                  firstName: userBase.firstName,
                  urlPic: userBase.urlPic,
                  email: userBase.email,
                  _id: newUserBase._id
               }})
         })
         .catch(error => {
            return res.json({success:false, error})})
      }
      catch{
         return res.json({success:false})
      }}
   },
   signIn: async (req,res) => {
      // desestructuro del front la req 
      const {email, password} = req.body
      const userExist = await UserBase.findOne({email:email}) // verifica que el usuario exista y lo guarda en variable, 
      if (!userExist) {
          return res.json ({success: false, message: "El usuario y/o la contraseña no existe/n"})
      }
      const matcheoPass = bcryptjs.compareSync(password, userExist.password) // verifica si el usuario registrado coincide con el password
      //veo si la password conincide, aplico método compareSync a bcryptjs,  dos param para comparar (el pass legible que envía el user y el pass hasheado)
      if(!matcheoPass){
          return res.json({success:false, message: "El usuario y/o la contraseña no existe/n"})
      }
      var token = jwtoken.sign({...userExist},process.env.SECRET_KEY,{})
      return res.json({success: true, response:{token,firstName:userExist.firstName, urlPic:userExist.urlPic, email:userExist.email,_id:userExist._id}})
      // respondo al frontEnd con un objeto que tiene el token, nombre de usuario y foto
   },
   preserveLog:  (req, res) =>{
      const {firstName,urlPic,_id} = req.user
      console.log(req)
      res.json({
         success: true, 
         response: {
            token: req.body.token, 
            firstName,
            urlPic,
            _id
         }})
      },
   //gets user metodos
   getCustomers: async (req,res) =>{
      try {
         const usersCustomers = await UserConsumer.find().populate('idUserBase')
         return res.json({success:true, respuesta:usersCustomers})
       } catch (e) {
         return res.json({success:false, respuesta: 'Ha ocurrido un error en el proceso: '+e})
       }
   },
   getProviders: async (req,res) =>{
      try {

         const usersProviders = await UserProvider.find()
         .populate('idUserBase')
         .populate('idProfession')
         .populate({
            path:'review',
            populate:{
              path:'idUser',
              model:'userConsumer'
            }
          })
          .populate({
            path:'review.idUser',
            populate:{
              path:'idUserBase',
              model:'userBase'
            }
          })
         
         return res.json({success:true, respuesta:usersProviders})
       } catch (e) {
         return res.json({success:false, respuesta: 'Ha ocurrido un error en el proceso: '+e})
       }
   }
}

module.exports = userController
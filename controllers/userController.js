const UserBase = require('../models/UserBase')
const UserProvider = require('../models/UserProvider')
const UserConsumer = require('../models/UserConsumer')
const bcryptjs = require('bcryptjs');
const jwtoken = require('jsonwebtoken');
const userBase = require('../models/UserBase');


const userController = {
   addUserProvider: async (req, res) =>{
      // Desestructuro la req del front-end
      const {firstName, lastName, urlPic, email, phone, password, country,
      website, valoration, review, rol, idProfession} = req.body
      
      const hashedPassword =  bcryptjs.hashSync(password, 10)
      const userBase = new UserBase ({
         firstName, lastName, urlPic, email, phone, password: hashedPassword, country
      })
      // Guardo en la base de datos el usuario base y luego lo voy a popular en el idUserBase para tener el resto de los datos      
      try{
         const newUserBase = await userBase.save()
         
         
         const idUserBase = newUserBase
         const userProvider = new UserProvider({
            idUserBase, website, valoration, review, rol, idProfession
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
                firstName:  userBase.firstName,
                urlPic: userBase.urlPic,
                email: userBase.email
               }})
         })
         .catch(error => {return res.json({success:false, error})})
      }
      catch{
         return res.json({success:false})
      }      
   },
   addUserCustomer: async (req, res) =>{
      const {firstName, lastName, urlPic, email, phone, password, country} = req.body
         
         const hashedPassword =  bcryptjs.hashSync(password, 10)
         const userBase = new UserBase ({
            firstName, lastName, urlPic, email, phone, password:hashedPassword, country
         })
         // Guardo en la base de datos el usuario base y luego lo voy a popular en el idUserBase para tener el resto de los datos         
         try{
            const newUserBase = await userBase.save()

            const idUserBase = newUserBase._id
            const userConsumer = new UserConsumer({
               idUserBase
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
                     firstName:  userBase.firstName,
                     urlPic: userBase.urlPic,
                     email: userBase.email
                  }})
            })
            .catch(error => {return res.json({success:false, error})})
         }
         catch{
            return res.json({success:false})
         }
         
   },
   login: async (req,res) => {
      // desestructuro del front la req 
      const {firstName, password} = req.body
      const userRegister = await userBase.findOne({firstName:firstName}) // verifica que el usuario exista y lo guarda en variable, 
      if (!userRegister) {
          return res.json ({success: false, message: "The username and / or password does not exist"})
      }

      const matcheoPass = bcryptjs.compareSync(password, userRegister.password) // verifica si el usuario registrado coincide con el password
      //veo si la password conincide, aplico método compareSync a bcryptjs,  dos param para comparar (el pass legible que envía el user y el pass hasheado)
      if(!matcheoPass){
          return res.json({success:false, message: " Password does not match"})
      }
      var token = jwtoken.sign({...userRegister},process.env.SECRET_KEY,{})
      return res.json({success: true, response:{token,firstName:userRegister.firstName, picture:userRegister.urlPic}})
      // respondo al frontEnd con un objeto que tiene el token, nombre de usuario y foto
   },
   preserveLog:  (req, res) =>{
      console.log('contolador de persistencia')
      console.log(req.body)
      res.json({
         success: true, 
         response: {
           token: req.body.token, 

         }})
      }
   
}

module.exports = userController
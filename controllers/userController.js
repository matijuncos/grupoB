const UserBase = require('../models/UserBase')
const UserProvider = require('../models/UserProvider')
const UserConsumer = require('../models/UserConsumer')
const bcryptjs = require('bcryptjs');
const jwtoken = require('jsonwebtoken');


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
                firstName: userBase.firstName,
                urlPic: userBase.urlPic,
                email: userBase.email,
                _id:idUserBase._id
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
      const userRegister = await UserBase.findOne({email:email}) // verifica que el usuario exista y lo guarda en variable, 
      if (!userRegister) {
          return res.json ({success: false, message: "El usuario y/o la contraseña no existe/n"})
      }
      const matcheoPass = bcryptjs.compareSync(password, userRegister.password) // verifica si el usuario registrado coincide con el password
      //veo si la password conincide, aplico método compareSync a bcryptjs,  dos param para comparar (el pass legible que envía el user y el pass hasheado)
      if(!matcheoPass){
          return res.json({success:false, message: "El usuario y/o la contraseña no existe/n"})
      }
      var token = jwtoken.sign({...userRegister},process.env.SECRET_KEY,{})
      return res.json({success: true, response:{token,firstName:userRegister.firstName, urlPic:userRegister.urlPic, email:userRegister.email,_id:userRegister._id}})
      // respondo al frontEnd con un objeto que tiene el token, nombre de usuario y foto
   },
   preserveLog:  (req, res) =>{
      const {firstName,urlPic,_id} = req.user
      console.log(req.user)
      res.json({
         success: true, 
         response: {
            token: req.body.token, 
            firstName,
            urlPic,
            _id
         }})
      }
   
}

module.exports = userController
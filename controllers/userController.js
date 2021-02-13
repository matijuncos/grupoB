const UserBase = require('../models/UserBase')
const UserProvider = require('../models/UserProvider')

const userController = {
   addUserProvider: async (req, res) =>{
      // Desestructuro la req del front-end
      const {firstName, lastName, urlPic, email, phone, password, country,
      website, valoration, review, rol, idProfession} = req.body

      const userBase = new UserBase ({
         firstName, lastName, urlPic, email, phone, password, country
      })
      // Guardo en la base de datos el usuario base y luego lo voy a popular en el idUserBase para tener el resto de los datos
      var newUserBase = await userBase.save()
      try{
         var idUserBase = newUserBase
         console.log(idUserBase)
         var userProvider = new UserProvider({
            idUserBase, website, valoration, review, rol, idProfession
         })
      }
      catch{
         return res.json({success:false})
      }
      
      userProvider.save()
      .then(async newUserProvider =>{
         // Populo el UserBase dentro del UserProvider para obtener el usuario mas sus datos
         const populateUserProvider = await UserProvider.findById(newUserProvider._id).populate('idUserBase')
         res.json({success:true, respuesta:populateUserProvider})
      })
      .catch(error => {return res.json({success:false, error})})
   },
   addUserCustomer:(req, res) =>{
      const {firstName, lastName, urlPic, email, phone, password, country} = req.body
   
         const userBase = new UserBase ({
            firstName, lastName, urlPic, email, phone, password, country
         })
         // Guardo en la base de datos el usuario base y luego lo voy a popular en el idUserBase para tener el resto de los datos
         var newUserBase = userBase.save()
   
         const idUserBase = newUserBase._id
   
         const userCustomer = new UserCustomer({
            idUserBase
         })
         userCustomer.save()
         .then(async newUserCustomer =>{
            // Populo el UserBase dentro del UserProvider para obtener el usuario mas sus datos
            const populateUserCustomer = await UserCustomer.findById(newUserCustomer._id).populate('idUserBase')
            res.json({success:true, respuesta:populateUserCustomer})
         })
         .catch(error => {return res.json({success:false, error})})
   }
}

module.exports = userController
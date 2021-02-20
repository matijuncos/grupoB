const UserBase = require('../models/UserBase')
const UserProvider = require('../models/UserProvider')
const UserConsumer = require('../models/UserConsumer')
const Work =require('../models/Work')
const bcryptjs = require('bcryptjs');
const jwtoken = require('jsonwebtoken');
const nodemailer = require("nodemailer");

const userController = {
   addUserProvider: async (req, res) =>{
      // Desestructuro la req del front-end
      var {firstName, lastName, email, phone, password, country, 
         arrayValoration, review, idProfession, rol} = req.body
      var arrayWorks=[]

      if(req.body.idUserBase !== undefined){
         const userBaseExists = await UserBase.findOne({_id: req.body.idUserBase})
         firstName=userBaseExists.firstName, 
         lastName=userBaseExists.lastName,
         email=userBaseExists.email,
         phone=userBaseExists.phone,
         password=userBaseExists.password
         arrayWorks=userBaseExists.arrayWorks
      }
      const hashedPassword =  bcryptjs.hashSync(password, 10)
      const userBase = new UserBase ({
         firstName, lastName, email, phone, password: hashedPassword, country, rol
      })
      // Guardo en la base de datos el usuario base y luego lo voy a popular en el idUserBase para tener el resto de los datos      
      try{
       //File urlPic
       const {fileUrlPic,fileWorkPic,fileWorkPic2}=req.files
       if(fileUrlPic.mimetype.indexOf('image/jpeg')!==0&&fileWorkPic.mimetype.indexOf('image/jpeg')!==0&&fileWorkPic2.mimetype.indexOf('image/jpeg')!==0){
          return res.json({success:false,respuesta:"El formato de la imagen tiene que ser JPG, JPEG, BMP ó PNG."})
       }
       const extPicUrl=fileUrlPic.name.split('.',2)[1]
       fileUrlPic.mv(`${__dirname}/../frontend/public/assets/usersPics/${userBase._id}.${extPicUrl}`,error =>{
             if(error){
                return res.json({success:false,respuesta:"Intente nuevamente..."})
             }
       })
       userBase.urlPic=`./assets/usersPics/${userBase._id}.${extPicUrl}`
       //WorkPic1
       const extPicWork=fileWorkPic.name.split('.',2)[1]
       fileWorkPic.mv(`${__dirname}/../frontend/public/assets/usersPics/${userBase._id}1.${extPicWork}`,error =>{
             if(error){
                return res.json({success:false,respuesta:"Intente nuevamente..."})
             }
       })
      //WorkPic2
       const extPicWork2=fileWorkPic2.name.split('.',2)[1]
       fileWorkPic2.mv(`${__dirname}/../frontend/public/assets/usersPics/${userBase._id}2.${extPicWork2}`,error =>{
             if(error){
                return res.json({success:false,respuesta:"Intente nuevamente..."})
             }
       })
         const newUserBase = await userBase.save()
         const idUserBase = newUserBase
         arrayWorks.push(`./assets/usersPics/${userBase._id}1.${extPicWork}`)
         arrayWorks.push(`./assets/usersPics/${userBase._id}2.${extPicWork2}`)
         const userProvider = new UserProvider({
            idUserBase: idUserBase._id, arrayValoration, review, idProfession, arrayWorks
         })
         userProvider.save()
         .then(async newUserProvider =>{
            // Populo el UserBase dentro del UserProvider para obtener el usuario mas sus datos
            const populateUserProvider = await newUserProvider.populate('idUserBase').execPopulate()
            var token = jwtoken.sign({...populateUserProvider}, process.env.SECRET_KEY, {})
            return res.json({success:true,response:
               {token,
                firstName: userBase.firstName,
                urlPic: userBase.urlPic,
                email: userBase.email,
                idUser: userProvider._id,
               _id: idUserBase._id,
               rol: userBase.rol
               }})
         })
         .catch(error => {return res.json({success:false, error})})
      }
      catch{
         return res.json({success:false, error:{"error":"Fallo la creacion del usuario base"}})
      }      
   },
   addUserCustomer: async (req, res) =>{
      const {firstName, lastName, urlPic, email, phone, password, country, rol, google, googlePic} = req.body
      const emailExists = await UserBase.findOne({email: email})
      if (emailExists){ return res.json({success: false, message: "Este correo ya esta siendo usado."})}
      else{
            const hashedPassword =  bcryptjs.hashSync(password, 10)
            const userBase = new UserBase ({
            firstName, lastName, urlPic, email, phone, password:hashedPassword, country, rol
            })

            //File urlPic
            if(google !== 'true'){
               const {fileUrlPic}=req.files
               if(fileUrlPic.mimetype.indexOf('image/jpeg')!==0){
                  return res.json({success:false,respuesta:"El formato de la imagen tiene que ser JPG,JPEG,BMP ó PNG."})
               }
               const extPic=fileUrlPic.name.split('.',2)[1]
               fileUrlPic.mv(`${__dirname}/../frontend/public/assets/usersPics/${userBase._id}.${extPic}`,error =>{
                  if(error){
                     return res.json({success:false,respuesta:"Intente nuevamente..."})
                  }
               })
               userBase.urlPic=`./assets/usersPics/${userBase._id}.${extPic}`
            }else{
               userBase.urlPic=googlePic
            }
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
                     const populateUserConsumer = await newUserConsumer.populate('idUserBase').execPopulate()
                     var token = jwtoken.sign({...populateUserConsumer}, process.env.SECRET_KEY, {})
                     return res.json({
                        success:true, 
                        response:{
                           token,
                           firstName: userBase.firstName,
                           urlPic: userBase.urlPic,
                           email: userBase.email,
                           idUser: userConsumer._id,
                           _id: newUserBase._id,
                           rol: userBase.rol
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
                     var userConsult=await UserConsumer.findOne({idUserBase:userExist._id})
                     if (!userConsult) {
         userConsult=await UserProvider.findOne({idUserBase:userExist._id})
      }
      console.log(userConsult)
      var token = jwtoken.sign({...userExist},process.env.SECRET_KEY,{})
      return res.json({success: true, 
         response:{
            token,
            firstName:userExist.firstName, 
            urlPic:userExist.urlPic, 
            email:userExist.email,
            idUser:userConsult._id,
            _id:userExist._id,
            rol: userExist.rol
         }})
      // respondo al frontEnd con un objeto que tiene el token, nombre de usuario y foto
   },
   preserveLog:  (req, res) =>{
      const {firstName,urlPic,_id, rol} = req.user
      return res.json({
         success: true, 
         response: {
            token: req.body.token, 
            firstName,
            urlPic,
            idUser:req.body.idUser,
            _id,
            rol
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
   },
   sendMail:async(req,res)=>{
      
      console.log(req.body.idWork)
      var message=""
      const idWork=req.body.idWork
      const action = req.body.action
      
      const work=await Work.findOne({'_id':idWork}).populate('idUserConsumer').populate('idUserProvider').populate({path:'idUserConsumer',populate:{path:'idUserBase',model:'userBase'}}).populate({path:'idUserProvider',populate:{path:'idUserBase',model:'userBase'}})
      userConsumer=work.idUserConsumer.idUserBase
      userProvider=work.idUserProvider.idUserBase
      var to=`${userConsumer.email},${userProvider.email}`
      const orden=`${work._id.toString().slice(2,7)}${userConsumer.lastName.toString().slice(0,3)}`
      var subject= work.state===1 ? "Se ha abierto con exito la solicitud." : work.state===2  ? "La propuesta de trabajo ha sido aceptado." :work.state===3 && "El trabajo se ha terminado."
      if (action === 'Delete'){
         subject= 'El profesional rechazó su solicitud'
         message= `<p>El proveedor <span>${userProvider.lastName} ${userProvider.firstName}</span>, ha rechazado su solicitud. Intente con otro profesional.` 
         to=userConsumer.email
      }else{
         switch (work.state) {
            case 1:
               message=`<p>El cliente <span>${userConsumer.lastName} ${userConsumer.firstName}</span>, te ha enviado una solicitud de trabajo <span>Nº-${orden}</span>, por favor revisala lo antes posible.</p>
               <p class="firma">¡Tu mejor elección!<br>Equipo de Instant Solution</p>
               `
               break;
            case 2:
               message=`<p>El proveedor <span>${userProvider.lastName} ${userProvider.firstName}</span>, ha aceptado la solicitud de trabajo <span>Nº-${orden}</span>, pronto nuestro profesional te dara soporte.</p>
               <p class="firma">¡Tu mejor elección!<br>Equipo de Instant Solution</p>
               `
               to=userConsumer.email
               break;
            case 3:
               message=`<p>La orden de trabajo Nº-${orden} ha sido finalizada con exito.</p>
               <p class="firma">¡Tu mejor elección!<br>Equipo de Instant Solution</p>
               `
               break;
            default:
               break;
         }
      }
      const html=`
         <html lang="es">
         <head>
            <style>
            .contenedor,.cabecera,.footer{
               width: 100%;
            }
            .cabecera,.footer{
               background-color: rgb(216,0,27);
               font-weight: bold;
            }
            .cuerpo{
               background-color: rgb(250, 250, 250);
               padding: 2vw;
            } 
            .cuerpo span{
               font-weight:bold;
            }
            .cuerpo p{
               font-size:2vw
            }
            .cabecera h1,.footer h2{
               color:rgb(250, 250, 250);
               text-align:center;
               padding: 1.5vh 0
            }
            .cabecera h1{
               font-size:2.5vw
            }
            .cabecera{
               display:flex;
               justify-content:space-around;
               align-items:center
            }
            .cajaLogo{
               min-width:8vw;
               min-height:8vw;
               padding:1vw;
               border-radius:2vw
            }
            .logo{
               background-image:url("https://lh6.googleusercontent.com/g35_8SERvnINhfsJSvezrQwIy-y29g1nqOG7b8130EqGjM50fwaBorjHW5dsYAkbMXptMBJJa1Q8-AnVFUGJ=w1868-h942-rw");
               background-repeat:no-repeat;
               background-position:center;
               background-size:cover;
               min-width:100%;
               min-height:100%
            }
            .footer h2{
               font-size:1.5vw
            }
            .firma{
               text-align:right
            }
            </style>
         </head>
         <body>
         <section class="contenedor">
            <div class="cabecera">
               <div class="cajaLogo"><div class="logo"></div></div>
               <div><h1>Instant Solution</h1></div>
            </div>
    <div class="cuerpo">${message}</div>
         <div class="footer">
            <h2>¡Estamos para ayudarte!</h2>
         </div>
      </section>
      </body>
      </html>`
      let transporter = nodemailer.createTransport({
         host: "smtp.gmail.com", 
         port: 587,
         secure: false,
         auth: {
           user:'Instantsolutionproyect@gmail.com', 
           pass:'Instant2021', 
         },
       });
       await transporter.sendMail({
         from: '"Instant Solution" <Instantsolutionproyect@gmail.com>',
         to:to,
         subject:subject, 
         html:html, 
       },(error, info) => {
         if (error) {
            return res.json({success:false, respuesta: 'Ha ocurrido un error en el envio del mensaje.'})
         }else{
            return res.json({success:true, respuesta: 'Se ha enviado el correo electrónico correctamente.'})
         }
      })
   },
   sendComment:async(req,res)=>{
      console.log('llegué a mandar commentarios controller')
      console.log(req.body)
      const {idProvider,idUser,comment}=req.body
      await UserProvider.findOneAndUpdate(
         {_id:idProvider},
         { $push: {'review': {idUser:idUser,comment:comment}}},{new: true})
         .then(async comment=>res.json({success:true, respuesta: comment}))
         .catch(e=>res.json({success:false, error:"Error en la DB"}))
   },
   delComment:async(req,res)=>{
      console.log('llegué a borrar commentarios controller')
      console.log(req.body)
      const {idUser,commentId}=req.body
      await UserProvider.findOneAndUpdate(
         {_id:idUser},
         { $pull: {'review': {_id: commentId}} })
         .then(async comment=>res.json({success:true, respuesta: comment}))
         .catch(e=>res.json({success:false, error:"Error en la DB"}))
   },
   editComment:async(req,res)=>{
      console.log('controlador de update comment')
       console.log(req.body)
      const {commentId, comment}=req.body
      await UserProvider.findOneAndUpdate(
         {'review._id':commentId},
         { '$set': {'review.$.comment': comment}},
         {new: true}
         )
         .then(async comment=>res.json({success:true, respuesta: comment}))
         .catch(e=>res.json({success:false, error:"Error en la DB"}))
   },
   rank: async (req, res) =>{
      const providerId = req.body.id
      const value = parseInt(req.body.value)
      await UserProvider.findOneAndUpdate(
         {_id: providerId},
         {$push: {'arrayValoration': value}},
         {new: true}
      )
      .then(async rankedWork => res.json({
         success: true,
         respuesta: rankedWork
      }))
      .catch(error => res.json({
         success: false,
         error: "Error while modifying in database."
      }))
   }
}
module.exports = userController
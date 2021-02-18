const Work = require('../models/Work')

const WorkController = {
   addWork:(req,res) =>{
     console.log(req.body)
      const {idUserConsumer, idUserProvider, state, comment} = req.body
      console.log(req.body)
      const newWork = new Work({
        idUserConsumer, idUserProvider, state, comment
      })
      console.log(newWork)
      newWork.save()
      .then(newWork =>{return res.json({success:true, response:newWork})})
      .catch(error => {return res.json({success:false, error})})
   },
   getWork:(req,res) =>{
     const id=req.params.id
      Work.find({_id:id})
      .then(work => {return res.json({success:true, response:work})})
      .catch(error => {return res.json({success:false, error})})
   },
   getWorks:(req,res) =>{
      Work.find()
      .populate('idUserProvider')
         .populate('idUserConsumer')
         .populate({
            path:'idUserProvider',
            populate:{
              path:'idUserBase',
              model:'userBase'
            }
          })
         .populate({
            path:'idUserConsumer',
            populate:{
              path:'idUserBase',
              model:'userBase'
            }
          })
      .then(work => {return res.json({success:true, response:work})})
      .catch(error => {return res.json({success:false, error})})
   },
   delWork:async(req,res) =>{
     const idForDelete=req.params.id
     try {
      const data = await Work.findOneAndRemove({_id:idForDelete})
      return res.json({success:true, respuesta:data})
    } catch (e) {
      return res.json({success:false, respuesta: 'Ha ocurrido un error en la eliminacion.'})
    }
   },
   changeState:async(req,res)=>{
     const idWork=req.body.id
     try {
      const work= await Work.find({'_id':idWork})
      const newState=work[0].state+1
      const respuesta= await Work.updateOne(
         {'_id':idWork},
         {'$set' : {'state':newState}}
        )
        return res.json({success:true, respuesta:respuesta})
     } catch (error) {
      return res.json({success:false, respuesta: 'Ha ocurrido un error en la modificacion del estado'})
    }
   }
}
module.exports = WorkController
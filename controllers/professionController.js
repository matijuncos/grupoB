const Profession = require('../models/Profession')

const ProfessionController = {
   addProfession:(req,res) =>{
<<<<<<< HEAD
      const {type,urlPic, descriptions} = req.body
      const newProfession = new Profession({
         type,urlPic, descriptions
=======
      const {type, urlPic, descriptions} = req.body
      const newProfession = new Profession({
         type, urlPic, descriptions
>>>>>>> e01757b09e5d56bb5f16fd8b603db004ebaf0614
      })
      newProfession.save()
      .then(newProfession =>{return res.json({success:true, response:newProfession})})
      .catch(error => {return res.json({success:false, error})})
   },
   getProfession:(req,res) =>{
      Profession.find()
      .then(profession => {return res.json({success:true, response:profession})})
      .catch(error => {return res.json({success:false, error})})
   }
}

module.exports = ProfessionController
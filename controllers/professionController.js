const Profession = require('../models/Profession')

const ProfessionController = {
   addProfession:(req,res) =>{
      const {type, descriptions} = req.body
      const newProfession = new Profession({
         type, descriptions
      })
      newProfession.save()
      .then(newProfession =>{return res.json({success:true, response:newProfession})})
      .catch(error => {return res.json({success:true, error})})
   },
   getProfession:(req,res) =>{
      Profession.find()
      .then(profession => {return res.json({success:true, response:profession})})
      .catch(error => {return res.json({success:false, error})})
   }
}

module.exports = ProfessionController
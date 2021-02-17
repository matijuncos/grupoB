const mongoose = require("mongoose")

const workSchema = new mongoose.Schema({
  idUserConsumer:{type: mongoose.Schema.ObjectId, ref: "userConsumer"},
  idUserProvider:{type: mongoose.Schema.ObjectId, ref: "userProvider"},
  state: {type:Number, required:false, default:1},
  comment:{
    consumer:{type:String,required:false,default:''},
    provider:{type:String,required:false,default:''}
  }
  }) 

const work = mongoose.model("work",workSchema) 

module.exports = work
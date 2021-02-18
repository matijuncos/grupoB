const mongoose = require("mongoose")
// schema usuario consumidor, responderá al front con propiedades populadas del modelo usuario base

const userConsumerSchema = new mongoose.Schema({
<<<<<<< HEAD
    idUserBase: {type: mongoose.Schema.ObjectId, ref: "userBase"},
=======
    idUserBase: {type: mongoose.Schema.ObjectId, ref: "userBase"}    
>>>>>>> cab67fed34acfa4185c72bc609213c00e7dbad43
}) 

const userConsumer = mongoose.model("userConsumer",userConsumerSchema) 

module.exports = userConsumer
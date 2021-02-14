const mongoose = require("mongoose")

const userConsumerSchema = new mongoose.Schema({
    idUserBase: {type: mongoose.Schema.ObjectId, ref: "userBase"},

}) 

const userConsumer = mongoose.model("userConsumer",userConsumerSchema) 

module.exports = userConsumer
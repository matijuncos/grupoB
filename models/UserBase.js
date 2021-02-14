const mongoose = require("mongoose")
// Schema base de usuarios, tanto modelo provider como consumer populan con este modelo

const userBaseSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    urlPic: String,
    email: String,
    phone: String,
    password: String,
    country: String,

}) 

const userBase = mongoose.model("userBase", userBaseSchema) 

module.exports = userBase
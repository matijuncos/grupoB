const mongoose = require("mongoose")

const reviewSchema = new mongoose.Schema({
    comment: String
})

const userProviderSchema = new mongoose.Schema({
    idUserBase: {type: mongoose.Schema.ObjectId, ref: "userBase"},
    webSite: String,
    valoration: Number,
    review: [reviewSchema],
    rol: String,
    // idProfession: {type: mongoose.Schema.ObjectId, ref: "heading"}, // popula model rubro


}) 

const userProvider = mongoose.model("userProvider",userProviderSchema) 

module.exports = userProvider

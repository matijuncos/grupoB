const mongoose = require("mongoose")
//schema usuario proveedor (profesional) consume algunas propiedades del modelo user base y se agregarán otras, propias del modelo userprovider

const reviewSchema = new mongoose.Schema({
    idUser:{type: mongoose.Schema.ObjectId, ref: "userConsumer"},
    urlPic:{type:String,required:true},
    comment: String
})
// las review tienen su propio schema, el mismo será llamado dentro del schema userprovider, propiedad review.
const userProviderSchema = new mongoose.Schema({
    idUserBase: {type: mongoose.Schema.ObjectId, ref: "userBase"},
    webSite: String,
    arrayValoration:[{type:Number,default:0}],
    review: [reviewSchema],
    rol: String,
    arrayWorks:[String],
    idProfession: {type: mongoose.Schema.ObjectId, ref: "profession"}, // popula model rubro
}) 

// el schema userProvider popula con el modelo rubro para consumir las profesiones dentro del mismo. 

const userProvider = mongoose.model("userProvider",userProviderSchema) 

module.exports = userProvider
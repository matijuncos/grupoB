const mongoose = require("mongoose")


mongoose.connect(process.env.MONGODB, { // cambiar contraseña mongo
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false

})
    .then(() => console.log("Database connected"))
    .catch(error => console.log(error))
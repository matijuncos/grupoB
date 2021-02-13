<<<<<<< HEAD
const express = require("express") 
require("dotenv").config()
const cors = require("cors") 
const router = require("./routes/index")
require("./config/database")

const app = express()



app.use(cors()) 
app.use(express.json()) 

app.use("/api", router)



app.listen(4000, () => console.log("App listening on port 4000")) 
=======
const express = require('express')
const cors = require('cors')

const app = express()
require('dotenv').config()

const router = require('./routes')
require('./config/database')

app.use(cors())
app.use(express.json())

app.use('/api', router)

app.listen(4000, ()=> console.log('app listening in the port 4000'))
>>>>>>> e2b47d631f704ea967f40028a8807d203bf18e7a

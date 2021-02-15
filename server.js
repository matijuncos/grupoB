const express = require('express')
require('dotenv').config()
const cors = require('cors')
const router = require('./routes')
const app = express()

<<<<<<< HEAD
const router = require('./routes/index')
=======

>>>>>>> a515f23a0c86e1cc2ad9c2926cc3c4c70cba07cb
require('./config/database')

app.use(cors())
app.use(express.json())

app.use('/api', router)

app.listen(4000, ()=> console.log('app listening in the port 4000'))

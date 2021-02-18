const express = require('express')
require('dotenv').config()
const cors = require('cors')
const router = require('./routes')
const app = express()
const fileUpload = require('express-fileupload')

require('./config/database')

app.use(express.json())
app.use(cors())
app.use(fileUpload())

app.use('/api', router)

app.listen(4000, ()=> console.log('app listening in the port 4000'))

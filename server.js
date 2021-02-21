const express = require('express')
require('dotenv').config()
require('./config/database')
const cors = require('cors')

const router = require('./routes')
const app = express()
const fileUpload = require('express-fileupload')


app.use(express.json())
app.use(cors())
app.use(fileUpload())

app.use('/api', router)

const port = process.env.PORT
const host = process.env.HOST || '0.0.0.0'

app.listen(port, host, ()=> console.log('app listening'))

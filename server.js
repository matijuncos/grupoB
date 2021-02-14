const express = require('express')
const cors = require('cors')

const app = express()
require('dotenv').config()

const router = require('./routes/index')
require('./config/database')

app.use(cors())
app.use(express.json())

app.use('/api', router)

app.listen(4000, ()=> console.log('app listening in the port 4000'))

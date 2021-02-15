const express = require('express')
require('dotenv').config()
const cors = require('cors')
const router = require('./routes')
const app = express()

require('./config/database')

app.use(cors())
app.use(express.json())

app.use('/api', router)

app.listen(4000, ()=> console.log('app listening in the port 4000'))

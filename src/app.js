const express = require('express')
const app = express();
const morgan = require('morgan')
const cors = require('cors')
const dotenv = require('dotenv')
const confessionRoute = require('./routes/confession.routes')

dotenv.config()
app.use(morgan('dev'))
app.use(cors('*'))
app.use(express.json())
app.use(confessionRoute)

module.exports = app
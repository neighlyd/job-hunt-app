require ('./db/mongoose')
const express = require('express')
const cors = require('cors')

const jobRouter = require('./routes/job')
const userRouter = require('./routes/user')

let app = express()

app.use(express.json())
// Remember to set up CORS whitelist for production.
// const corsOptions = require('./config/cors)
// app.use(cors(corsOptions))
app.use(cors())

app.use(userRouter)
app.use(jobRouter)

module.exports = app
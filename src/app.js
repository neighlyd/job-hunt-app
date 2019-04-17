require ('./db/mongoose')
const express = require('express')

const jobRouter = require('./routes/job')
const userRouter = require('./routes/user')

let app = express()

app.use(express.json())
app.use(userRouter)
app.use(jobRouter)

module.exports = app
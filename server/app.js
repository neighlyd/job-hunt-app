require ('./db/mongoose')
const path = require('path')
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

if (process.env.NODE_ENV === 'production') {    
    app.use(express.static(path.join(__dirname, 'client/build')))
    
    app.get('*', (req, res) => {
        res.sendfile(path.join(__dirname = 'frontend/build/index.html'))
    })
}

module.exports = app
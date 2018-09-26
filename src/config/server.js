//===============================
//  Create instances
//===============================
const express = require("express")
const server = express()
const bodyParser = require("body-parser")
const morgan = require("morgan")
const mongoose = require("mongoose")
const path = require("path")

const config = require("./config")

//===============================
// Configuration
//===============================
const port = process.env.PORT || 3000
const allowCors = require("./cors")

server.set('superSecret', config.secret)
// Configs Mongoose for new MongoDB
const OPTIONS = {
    useMongoClient: true,
    keepAlive: 300000,
    connectTimeoutMS: 30000,
    reconnectTries: Number.MAX,
    reconnectInterval: 1000
};

// Connecting on mongoDB
mongoose.connect(config.database, OPTIONS)

// Configuration morgan from dev
server.use(morgan('dev'))

// Middlewares body-parser
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())

//  Static Middleware
// server.use('/static', express.static('public'))
// path.join(__dirname + '../../../public')

// abilite cors
server.use(allowCors)

//route test
server.get('/vendeu-me', (req, res) => {
    res.send("Hello deploy its ok!")
})

//===============================
//  Start Server
//===============================
server.listen(port, () => console.log(`Server is running on port: ${port}`))

module.exports = server
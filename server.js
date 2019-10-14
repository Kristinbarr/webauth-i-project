const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const userRouter = require('./users/userRouter')

const server = express()

// global middleware
server.use(helmet())
server.use(express.json())
server.use(cors())
server.use('/api', logger, userRouter)

// custom logger middleware
function logger(req, res, next) {
  console.log(`${req.method} to ${req.url} at ${new Date().toISOString()}`)
  next()
}

server.get('/', (req, res) => {
  res.send("It's alive!")
})

module.exports = server

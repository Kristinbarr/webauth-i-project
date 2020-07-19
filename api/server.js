const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const userRouter = require('../users/userRouter')
const session = require('express-session')

const server = express()


const sessionConfig = {
  name: 'banana', // default name is 'sid'
  secret: 'keep it secret!',
  cookie: {
    maxAge: 1000 * 30, // milliseconds, this is set at 30 seconds
    secure: false, // request w http? https in production(switch true)
    httpOnly: true, // cookie can't accessed from JS, never from client
  },
  resave: false, //recreate session if not changed?
  saveUninitialized: false, // GDPR laws against setting cookies automatically
}

// global middleware
server.use(helmet())
server.use(express.json())
server.use(cors())
server.use(session(sessionConfig))

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

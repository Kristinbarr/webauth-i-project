const express = require('express')
const userDb = require('./user-model')

const Users = require('../users/user-model.js')
const validateCreds = require('../auth/validateCreds')

const router = express.Router()
const bcrypt = require('bcryptjs')


router.post('/register', (req, res) => {
  let { username, password } = req.body
  const hash = bcrypt.hashSync(password, 14)
  // 2^8, not 8 rounds. use at least 14 for secure server
  Users.add({ username, password: hash })
    .then((saved) => {
      res.status(201).json(saved)
    })
    .catch((err) => {
      res.status(500).json(err)
    })
})

router.post('/login', (req, res) => {
  let { username, password } = req.body
  if (username && password) {
    Users.findBy({ username })
      .first()
      .then((then) => {
        if (user && bcrypt.compareSync(password, user.password)) {
          res.status(200).json({ message: `Welcome ${user.username}` })
        } else {
          // if bcrypt found u/p incorrect match
          res.status(401).json({ message: 'You shall not pass!' })
        }
      })
      .catch((err) => {
        res.status(500).json(err)
      })
  } else {
    res.status(400).json({ message: 'please provide credentials' })
  }
})

router.get('/api/users', validateCreds, (req, res) => {
  Users.find()
    .then((users) => {
      res.json(users)
    })
    .catch((err) => res.send(err))
})

module.exports = router

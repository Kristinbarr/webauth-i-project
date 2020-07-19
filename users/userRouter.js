const express = require('express')

const Users = require('./user-model.js')
const protected = require('../auth/protected')

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
      .then((user) => {
        if (user && bcrypt.compareSync(password, user.password)) {
          req.session.user = user
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

router.get('/users', protected, (req, res) => {
  Users.find()
    .then((users) => {
      res.json(users)
    })
    .catch((err) => res.send(err))
})

router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      res.status(200).json({message: "logged out"})
    })
  } else {
    res.status(200).json({ message: "already logged out"})
  }
})

module.exports = router

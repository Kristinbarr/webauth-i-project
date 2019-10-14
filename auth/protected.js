const Users = require('../users/user-model')
const bcrypt = require('bcryptjs')

module.exports = function protected(req, res, next) {
  let { username, password } = req.headers

  if (username && password) {
    Users.findBy({ username })
      .first()
      .then((user) => {
        console.log('user: ',user)
        if (user && bcrypt.compareSync(password, user.password)) {
          console.log('here')
          next()
        } else {
          res.status(401).json({ message: 'You cannot pass!!' })
        }
      })
      .catch((error) => {
        res.status(500).json(error)
      })
  } else {
    res.status(400).json({ message: 'please provide credentials' })
  }
}

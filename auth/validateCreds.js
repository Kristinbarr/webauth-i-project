module.exports = function validateCreds(req, res, next) {
  const password = req.headers.password

  if (password && password) {
    next()
  } else {
    // res.status(401).json({ you: 'shall not pass!' })
    next('you shall pass')
  }
}

const server = require('./api/server')

const port = process.env.PORT || 5002

server.listen(port, () => {
  console.log(`\n* Server Running on http://localhost:${port} *\n`)
})

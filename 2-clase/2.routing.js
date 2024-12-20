const http = require('node:http')
const dittoJson = require('./pokemon/ditto.json')
// Jsn obtain from this API https://pokeapi.co/api/v2/pokemon/ditto

const processRequest = (req, res) => {
  const { method, url } = req
  switch (method) {
    case 'GET':
      switch (url) {
        case '/pokemon/ditto':{
          res.setHeader('Content-Type', 'application/json;charset=utf-8')
          return res.end(JSON.stringify(dittoJson))
        }
        default:{
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          return res.end('<h1>404</h1>')
        }
      }
    case 'POST':
      switch (url) {
        case '/pokemon':{
          let body = ''
          req.on('data', chumb => {
            body += chumb.toString()
          })
          req.on('end', () => {
            const data = JSON.parse(body)
            res.writeHead(201, { 'Content-Type': 'application/json;charset=utf-8' })
            data.timestamp = Date.now()
            res.end(JSON.stringify(data))
          })
          break
        }
        default:{
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          return res.end('<h1>404</h1>')
        }
      }
  }
}
const server = http.createServer(processRequest)

server.listen(1234, () => {
  console.log(`server listening ${server.address().port}`)
})

const http = require('node:http')
const fs = require('node:fs')

const desiredPort = process.env.PORT ?? 1234
const processRequest = (req, res) => {
  // res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  if (req.url === '/') {
    res.statusCode = 200

    res.end('<h1>Bienvenido a mi página de inicio</h1>')
  } else if (req.url === '/imagen-super.png') {
    fs.readFile('./test-image.jpeg', (err, data) => {
      if (err) {
        res.statusCode = 500
        res.end('<h1> 500 Internal error</h1>')
      } else {
        res.setHeader('Content-Type', 'image/png')
        res.end(data)
      }
    })
  } else if (req.url === '/contacto') {
    res.end('<h1>Contacto</h1>')
  } else {
    res.end('<h1>404</h1>')
  }
  console.log('request received: ', req.url)
}
const server = http.createServer(processRequest)
server.listen(desiredPort, () => {
  // console.log(`server listening on port ${server.address().port}`)
  console.log(`server listening on port ${desiredPort}`)
})

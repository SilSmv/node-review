const express = require('express')
const ditto = require('./pokemon/ditto.json')

const app = express()

const PORT = process.env.PORT ?? 1235

app.disable('x-powered-by')
app.use(express.json())
// app.use((req, res, next) => {
// //   console.log('mi primer middleware')
//   if (req.method !== 'POST') return next()
//   if (req.headers['content-type'] !== 'application/json') return next()
//   let body = ''
//   req.on('data', chumb => {
//     body += chumb.toString()
//   })
//   req.on('end', () => {
//     const data = JSON.parse(body)
//     data.timestamp = Date.now()
//     req.body = data
//     return next()
//   })
// })

app.get('/pokemon/ditto', (req, res) => {
//   res.status(200).send('<h1>Mi página</h1>')
  // res.json({message: 'Hola mundo'})
  res.json(ditto)
})
app.post('/pokemon', (req, res) => {
//   let body = ''
//   req.on('data', chumb => {
//     body += chumb.toString()
//   })
//   req.on('end', () => {
//     const data = JSON.parse(body)
//     data.timestamp = Date.now()
//     res.status(201).json(data)
//   })
  res.status(201).json(req.body)
}

)

app.use((req, res) => {
  res.status(404).send('<h4>404</h4>')
})

app.listen(PORT, () => {
  console.log(`server listening ${PORT}`)
})

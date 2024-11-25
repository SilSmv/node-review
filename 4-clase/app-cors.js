import express, { json } from 'express'
// import movies from './movies.json' assert {type:'json'} //ya no existe esta sintaxis
// import movies from './movies.json' with  {type:'json'} //no la soporta

import { moviesRouter } from './routes/movies.js'
import { corsMiddleware } from './middlewares/cors.js'

// import fs from 'node:fs'
// const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8'))

const app = express()
app.disable('x-powered-by')
app.use(json())
app.use(corsMiddleware())

// normal methods get/head/post
// complex methods put/patch/delete

const PORT = process.env.PORT ?? 1234

app.get('/', (req, res) => {
  res.json({ message: 'hola mundo' })
})
// Todos los recursos que sean MOVIES se identifica con /movies
app.use('/movies', moviesRouter)

app.listen(PORT, () => {
  console.log(`server listening ${PORT}`)
})

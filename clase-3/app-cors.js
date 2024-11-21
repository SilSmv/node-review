const express = require('express')
const movies = require('./movies.json')
const cors = require('cors')
const crypto = require('node:crypto')
const { validateMovie, validatePartialMovie } = require('./schema/movies.js')

const app = express()
app.disable('x-powered-by')
app.use(express.json())
app.use(cors({
  origin: (origin, callback) => {
    const ACCEPTED_ORIGINS = [
      'http://localhost:8080',
      'http://localhost:1234',
      'http://movies.com'
    ]
    if (ACCEPTED_ORIGINS.includes(origin)) {
      return callback(null, true)
    }
    if (!origin) {
      return callback(null, true)
    }
    return callback(new Error('Not allowed by Cors'))
  }
}))

// normal methods get/head/post
// complex methods put/patch/delete

const PORT = process.env.PORT ?? 1234

app.get('/', (req, res) => {
  res.json({ message: 'hola mundo' })
})
// Todos los recursos que sean MOVIES se identifica con /movies
app.get('/movies', (req, res) => {
  const { genre } = req.query
  if (genre) {
    const filterdMovies = movies.filter(
      // movie => movie.genre.includes(genre) Case sensitive
      movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
    )
    return res.json(filterdMovies)
  }
  res.json(movies)
})
app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find(movie => movie.id === id)
  if (movie) return res.json(movie)
  res.status(404).json({ message: 'Movie not found' })
})
app.patch('/movies/:id', (req, res) => {
  const result = validatePartialMovie(req.body)

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }
  const updatedMovies = {
    ...movies[movieIndex],
    ...result.data
  }
  movies[movieIndex] = updatedMovies
  return res.json(updatedMovies)
})
app.post('/movies', (req, res) => {
  const result = validateMovie(req.body)

  if (result.error) {
    // 422 Unpresable entity
    return res.status(400).json({ message: JSON.parse(result.error.message) })
  }
  const newMovie = {
    id: crypto.randomUUID, // uuid v4
    ...result.data
  }

  movies.push(newMovie)
  res.status(201).json(newMovie)
})
app.delete('/movies/:id', (req, res) => {
  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }
  movies.slice(movieIndex, 1)

  return res.json({ message: 'Movie deleted' })
})

app.listen(PORT, () => {
  console.log(`server listening ${PORT}`)
})

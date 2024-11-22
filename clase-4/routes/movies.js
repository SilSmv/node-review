import { Router } from 'express'
import { readJson } from '../utils'
import { randomUUID } from 'node:crypto'
import { validateMovie, validatePartialMovie } from './schema/movies.js'
export const moviesRouter = Router()

const movies = readJson('./movies.json')

moviesRouter.get('/', (req, res) => {
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
moviesRouter.get('/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find(movie => movie.id === id)
  if (movie) return res.json(movie)
  res.status(404).json({ message: 'Movie not found' })
})
moviesRouter.patch('/:id', (req, res) => {
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
moviesRouter.post('/', (req, res) => {
  const result = validateMovie(req.body)

  if (result.error) {
    // 422 Unpresable entity
    return res.status(400).json({ message: JSON.parse(result.error.message) })
  }
  const newMovie = {
    id: randomUUID, // uuid v4
    ...result.data
  }

  movies.push(newMovie)
  res.status(201).json(newMovie)
})
moviesRouter.delete('/:id', (req, res) => {
  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }
  movies.slice(movieIndex, 1)

  return res.json({ message: 'Movie deleted' })
})

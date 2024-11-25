import { createApp } from './app-cors.js'
import { MovieModel } from './models/mysql/movies.js'

createApp({ movieModel: MovieModel })

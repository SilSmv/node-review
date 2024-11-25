import { createApp } from './app-cors.js'
import { MovieModel } from './models/local_file_system/movies.js'

createApp({ movieModel: MovieModel })

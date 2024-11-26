import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: 'sasa1234',
  database: 'moviesdb'
}

const connection = await mysql.createConnection(config)

export class MovieModel {
  static async getAll ({ genre }) {
    if (genre) {
      const lowerCaseGenre = genre.toLowerCase()
      const [genres] = await connection.query(
        'SELECT id,name FROM genre WHERE LOWER(name) = ?',
        [lowerCaseGenre])
      if (genres.length === 0) return []

      const [{ id }] = genres

      const [moviesGenres] = await connection.query(
        `SELECT BIN_TO_UUID(m.id) id, m.title, m.year, GROUP_CONCAT(g.name)
         AS genre FROM movie m 
         JOIN movie_genres mg ON m.id = mg.movie_id
         JOIN genre g ON mg.genre_id = g.id WHERE g.id = ? GROUP BY m.id`, [id]
      )
      return moviesGenres
    }
    const [movies] = await connection.query(
      `SELECT BIN_TO_UUID(m.id) id, m.title, m.year, GROUP_CONCAT(g.name)
       AS genre FROM movie m 
       JOIN movie_genres mg ON m.id = mg.movie_id
       JOIN genre g ON mg.genre_id = g.id GROUP BY m.id`
    )
    return movies
  }

  static async getById ({ id }) {
    const [movies] = await connection.query(
      'SELECT title,year,director, duration,poster,rate, BIN_TO_UUID(id) id FROM movie WHERE id = UUID_TO_BIN(?)',
      [id]
    )
    const [genres] = await connection.query('SELECT g.name FROM genre g JOIN movie_genres mg ON  mg.genre_id = g.id WHERE mg.movie_id = UUID_TO_BIN(?)', [id])
    console.log(movies)
    if (movies.length > 0) {
      const genre = genres.map(item => item.name)

      return { ...movies[0], genre }
    } else return {}
  }

  static async create ({ input }) {
    const {
      title,
      year,
      director,
      duration,
      poster,
      rate
    } = input

    const [uuidResult] = await connection.query('SELECT UUID() uuid;')
    const [{ uuid }] = uuidResult
    try {
      await connection.query(
            `INSERT INTO movie (id,title,year,director,duration,poster,rate) VALUES (UUID_TO_BIN(${uuid}),?,?,?,?,?,?);`
            , [uuid, title, year, director, duration, poster, rate])
    } catch (error) {
      throw new Error('Error creating movie')
    }
    const [movies] = await connection.query(
      'SELECT title,year,director, duration,poster,rate, BIN_TO_UUID(id) id FROM movie WHERE id = UUID_TO_BIN(?)',
      [uuid]
    )

    return movies
  }

  static async delete ({ id }) {
    try {
      await connection.query(
        'DELETE FROM movie  where id =  UUID_TO_BIN(?)'
        , [id])
    } catch (error) {
      throw new Error('Error creating movie')
    }
  }

  static async update ({ id, input }) {
    const [movies] = await connection.query(
      'SELECT title,year,director, duration,poster,rate, BIN_TO_UUID(id) id FROM movie WHERE id = UUID_TO_BIN(?)',
      [id]
    )
    const movieUpdated = { ...movies[0], ...input }
    await connection.query(
      'UPDATE movie SET title = ?,year = ? ,director = ?, duration =? ,poster =?,rate =? WHERE id = UUID_TO_BIN(?)',
      [movieUpdated.title, movieUpdated.year, movieUpdated.director, movieUpdated.duration, movieUpdated.poster, movieUpdated.rate, id]

    )
  }
}

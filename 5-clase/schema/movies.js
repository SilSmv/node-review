import z from 'zod'

const moviesSchema = z.object({
  title: z.string({
    invalid_type_error: 'Movie titles must be a string',
    required_error: 'Movie titles is required'
  }),
  year: z.number().int().positive().min(1900).max(2024),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10).default(5),
  poster: z.string().url({
    message: 'Poster must be a valid URL'
  }),
  genre: z.array(
    z.enum(['Action', 'Crime', 'Drama', 'Adventure', 'Sci-Fi', 'Romance', 'Biography', 'Fantasy']),
    {
      required_error: 'Movie genre is required.',
      invalid_type_error: 'Movie genre must be an array of enum Genre'
    }
  )

})

export function validateMovie (object) {
  return moviesSchema.safeParse(object)
}
export function validatePartialMovie (input) {
  return moviesSchema.partial().safeParse(input)
}
// function validateMovie(object) {
//     return moviesSchema.safeParse(object)
// }

import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env') })

export const env = {
  database: {
    url: process.env.DATABASE_URL,
  },
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 5000,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
  apiKey: process.env.API_KEY,
}
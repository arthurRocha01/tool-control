import mysql, { type Pool } from 'mysql2/promise'
import { env } from '../config/env.js'

export const pool: Pool = mysql.createPool({
  host: env.database.host!,
  user: env.database.user!,
  password: env.database.password!,
  database: env.database.name!,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

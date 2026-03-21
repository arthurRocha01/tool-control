import { Pool, type PoolConfig } from 'pg'
import { env } from '../config/env.js'

const poolConfig: PoolConfig = {
  connectionString: env.database.url,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
}

export const pool: Pool = new Pool(poolConfig)

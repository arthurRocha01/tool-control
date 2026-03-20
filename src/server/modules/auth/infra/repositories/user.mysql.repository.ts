import { pool } from '../../../../core/database/connection'
import { User } from '../../domain/user.entity'
import type { UserRepository } from '../../domain/user.repository'

interface UserRow {
  id: string;
  name: string;
  username: string;
  password: string;
}

export class UserMysqlRepository implements UserRepository {
  async findByName(username: string): Promise<User | null> {
    const { rows } = await pool.query<UserRow>('SELECT * FROM users WHERE username = $1 LIMIT 1', [
      username,
    ])

    const userData = rows[0]
    if (!userData) return null

    return User.create({
      id: userData.id,
      name: userData.name,
      username: userData.username,
      password: userData.password,
    })
  }
}

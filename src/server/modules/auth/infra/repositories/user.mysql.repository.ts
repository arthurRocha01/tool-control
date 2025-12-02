import type { RowDataPacket } from 'mysql2'
import { pool } from '../../../../core/database/connection'
import { User } from '../../domain/user.entity'
import type { UserRepository } from '../../domain/user.repository'

export class UserMysqlRepository implements UserRepository {
  async findByName(username: string): Promise<User | null> {
    const [row] = await pool.query<RowDataPacket[]>('SELECT * FROM users WHERE username = ?', [
      username,
    ])

    const userData = row[0]
    if (!userData) return null

    return User.create({
      id: userData.id,
      name: userData.name,
      username: userData.username,
      password: userData.password,
    })
  }
}

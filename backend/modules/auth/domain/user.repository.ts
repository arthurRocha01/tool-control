import type { User } from './user.entity.js'

export interface UserRepository {
  findByName(name: string): Promise<User | null>
}

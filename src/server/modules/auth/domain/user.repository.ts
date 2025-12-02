import type { User } from './user.entity'

export interface UserRepository {
  findByName(name: string): Promise<User | null>
}

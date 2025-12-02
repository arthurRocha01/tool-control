import type { UserRepository } from '../domain/user.repository'

export class LoginUseCase {
  constructor(private userRepo: UserRepository) {}

  async execute(username: string) {
    const user = await this.userRepo.findByName(username)
    if (!user) return { success: false, error: 'Usuário não contrado' }

    return { success: true, user }
  }
}

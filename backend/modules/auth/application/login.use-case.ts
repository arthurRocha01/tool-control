import type { UserRepository } from '../domain/user.repository'

export class LoginUseCase {
  constructor(private userRepo: UserRepository) {}

  async execute(username: string, password: string) {
    const user = await this.userRepo.findByName(username)

    if (!user) return { success: false, error: 'Usuário não contrado' }
    if (password !== 'admin') return { success: false, error: 'Senha inválida.' }

    return { success: true, user }
  }
}

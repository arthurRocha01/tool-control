import { Router } from 'express'
import { LoginUseCase } from '../../application/login.use-case'
import { UserMysqlRepository } from '../repositories/user.mysql.repository'

const router = Router()

const loginUseCase = new LoginUseCase(new UserMysqlRepository())

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body
    const output = await loginUseCase.execute(username, password)
    res.status(201).json(output)
  } catch (error) {
    res.status(401).json({ success: false, error })
  }
})

export default router

import { Router } from 'express'
import type { Request, Response } from 'express'
import { ProductMysqlRepository } from '../repositories/product.mysql.repository.js'
import { ListAllProductCaseUse } from '../../application/list-all-product.use-case.js'
import { CreateProductUseCase } from '../../application/create-product.use-case.js'

const router = Router()

const repo = new ProductMysqlRepository()

router.get('/', async (req: Request, res: Response) => {
  const listAllUseCase = new ListAllProductCaseUse(repo)
  const output = await listAllUseCase.execute()
  res.status(200).json(output)
})

router.post('/', async (req: Request, res: Response) => {
  const createdUseCase = new CreateProductUseCase(repo)
  const output = await createdUseCase.execute(req.body)
  res.status(201).json(output)
})

export default router

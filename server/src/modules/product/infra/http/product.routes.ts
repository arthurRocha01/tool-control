import { EditProductUseCase } from './../../application/edit-product.use-case.js'
import { FindByIdProductUseCase } from './../../application/find-by-id-product.use-case.js'
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

router.get('/:id', async (req: Request, res: Response) => {
  const output = await new FindByIdProductUseCase(repo).execute(req.params.id as string)
  if (!output) res.status(0).json({ error: 'Produto não existe no banco de dados.' })
  res.status(200).json(output)
})

router.post('/', async (req: Request, res: Response) => {
  const createdUseCase = new CreateProductUseCase(repo)
  const output = await createdUseCase.execute(req.body)
  res.status(201).json(output)
})

router.put('/:id', async (req: Request, res: Response) => {
  const editProductUseCase = new EditProductUseCase(repo)
  const output = await editProductUseCase.execute({ id: req.params.id!, data: req.body })
  res.status(200).json(output)
})

export default router

import express, { type Application } from 'express'
import type { Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { RouteInMemoryRepository } from './modules/product/infra/route.in-memory-.repository.js'
import { CreateProductUseCase } from './modules/product/application/create-product.use-case.js'
import { ListAllProductCaseUse } from './modules/product/application/list-all-product.use-case.js'

dotenv.config()

const app: Application = express()

app.use(express.json())

app.use(
  cors({
    origin: 'http://localhost:5173',
  }),
)

const routeRepo = new RouteInMemoryRepository()

app.get('/produtos', async (req: Request, res: Response) => {
  const listAllUseCase = new ListAllProductCaseUse(routeRepo)
  const output = await listAllUseCase.execute()
  res.status(200).json(output)
})

app.post('/produtos', async (req: Request, res: Response) => {
  const createdUseCase = new CreateProductUseCase(routeRepo)
  const output = await createdUseCase.execute(req.body)
  res.status(201).json(output)
})

export default app

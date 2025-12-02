import express from 'express'
import type { Application, Request, Response } from 'express'
import cors from 'cors'
import path from 'path'

import productRoutes from './modules/product/infra/http/product.routes.js'

const app: Application = express()
app.use(express.json())
app.use(cors({ origin: 'http://localhost:5173' }))

// Servir React
const frontendPath = path.join(__dirname, '../../dist')
app.use(express.static(frontendPath))
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(frontendPath, 'index.html'))
})

// Rotas
app.use('/produtos', productRoutes)

export default app

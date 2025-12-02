import express from 'express'
import type { Application, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'

// Para obter __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

import productRoutes from './modules/product/infra/http/product.routes.js'

const app: Application = express()
app.use(express.json())
app.use(cors({ origin: 'http://localhost:5173' }))

// Rotas
app.use('/produtos', productRoutes)

// Servir React
const frontendPath = path.join(__dirname, '../../dist')
console.log(frontendPath)
app.use(express.static(frontendPath))
app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.accepts('html')) {
    res.sendFile(path.join(frontendPath, 'index.html'))
    return
  }
  next()
})

export default app

import express, { type Application } from 'express'
import cors from 'cors'

import productRoutes from './modules/product/infra/http/product.routes.js'

const app: Application = express()

app.use(express.json())
app.use(cors({ origin: 'http://localhost:5173' }))

app.use('/produtos', productRoutes)

export default app

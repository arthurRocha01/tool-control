import express from 'express'
import type { Application } from 'express'
import cors from 'cors'

import productRoutes from './modules/product/infra/http/product.routes.js'
import authRoutes from './modules/auth/infra/http/auth.routes.js'

const app: Application = express()

const apiRouter = express.Router()

app.use(express.json())
app.use(cors())

app.use('/produtos', productRoutes)
app.use('/auth', authRoutes)

app.use('/api', apiRouter)

export default app

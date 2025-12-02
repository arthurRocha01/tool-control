import app from './app.js'
import { env } from './core/config/env.js'
const PORT = env.server.port

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})

import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env') })

// Define as variáveis de ambiente
export const env = {
  database: {
    url: process.env.DATABASE_URL,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
  },
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 5000,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
  apiKey: process.env.API_KEY,
}

// ----------------------------------------------------
// FUNÇÃO DE VALIDAÇÃO
// ----------------------------------------------------

/**
 * Valida as variáveis de ambiente obrigatórias e encerra o processo se alguma estiver faltando.
 */
function validateEnv() {
  const requiredDbVars = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME']
  const requiredJwtVars = ['JWT_SECRET', 'JWT_EXPIRES_IN']

  const missingVars: string[] = []

  // 1. Validação das variáveis de Banco de Dados
  requiredDbVars.forEach((key) => {
    if (!process.env[key]) {
      missingVars.push(key)
    }
  })

  // 2. Validação das variáveis de JWT
  requiredJwtVars.forEach((key) => {
    if (!process.env[key]) {
      missingVars.push(key)
    }
  })

  // 3. Validação da Porta (A porta tem um valor padrão, mas é bom verificar)
  if (isNaN(env.server.port)) {
    console.error(' ERRO: A variável de ambiente PORT deve ser um número válido.')
    process.exit(1)
  }

  if (missingVars.length > 0) {
    console.error(`\n ERRO: Variáveis de ambiente obrigatórias faltando!`)
    console.error(`Por favor, defina as seguintes variáveis no seu arquivo .env:`)
    console.error(`- ${missingVars.join('\n- ')}\n`)
    process.exit(1)
  }

  console.log(' Variáveis de ambiente carregadas e validadas com sucesso.')
}

// Executa a validação imediatamente após a definição do objeto 'env'
validateEnv()

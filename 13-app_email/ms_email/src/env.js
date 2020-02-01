/* eslint-disable no-console */
// @flow
import dotenv from 'dotenv'

dotenv.config()

// Variáveis de ambiente, acessadas via process.env, devem ser
// definidas no arquivo .env.

// verifica se todas as variáveis de ambiente estão definidas

let todasDefinidas = true

if (process.env.NATS_URL === undefined) {
  console.log('Falta definir a variável NATS_URL no arquivo .env')
  todasDefinidas = false
}

if (process.env.EMAIL === undefined) {
  console.log('Falta definir a variável EMAIL no arquivo .env')
  todasDefinidas = false
}

if (process.env.EMAIL_PASSWORD === undefined) {
  console.log('Falta definir a variável EMAIL_PASSWORD no arquivo .env')
  todasDefinidas = false
}

if (process.env.IPQUALITYSCORE_API_KEY === undefined) {
  console.log('Falta definir a variável IPQUALITYSCORE_API_KEY no arquivo .env')
  todasDefinidas = false
}

if (!todasDefinidas) {
  process.exit(1)
}

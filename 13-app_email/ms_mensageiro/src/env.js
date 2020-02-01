/* eslint-disable no-console */
// @flow
import dotenv from 'dotenv'

dotenv.config()

// Variáveis de ambiente, acessadas via process.env, devem ser
// definidas no arquivo .env.

// verificar se todas as variáveis de ambiestão definidas

let todasDefinidas = true

if (process.env.MAX_MSGS_LIDAS === undefined) {
  console.log('Falta definir a variável MAX_MSGS_LIDAS no arquivo .env')
  todasDefinidas = false
}

if (process.env.NATS_URL === undefined) {
  console.log('Falta definir a variável NATS_URL no arquivo .env')
  todasDefinidas = false
}


if (process.env.URL_BANCO === undefined) {
  console.log('Falta definir a variável URL_BANCO no arquivo .env')
  todasDefinidas = false
}

if (!todasDefinidas) {
  process.exit(1)
}

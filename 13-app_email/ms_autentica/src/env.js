/* eslint-disable no-console */
// @flow
import dotenv from 'dotenv'

dotenv.config()

// Variáveis de ambiente, acessadas via process.env, devem ser
// definidas no arquivo .env.

// verificar se todas as variáveis de ambiestão definidas

let todasDefinidas = true

if (process.env.NATS_URL === undefined) {
  console.log('Falta definir a variável NATS_URL no arquivo .env')
  todasDefinidas = false
}


if (process.env.URL_BANCO === undefined) {
  console.log('Falta definir a variável URL_BANCO no arquivo .env')
  todasDefinidas = false
}

if (process.env.CRIPTO_SALT === undefined) {
  console.log('Falta definir a variável CRIPTO_SALT no arquivo .env')
  todasDefinidas = false
}

if (process.env.JWT_PASSWORD === undefined) {
  console.log('Falta definir a variável JWT_PASSWORD no arquivo .env')
  todasDefinidas = false
}

if (process.env.JWT_DURATION === undefined) {
  console.log('Falta definir a variável JWT_DURATION no arquivo .env')
  todasDefinidas = false
}

if (!todasDefinidas) {
  process.exit(1)
}

//@flow

/* eslint-disable no-console */
import dotenv from 'dotenv'

dotenv.config()

let comErro = false

const PORTA: number = process.env.PORTA ? parseInt(process.env.PORTA) : 0
const URL_MULTAS_DB: string = process.env.URL_MULTAS_DB ? process.env.URL_MULTAS_DB : ''

if (PORTA === 0) {
  console.log('Variável PORTA não definida no arquivo .env')
  comErro = true
}

if (URL_MULTAS_DB === '') {
  console.log('Variável URL_MULTAS_DB não definida no arquivo .env')
  comErro = true
}
  
if (comErro) {
  process.exit(1)
}

export {PORTA, URL_MULTAS_DB}

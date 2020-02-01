/* eslint-disable no-console */
// verifica se todas as variáveis de ambiente estão definidas
import path from 'path'
import dotenv from 'dotenv'

const arquivoPontoEnv = path.join(__dirname, '../.env')
dotenv.config({ path: arquivoPontoEnv })

let comErro = false

if (process.env.PORTA === undefined) {
  console.log('Variável PORTA não definida!. Defina no arquivo servidor/.env')
  console.log('Exemplo: PORTA=3000')
  comErro = true
}

if (process.env.LASTFM_API_KEY === undefined) {
  console.log('Variável LASTFM_API_KEY não definida! Defina no arquivo servidor/.env')
  console.log('Para obter uma chave acesse https://www.last.fm/api')
  comErro = true
}

if (process.env.FANART_TV_API_KEY === undefined) {
  console.log('Variável FANART_TV_API_KEY não definida! Defina no arquivo servidor/.env')
  console.log('Para obter uma chave acesse https://fanart.tv/get-an-api-key/')
  comErro = true
}

if (comErro) {
  process.exit(1)
}

const PORTA = parseInt(process.env.PORTA)
const LASTFM_API_KEY = process.env.LASTFM_API_KEY
const FANART_TV_API_KEY = process.env.FANART_TV_API_KEY
export { PORTA, LASTFM_API_KEY, FANART_TV_API_KEY }

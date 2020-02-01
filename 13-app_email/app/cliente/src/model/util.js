//@flow
import type {TokenJWT} from '../tipos-flow'

import jwt from 'jsonwebtoken'

export function tokenExpirou(token: TokenJWT) {
  const agora = Date.now()
  const tokenExpiraEm = jwt.decode(token).exp * 1000

  return tokenExpiraEm <= agora
}

export function tokenExpiraraEm(token: TokenJWT, segundos: number) {
  const agora = Date.now() + (segundos * 1000)
  const tokenExpiraEm = jwt.decode(token).exp * 1000

  return tokenExpiraEm <= agora
}
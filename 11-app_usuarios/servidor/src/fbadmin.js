//@flow
import * as admin from 'firebase-admin'

import fs from 'fs'
import path from 'path'

import type {PapelUsuario, IdTokenDecodificado} from './tipos_flow'

const arquivoAdminSDK = 'firebase-adminsdk.json'
const arquivoFirebaseConfig = 'firebase-config.json'

const caminhoAdminSDK = path.join(__dirname, '..', arquivoAdminSDK)
const caminhoFirebaseConfig = path.join(__dirname, '..', arquivoFirebaseConfig)

const serviceAccount = JSON.parse(fs.readFileSync(caminhoAdminSDK, 'utf8'))
export const firebaseConfig = JSON.parse(fs.readFileSync(caminhoFirebaseConfig, 'utf8'))

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: firebaseConfig.databaseURL
})

// idToken --> Promise[IdTokenDecodificado]
export async function validaIdToken (idToken: string) {
  try {
    const tokenDecodificado: IdTokenDecodificado = await admin.auth().verifyIdToken(idToken, true)
    return tokenDecodificado
  } catch (erro) {
    throw new Error('idToken inválido')
  }
}

export async function obtemUsuarios (idTokenDecodificado: IdTokenDecodificado) {
  if (idTokenDecodificado.papeis.includes('admin')) {
    const listUsersResult = await admin.auth().listUsers(500)
    const resposta = listUsersResult.users.map(u => {
      const papeis = u.customClaims === undefined ? [] : u.customClaims.papeis
      return {email: u.email, papeis}
    })
    return resposta
  }
  throw new Error('Usuário não tem permissão')
}

export async function cadastraUsuario (idTokenDecodificado: IdTokenDecodificado, 
  email: string, papeis: [PapelUsuario]) {
  if (idTokenDecodificado.papeis.includes('admin')) {
    const userRecord = await admin.auth().createUser({email})
    await admin.auth().setCustomUserClaims(userRecord.uid, {papeis})
    return true
  }
  throw new Error('Usuário não tem permissão')
}

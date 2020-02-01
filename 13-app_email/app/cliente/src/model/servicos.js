// @flow
import type {Email, TokenJWT} from '../tipos-flow'

export async function obtemConfiguracao() {
  return await enviaPOST('/obtenhaConfiguracao', {})
}

export async function renovaToken(token: TokenJWT) {
  return await enviaPOST('/renoveToken', {token})
}

export async function recuperaSenha(email: Email) {
  return await enviaPOST('/recupereSenha', {email})
}

export async function fazLogin(email: Email, senha: string) {
  return await enviaPOST('/facaLogin', {email, senha})
}

export async function cadastra(email: Email, nome: string, senha: string) {
  return await enviaPOST('/cadastre', {email, nome, senha})
}

export async function removeUsuario(token: TokenJWT) {
  return await enviaPOST('/removaUsuario', {token})
}

export async function validaEmailPara(token: TokenJWT, email: Email) {
  return await enviaPOST('/valideEmailPara', {token, email})
}

export async function enviaEmailDePara(token: TokenJWT, para: Email, assunto: string, texto: string) {
  return await enviaPOST('/envieEmailDePara', {token, para, assunto, texto})
}

export async function leEmailsEnviados(token: TokenJWT, qtd: number) {
  return await enviaPOST('/leiaEmailsEnviados', {token, qtd})
}

async function enviaPOST(endereco, objeto) {
  const resposta = await fetch(endereco, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(objeto)
  })

  return await resposta.json()
}


//@flow

import * as admin from 'firebase-admin'

export type PapelUsuario = 'professor' | 'aluno' | 'admin'

export type IdToken = string

export type IdTokenDecodificado = admin.auth.DecodedIdToken

export type IdTokenResult = { token: string, claims: {papeis: Array<string>} }

export type UId = string

export type Evento = 
        {| ev: 'UsuarioCadastrado', email: string, papeis: [PapelUsuario], uid: UId |}
    |   {| ev: 'LoginRegistrado' , uid: UId |}
    |   {| ev: 'LogoutRegistrado',uid: UId |}

export type Comando = 
        {| type: 'RegistrarLogin', idToken: IdToken |}
    |   {| type: 'RegistrarLogout', idToken: IdToken |}
    |   {| type: 'CadastrarUsuario', idToken: IdToken, email: string, papeis: [PapelUsuario] |}

export type Consulta =
        {| type: 'PesquisaUsuarios', idToken: IdToken |}
    |   {| type: 'PesquisaConfig' |}

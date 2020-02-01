//@flow

export opaque type Email = string

export opaque type TokenUUID = string

export function tokenUUIDToString(token: TokenUUID): string {return token}
export opaque type TokenJWT = string

export type TokenJWTDecodificado = 
  {| email: Email, nome: string |}

export type FazLogin =
    {| ok: true, token: TokenJWT |}
  | {| ok: false, motivo: string |}

export type ConfirmaTokenRedefinicao = 
  {| ok: true, token: TokenUUID |}
| {| ok: false, motivo: string |}

export type EnviaEmailDePara =
    {| ok: true, token: TokenJWT |}
  | {| ok: false, motivo: string |}

export type Cadastra =
  {| ok: true |}
| {| ok: false, motivo: string |}

export type AlteraSenha = 
    {| ok: true |}
  | {| ok: false, motivo: string |}

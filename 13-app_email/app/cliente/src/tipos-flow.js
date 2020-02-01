//@flow

export opaque type Email = string

export function stringToEmail(email: string): Email { return email }
export function emailToString(email: Email): string { return email }
export function tamanhoEmail(email: Email): number { return email.trim().length}

export opaque type TokenJWT = string

export function stringToTokenJWT(token: string): TokenJWT {return token}

export opaque type TokenUUID = string

export type Configuracao = {|
    MAX_MSGS_LIDAS: number
|}
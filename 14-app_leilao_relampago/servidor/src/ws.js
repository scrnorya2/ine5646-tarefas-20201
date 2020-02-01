//@flow


import WebSocket from 'ws'
import {Server} from 'https'
import url from 'url'
import { podeAdicionarUsuario, adicionaUsuario, removeUsuario, retornaLoginDeUsuarios, processaLance,
  adicionaLeilao, fechaLeilao, retornaLeiloesAbertos, entraEmLeilao, removeLeilao,
  abandonaLeilao} from './dados'

import type {Login, MensagemEnviada, MensagemRecebida, Leilao} from './tipos'

let servidorWS

export function criaServidorWS(servidorHTTP: Server) {
  servidorWS = new WebSocket.Server({noServer: true})

  servidorWS.on('connection', (ws, req, cliente) => {
    adicionaUsuario(cliente.login, ws)
    const logins = retornaLoginDeUsuarios().filter(login => login !== cliente.login)
    let msg: MensagemEnviada = {type: 'USUARIOS_ONLINE', usuarios: logins}
    ws.send(JSON.stringify(msg))
    msg = {type: 'LEILOES_ABERTOS', leiloes: retornaLeiloesAbertos()}
    ws.send(JSON.stringify(msg))
    //avisar que tem novo usuario
    const clientes = filtraSet(servidorWS.clients, c => c !== ws)
    msg = {type: 'USUARIO_ENTROU', login: cliente.login}
    enviaMensagemParaClientes(clientes, msg)

    ws.on('message', msg => {
      const msgRecebida: MensagemRecebida = JSON.parse(msg)
      processaMsgRecebida(msgRecebida, servidorWS.clients, cliente.login, ws)
    })

    ws.on('close', () => {
      removeUsuario(cliente.login)
      const clientes = filtraSet(servidorWS.clients, c => c !== ws)
      const msg: MensagemEnviada = {type: 'USUARIO_SAIU', login: cliente.login}
      enviaMensagemParaClientes(clientes, msg)
    })
  })

  servidorHTTP.on('upgrade', (req, socket, head) => {
    autentica(req)
      .then(cliente => {
        if (!cliente)
          socket.destroy()
        else {
          servidorWS.handleUpgrade(req, socket, head, (ws) => servidorWS.emit('connection', ws, req, cliente))
        }
      })
      .catch(() => {
        socket.destroy()
      })
  })
}


function autentica(req): Promise<{login: Login} | null> {
  const {query} = url.parse(req.url, true)
  if (query === undefined || query.login === undefined)
    return Promise.reject('Sem login definido')
  else 
    return Promise.resolve(podeAdicionarUsuario(query.login))
}

function filtraSet<T>(s: Set<T>, f: T => boolean) {
  const r: Set<T> = new Set()

  s.forEach(d => {
    if (f(d))
      r.add(d)
  })

  return r
}

export function enviaMensagemParaClientes(clientes: Set<WebSocket>, msg: MensagemEnviada) {
  const msgComoString: string = JSON.stringify(msg)
  clientes.forEach(c => {
    if (c.readyState === WebSocket.OPEN)
      c.send(msgComoString)
  })
}


function processaMsgRecebida(msg: MensagemRecebida, clientes: Set<WebSocket>, login: Login, cliente: WebSocket) {
  switch (msg.type) {

  case 'ABRIR_LEILAO': {
    adicionaLeilao(msg.vendedor, msg.produto)
    // const demais = filtraSet(clientes, c => c !== cliente)
    const msgEnviar: MensagemEnviada = {
      type: 'LEILAO_ABERTO',
      leilao: {
        vendedor: msg.vendedor,
        aberto: true,
        produto: {
          nome: msg.produto.nome,
          precoMinimo: msg.produto.precoMinimo,
          melhorOferta: null
        },
        participantes: []
      }
    }
    enviaMensagemParaClientes(clientes, msgEnviar)
    break
  }

  case 'FECHAR_LEILAO': {
    const optLeilao: null | Leilao = fechaLeilao(msg.vendedor)
    if (optLeilao !== null) {
      const msgEnviar: MensagemEnviada = {
        type: 'LEILAO_FECHADO',
        leilao: optLeilao
      }
      enviaMensagemParaClientes(clientes, msgEnviar)
    }
    break
  }

  case 'PARTICIPAR_DE_LEILAO': {
    const leilao: null | Leilao = entraEmLeilao(login, msg.vendedor)
    if (leilao === null) {
      const msgEnviar: MensagemEnviada = {
        type: 'LEILAO_NAO_EXISTE_MAIS',
        vendedor: msg.vendedor
      }
      enviaMensagemParaClientes(new Set().add(cliente), msgEnviar)
    }
    else {
      let msgEnviar: MensagemEnviada = {
        type: 'ENTROU_EM_LEILAO',
        leilao
      }
      enviaMensagemParaClientes(new Set().add(cliente), msgEnviar)
      const demais = filtraSet(clientes, c => c != cliente)  //FIXME deveria ser apenas para quem participa do leilao
      msgEnviar = {
        type: 'NOVO_USUARIO_EM_LEILAO',
        vendedor: msg.vendedor,
        comprador: login
      }
      enviaMensagemParaClientes(demais, msgEnviar)
    }
    break
  }

  case 'ENVIAR_LANCE': {
    const clientes = processaLance(msg.lance)
    if (clientes !== null) {
      const msgEnviar: MensagemEnviada = {
        type: 'LANCE_ACEITO',
        lance: msg.lance
      }
      enviaMensagemParaClientes(clientes, msgEnviar)
    }
    break
  }

  case 'REMOVER_LEILAO': {
    removeLeilao(msg.vendedor)
    // const demais = filtraSet(clientes, c => c !== cliente)
    // enviaMensagemParaClientes(demais, msg)
    break
  }

  case 'ABANDONAR_LEILAO': {
    const clientes = abandonaLeilao(login, msg.vendedor)
    if (clientes !== null) {
      const msgEnviar: MensagemEnviada = {
        type: 'LEILAO_ABANDONADO',
        comprador: login,
        vendedor: msg.vendedor
      }
      enviaMensagemParaClientes(clientes, msgEnviar)
    }
    break
  }
  default: {
    console.warn('Mensagem recebida mas não tratada', msg)
  }
  }
}

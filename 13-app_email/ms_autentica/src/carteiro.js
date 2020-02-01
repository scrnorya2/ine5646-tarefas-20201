//@flow

import {ServiceBroker} from 'moleculer'

import type {Email} from './tipos-flow'

export async function enviaEmail(broker: ServiceBroker, para: Email, assunto: string, texto: string) {
  return await broker.call('email.enviaEmail', {para, assunto, texto})
}

export async function validaEmail(broker: ServiceBroker, email: Email) {
  return await broker.call('email.validaEmail', {email})
}

//@flow

import { useRef, useEffect } from 'react'

export function useGrowl() {
  const growlEl = useRef<any>()
  
  function setMsgErro(titulo: string, msg: string) {
    growlEl.current.show({
      severity: 'error',
      summary: titulo,
      detail: msg})
  }

  function setMsgAviso(titulo: string, msg: string) {
    growlEl.current.show({
      severity: 'warn',
      summary: titulo,
      detail: msg})
  }

  function setMsgSucesso(titulo: string, msg: string) {
    growlEl.current.show({
      severity: 'success',
      summary: titulo,
      detail: msg})
  }

  return [growlEl, {setMsgErro, setMsgAviso, setMsgSucesso}]
}

type Estado = {
  msgSucesso: string | void,
  msgAviso: string | void,
  msgErro: string | void
}

export function useMsgsGrowl(estado: Estado) {
  const [growlEl, msgGrowl] = useGrowl()
  
  useEffect(() => {
    if (estado.msgAviso !== undefined) {
      msgGrowl.setMsgAviso('Aviso', estado.msgAviso)
    }
  }, [estado.msgAviso, msgGrowl])

  useEffect(() => {
    if (estado.msgErro !== undefined) {
      msgGrowl.setMsgErro('Erro', estado.msgErro)
    }
  }, [estado.msgErro, msgGrowl])

  useEffect(() => {
    if (estado.msgSucesso !== undefined) {
      msgGrowl.setMsgSucesso('Sucesso', estado.msgSucesso)
    }
  }, [estado.msgSucesso, msgGrowl])

  return growlEl
}
  
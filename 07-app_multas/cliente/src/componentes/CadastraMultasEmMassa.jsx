//@flow

import React from 'react'
import util_masks from './util_masks'

import CadastraEmMassa from './CadastraEmMassa.jsx'

type Props = {|
  cancelar: void => void
|}

function CadastraMultasEmMassa (props: Props) {
  const orientacoes = {
    titulo: 'Cadastro em Massa de Multas',
    subtitulo: 'Digite a placa e a pontuação',
    exemplo: `ABA2018,${util_masks.pontosMask}`

  }
  return <CadastraEmMassa tipo='multa' orientacoes={orientacoes} cancelar={props.cancelar}/>
}

export default CadastraMultasEmMassa

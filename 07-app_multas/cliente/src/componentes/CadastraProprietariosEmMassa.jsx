//@flow

import React from 'react'
import util_masks from './util_masks'

import CadastraEmMassa from './CadastraEmMassa.jsx'

type Props = {| cancelar: void => void |}

function CadastraProprietariosEmMassa (props: Props) {
  const orientacoes = {
    titulo:  'Cadastro em Massa de Proprietários', 
    subtitulo: 'Digite o CPF e o nome do proprietário', 
    exemplo: `${util_masks.cpfMask},Zé Ninguém`
  }

  return <CadastraEmMassa tipo='proprietario' orientacoes={orientacoes} cancelar={props.cancelar}/>
}

export default CadastraProprietariosEmMassa

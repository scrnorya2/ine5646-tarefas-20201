// @flow
import React from 'react'

import FazPedido from './FazPedido.jsx'
import VerificaPedido from './VerificaPedido.jsx'

// FIXME Não há nada de errado com esta aplicação. Sua tarefa consiste em colocá-la
// na sua máquina virtual na nuvem UFSC.

function App () {
  return (
    <div className="container is-fluid">
      <div className="message is-dark">
        <div className="message-header">
        UFSC - CTC - INE - INE5646 :: Apps Compra e Vende :: Comprador
        </div>
        <div className="message-body">
          <div className='columns'>
            <div className='column is-two-thirds'><VerificaPedido /></div>
            <div className='column'><FazPedido /></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

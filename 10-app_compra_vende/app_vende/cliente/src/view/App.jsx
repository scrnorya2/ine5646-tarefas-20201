//@flow
import React from 'react'

import VerificaPedidos from './VerificaPedidos.jsx'
import 'bulma/css/bulma.min.css'

// FIXME Não há nada de errado com esta aplicação. Sua tarefa consiste em colocá-la
// na sua máquina virtual na nuvem UFSC.

function App () {
  return (
    <div className='container is-fluid'>
      <div className="message is-dark">
        <div className="message-header">
          UFSC - CTC - INE - INE5646 :: Apps Compra e Vende :: Vendedor
        </div>
        <div className="message-body">
          <div className='columns'>
            <div className='column'>
              <VerificaPedidos/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default App

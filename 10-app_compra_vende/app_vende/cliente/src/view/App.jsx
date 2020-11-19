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
        <table class="table is-bordered is-striped is-fullwidth">
          <thead>
            <tr>
              <th class="tg-0lax">Nomes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="tg-0pky">Ayron Scartezini do Nascimento (18105484)</td>
            </tr>
            <tr>
              <td class="tg-0pky">Fernando Carlos Pereira (16105548)</td>
            </tr>
            <tr>
              <td class="tg-0pky">Gustavo Coelho da Costa (19100860)</td>
            </tr>
            <tr>
              <td class="tg-0pky">João Víctor Baierle Arantes (19100864)</td>
            </tr>
          </tbody>
          </table>
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

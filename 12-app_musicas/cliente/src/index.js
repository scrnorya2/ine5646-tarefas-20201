import React from 'react'
import ReactDOM from 'react-dom'
import {UI} from './visao/UI.jsx'
import 'bulma/css/bulma.min.css'

import registra_sw from './pwa/registra_sw'

// FIXME O código da aplicação está completo.
// Sua tarefa é identificar, tanto no lado cliente como no lado servidor,
// quais as alterações foram necessárias para transformar esta aplicação
// em uma PWA.

const elem = document.createElement('div')

document.body.appendChild(elem)
ReactDOM.render(<UI/>, elem)

registra_sw()
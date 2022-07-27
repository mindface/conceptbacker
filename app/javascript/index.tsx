import React from 'react'
import ReactDom from 'react-dom'

import Home from './container/Home'
import Concepter from './container/Concepter'
import Planning from './container/Planning'
import Dictio from './container/Dictio'
import { Provider } from 'react-redux'
import { setupStore } from './store'

const app = document.getElementById('app')
const dictio = document.getElementById('dictio')
const concepter = document.getElementById('concepter')
const planning = document.getElementById('planning')

import { RecoilRoot } from 'recoil'
if (app)
  ReactDom.render(
    <Provider store={setupStore}>
      <RecoilRoot>
        <Home />
      </RecoilRoot>
    </Provider>,
    app
  )
if (dictio)
  ReactDom.render(
    <Provider store={setupStore}>
      <RecoilRoot>
        <Dictio />
      </RecoilRoot>
    </Provider>,
    dictio
  )
if (concepter) ReactDom.render(<Concepter />, concepter)
if (planning)
  ReactDom.render(
    <Provider store={setupStore}>
      <RecoilRoot>
        <Planning />
      </RecoilRoot>
    </Provider>,
    planning
  )
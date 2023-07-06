import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { RecoilRoot } from 'recoil'

const rootId = 'flexer2-root-dashboard'

if (!document.getElementById(rootId)) {
  const progressBar = document.querySelector(
    'div[data-role="linear-page-content"] > section > div',
  )

  const flexerRoot = document.createElement('div')
  flexerRoot.style.overflowY = 'scroll'
  flexerRoot.id = rootId
  progressBar.parentElement.insertBefore(flexerRoot, progressBar.nextSibling)

  ReactDOM.render(
    <RecoilRoot>
      <App />
    </RecoilRoot>,
    document.getElementById(rootId),
  )
}

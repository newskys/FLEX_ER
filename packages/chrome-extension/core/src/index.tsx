import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { NextData } from '../../../common/type/api/ssr'

const rootId = 'flexer2-core'

const boot = () => {
  const profile = document.getElementById('root')
  const flexerRoot = document.createElement('div')
  flexerRoot.style.marginTop = '0'
  flexerRoot.id = rootId
  profile.parentElement.insertBefore(flexerRoot, profile.nextSibling)

  let ssr: NextData

  try {
    ssr = JSON.parse(document.getElementById('__NEXT_DATA__')?.textContent)
  } catch (e) {
    ssr = null
  }

  ReactDOM.render(<App data={ssr} />, document.getElementById(rootId))
}

let flexBootCheckInterval = window.setInterval(() => {
  try {
    const flexRoot = document.getElementById('app-shell-root')
    if (flexRoot) {
      window.clearInterval(flexBootCheckInterval)
      flexBootCheckInterval = null

      if (!document.getElementById(rootId)) {
        boot()
      }
    }
  } catch (e) {}
}, 500)

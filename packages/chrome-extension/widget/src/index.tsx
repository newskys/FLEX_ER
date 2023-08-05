import React from 'react'
import ReactDOM from 'react-dom'
import { RecoilRoot } from 'recoil'
import FlexerApp from '../../common/flexerModule/FlexerApp'

const rootId = 'flexer2-root'
const modalId = 'flexer2-modal-root'
const tooltipId = 'flexer2-tooltip-root'

const boot = () => {
  const flexReactRoot = document.getElementById('root')
  const flexRoot = document.getElementById('app-shell-root')
  const profileEl =
    flexRoot.querySelector('nav').children[0].children[0].children[0]

  const flexerRoot = document.createElement('div')
  flexerRoot.id = rootId

  const flexerModalRoot = document.createElement('div')
  flexerModalRoot.id = modalId
  const flexerTooltipRoot = document.createElement('div')
  flexerTooltipRoot.id = tooltipId

  profileEl.parentElement.insertBefore(flexerRoot, profileEl.nextSibling)
  flexReactRoot.insertBefore(flexerModalRoot, flexReactRoot.children[0])
  flexReactRoot.insertBefore(flexerTooltipRoot, flexReactRoot.children[0])

  // insertGA()

  ReactDOM.render(
    <RecoilRoot>
      <FlexerApp isFullMode={false} />
    </RecoilRoot>,
    document.getElementById(rootId),
  )
}

let flexBootCheckInterval = window.setInterval(() => {
  try {
    const flexRoot = document.getElementById('app-shell-root')
    const nav = flexRoot.querySelector('nav')
    if (nav.getAttribute('data-role') !== 'linear-app-nav-bar') {
      return
    }

    const profileEl = nav.children[0].children[0].children[0]
    if (profileEl) {
      window.clearInterval(flexBootCheckInterval)
      flexBootCheckInterval = null

      if (!document.getElementById(rootId)) {
        boot()
      }
    }
  } catch (e) {
    console.log('error!', e)
  }
}, 500)

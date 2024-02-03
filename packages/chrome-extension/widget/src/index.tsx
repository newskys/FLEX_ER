import React from 'react'
import ReactDOM from 'react-dom'
import { RecoilRoot } from 'recoil'
import FlexerApp from '../../common/flexerModule/FlexerApp'

const rootId = 'flexer2-root'
const modalId = 'flexer2-modal-root'
const tooltipId = 'flexer2-tooltip-root'

const boot = (anchor: HTMLElement) => {
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

  // console.log('flexRoot', flexRoot)
  // console.log('flexerRoot', flexerRoot)
  // console.log('profileEl', anchor)

  anchor.parentElement.insertBefore(flexerRoot, anchor.parentElement.childNodes[2])
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
    const anchor = flexRoot.querySelector(':scope > div > nav > div > div') as HTMLElement

    // console.log('!flexRoot', flexRoot)
    // console.log('!anchor', anchor)
    // if (nav.getAttribute('data-role') !== 'avatar-root') {
    //   return
    // }

    // const profileEl = anchor.children[0].children[0].children[0]
    if (anchor) {
      window.clearInterval(flexBootCheckInterval)
      flexBootCheckInterval = null

      if (!document.getElementById(rootId)) {
        boot(anchor)
      }
    }
  } catch (e) {
    console.log('error!', e)
  }
}, 500)

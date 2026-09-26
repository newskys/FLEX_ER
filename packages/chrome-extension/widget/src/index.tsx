import React from 'react'
import ReactDOM from 'react-dom'
import { RecoilRoot } from 'recoil'
import FlexerApp from '../../common/flexerModule/FlexerApp'
import { getSidebarHeaderContainer } from '../../common/util/flexDom'

const rootId = 'flexer2-root'
const modalId = 'flexer2-modal-root'
const tooltipId = 'flexer2-tooltip-root'

const boot = (anchor: HTMLElement) => {
  const flexReactRoot = document.getElementById('root')

  const flexerRoot = document.createElement('div')
  flexerRoot.id = rootId
  // 헤더 컨테이너가 align-items: flex-start인 flex column이므로 폭을 채우도록 stretch하고,
  // '근무 시작' 버튼 행과 같은 좌우 여백(10px)을 준다.
  flexerRoot.style.alignSelf = 'stretch'
  flexerRoot.style.padding = '8px 10px 4px'

  const flexerModalRoot = document.createElement('div')
  flexerModalRoot.id = modalId
  const flexerTooltipRoot = document.createElement('div')
  flexerTooltipRoot.id = tooltipId

  // console.log('flexRoot', flexRoot)
  // console.log('flexerRoot', flexerRoot)
  // console.log('profileEl', anchor)

  anchor.insertBefore(flexerRoot, anchor.childNodes[2])
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
    const anchor = getSidebarHeaderContainer()

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

import React from 'react'
import ReactDOM from 'react-dom'
import { RecoilRoot } from 'recoil'
import FlexerApp from '../../common/flexerModule/FlexerApp'

const rootId = 'root'

ReactDOM.render(
  <RecoilRoot>
    <FlexerApp isFullMode={true} />
  </RecoilRoot>,
  document.getElementById(rootId),
)

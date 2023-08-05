import React from 'react'
import ReactDOM from 'react-dom'

interface Props {
  children: React.ReactNode
}

const TooltipPortal = ({ children }) => {
  const tooltipRoot = document.getElementById('flexer2-tooltip-root')
  return ReactDOM.createPortal(children, tooltipRoot)
}

export default TooltipPortal

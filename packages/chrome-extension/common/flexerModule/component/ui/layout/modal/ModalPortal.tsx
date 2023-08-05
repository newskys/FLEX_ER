import React from 'react'
import ReactDOM from 'react-dom'

interface Props {
  children: React.ReactNode
}

const ModalPortal = ({ children }) => {
  const modalRoot = document.getElementById('flexer2-modal-root')
  return ReactDOM.createPortal(children, modalRoot)
}

export default ModalPortal

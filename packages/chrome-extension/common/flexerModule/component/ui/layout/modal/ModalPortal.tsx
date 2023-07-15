import React from 'react'
import ReactDOM from 'react-dom'

interface Props {
  children: React.ReactNode
}

const ModalPortal = ({ children }) => {
  const modalRoot = document.getElementById('flexer2-modal-root')
  // 모달 앨리먼트를 modalRoot에 마운트할 것이다.

  return ReactDOM.createPortal(children, modalRoot)
}

export default ModalPortal

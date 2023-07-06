import React from 'react'

const WidgetHeader = ({ children }) => {
  return (
    <div className="py-2 px-6 flex justify-between items-center">
      {children}
    </div>
  )
}

export default WidgetHeader

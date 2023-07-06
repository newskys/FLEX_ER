import React from 'react'

const WidgetBody = ({ children }) => {
  return (
    <div className="border-t border-gray-200">
      <dl className="px-3 py-3">{children}</dl>
    </div>
  )
}

export default WidgetBody

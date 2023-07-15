import React from 'react'

const WidgetBody = ({ children, isExpanded }) => {
  return (
    <div className="border-t border-gray-200 relative">
      <dl className={isExpanded ? 'px-3 py-3' : 'px-1 py-1'}>{children}</dl>
    </div>
  )
}

export default WidgetBody

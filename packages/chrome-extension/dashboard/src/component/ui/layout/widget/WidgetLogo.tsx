import React from 'react'

interface Props {
  version: string
}

const WidgetLogo = ({ version }: Props) => {
  return (
    <div>
      <h3 className="text-sm font-bold leading-6 text-gray-900 inline-block">
        FLEXER
      </h3>
      <span className="text-xs p-1 text-gray-500">{version}</span>
    </div>
  )
}

export default WidgetLogo

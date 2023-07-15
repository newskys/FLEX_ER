import React from 'react'
import clsx from 'clsx'

interface Props {
  version: string
  isNarrow: boolean
}

const WidgetLogo = ({ version, isNarrow }: Props) => {
  return (
    <div className={clsx(isNarrow && `flex`)}>
      <h3 className="text-sm font-bold leading-6 text-gray-900 inline-block">
        FLEXER
      </h3>
      {!isNarrow && (
        <span className="text-xs p-1 text-gray-500">{version}</span>
      )}
    </div>
  )
}

export default WidgetLogo

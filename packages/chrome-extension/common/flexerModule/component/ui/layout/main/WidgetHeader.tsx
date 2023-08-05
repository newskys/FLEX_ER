import React from 'react'
import clsx from 'clsx'

interface Props {
  isNarrow: boolean
  children: React.ReactNode
}

const WidgetHeader = ({ isNarrow, children }: Props) => {
  return (
    <div
      className={clsx(
        'flex justify-between items-center',
        isNarrow ? 'flex-col py-2' : 'py-2 px-4 flex-row',
      )}
    >
      {children}
    </div>
  )
}

export default WidgetHeader

import React, { MouseEventHandler, useRef, useState } from 'react'
import Tooltip from './Tooltip'

interface Props {
  title: string
  content: string
  Icon?: JSX.Element
  onClickIcon?: MouseEventHandler
  tooltipText?: string
}

const SmallIndicator = ({
  title,
  content,
  onClickIcon,
  tooltipText,
}: Props) => {
  const [isMouseOver, setMouseOver] = useState<boolean>(false)
  const ref = useRef<HTMLDivElement | null>(null)

  const handleMouseOver = (e, isMouseOver) => {
    setMouseOver(isMouseOver)
  }

  return (
    <div
      ref={ref}
      className="px-1 py-1 flex flex-col items-center justify-center basis-full"
      onMouseEnter={(e) => handleMouseOver(e, true)}
      onMouseLeave={(e) => handleMouseOver(e, false)}
    >
      {tooltipText && isMouseOver && ref.current && (
        <Tooltip
          left={ref.current.offsetWidth + ref.current.getBoundingClientRect().x}
          text={tooltipText}
        />
      )}
      <div className="flex flex-row items-center justify-center">
        <span className="text-sm text-gray-400 text-center">{title}</span>
      </div>
      <span className="text-lg text-gray-600">{content}</span>
    </div>
  )
}

export default SmallIndicator

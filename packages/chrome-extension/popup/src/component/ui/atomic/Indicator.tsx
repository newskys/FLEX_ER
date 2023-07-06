import React, { MouseEventHandler, useRef, useState } from 'react'
import Tooltip from './Tooltip'

interface Props {
  title: string
  content: string
  Icon?: JSX.Element
  onClickIcon?: MouseEventHandler
  tooltipText?: string
}

const Indicator = ({
  title,
  content,
  Icon,
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
      className="px-1 py-1 flex flex-col items-center justify-center"
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
        <span className="text-sm text-gray-400">{title}</span>
        {Icon && (
          <button
            className="m-[4px] w-[14px] text-gray-400"
            onClick={onClickIcon}
          >
            {Icon}
          </button>
        )}
      </div>
      <span className="text-4xl text-gray-600">{content}</span>
    </div>
  )
}

export default Indicator

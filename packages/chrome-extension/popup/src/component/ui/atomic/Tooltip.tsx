import React from 'react'
import clsx from 'clsx'

interface Props {
  left: number
  text: string
}

const Tooltip = ({ left, text }: Props) => (
  <div
    // style={{ left: `${Math.round(left)}px` }}
    className={
      'fixed text-xs inset-auto z-10 w-fit leading-normal max-w-[150px] h-fit flex flex-col items-center justify-center p-[10px] border-t border-gray-200 bg-white rounded-lg shadow-lg pt-[10px] pb-[10px] pl-[10px] pr-[10px]'
    }
  >
    {text}
  </div>
)

export default Tooltip

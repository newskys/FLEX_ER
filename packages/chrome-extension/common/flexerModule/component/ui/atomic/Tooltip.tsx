import React from 'react'

interface Props {
  left: number
  top: number
  text: string
}

const Tooltip = ({ left, top, text }: Props) => (
  <div
    style={{ left: `${Math.round(left)}px`, top: `${Math.round(top)}px` }}
    className={
      'fixed inset-auto z-[10] w-fit leading-normal max-w-[230px] h-fit flex flex-col items-center justify-center pt-[15px] pb-[15px] pl-[30px] pr-[30px] border-t border-gray-200 bg-white rounded-lg shadow-lg'
    }
  >
    {text}
  </div>
)

export default Tooltip

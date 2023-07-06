import React from 'react'

interface Props {
  text: string
}

const Tooltip = ({ text }: Props) => {
  return (
    <div>
      <div className="fixed inset-auto z-10 w-fit leading-normal max-w-[230px] h-fit left-[230px] flex flex-col items-center justify-center pt-[15px] pb-[15px] pl-[30px] pr-[30px] border-t border-gray-200 bg-white rounded-lg shadow-lg">
        {text}
      </div>
    </div>
  )
}

export default Tooltip

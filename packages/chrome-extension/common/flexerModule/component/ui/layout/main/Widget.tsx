import React from 'react'

const Widget = ({ children }) => {
  return (
    // flex 사이드바의 '근무 시작' 버튼과 같은 카드 스타일(8px radius + 1px ring shadow)
    <section className="bg-white overflow-hidden rounded-lg text-[#242a30] shadow-[0_1px_2px_0_rgba(0,0,0,0.02),0_0_0_1px_rgba(0,0,0,0.06)]">
      {children}
    </section>
  )
}

export default Widget

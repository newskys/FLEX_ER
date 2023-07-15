import React from 'react'

const Widget = ({ children }) => {
  return (
    <section className="bg-white overflow-hidden rounded-lg border">
      {children}
    </section>
  )
}

export default Widget

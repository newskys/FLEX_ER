import React, { useEffect } from 'react'

interface Props {
  title: string
}

const InlineNotice = ({ title }: Props) => {
  return <div className="w-full bg-amber-200 text-center p-1">{title}</div>
}

export default InlineNotice

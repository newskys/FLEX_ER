import React from 'react'
import { useRecoilValue } from 'recoil'
import clsx from 'clsx'
import { $modalStore } from '../../../../store/modal'

const Widget = ({ children }) => {
  const modalStore = useRecoilValue($modalStore)

  return (
    <section
      className={clsx(
        'bg-white overflow-hidden w-[200px]',
        modalStore.isOpened && 'w-[400px] h-[300px]',
      )}
    >
      {children}
    </section>
  )
}

export default Widget

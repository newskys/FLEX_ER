import React, {
  MouseEvent,
  MouseEventHandler,
  useMemo,
  useRef,
  useState,
} from 'react'
import clsx from 'clsx'
import { useRecoilValue } from 'recoil'
import { $configsStore } from '../../../../store/configs'

export type ModalType = 'ALERT' | 'OK'

export interface ModalData {
  type: ModalType
  title: string
  contents?: string
  inputData?: {
    placeholder: string
    defaultValue?: string
  }
  checkBoxData?: {
    text: string
    defaultValue?: boolean
    onClick?: (value: boolean) => void
  }
  primaryButtonData: {
    onClick: (e: MouseEvent, userInput: string, checked: boolean) => void
    title: string
  }
  secondaryButtonData?: {
    onClick: MouseEventHandler
    title: string
  }
}

const Modal = ({
  type,
  title,
  contents,
  inputData,
  checkBoxData,
  primaryButtonData,
  secondaryButtonData,
}: ModalData) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [checked, setChecked] = useState<boolean>(!!checkBoxData?.defaultValue)
  const isFullMode = useRecoilValue($configsStore).isFullMode

  const handleClickCheckBox = (e) => {
    setChecked(!checked)
  }

  const Icon = useMemo(() => {
    switch (type) {
      case 'ALERT':
        return (
          <svg
            className="h-6 w-6 text-red-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        )
      case 'OK':
      default:
        return (
          <svg
            className="h-6 w-6 text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )
    }
  }, [type])

  return (
    <div
      className={clsx('relative', isFullMode ? 'z-10' : 'z-[11001]')}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      <div
        className={clsx(
          'fixed inset-0 overflow-y-auto',
          isFullMode && 'z-[2147483647] ',
        )}
      >
        <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
          <div
            className={clsx(
              'relative bg-white rounded-lg text-left overflow-hidden',
              isFullMode
                ? 'w-full h-full flex flex-col'
                : 'shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full',
            )}
          >
            <div
              className={clsx(
                'bg-white px-4 pt-5 pb-4',
                isFullMode ? 'flex-grow' : 'sm:p-6 sm:pb-4',
              )}
            >
              <div className={clsx(!isFullMode && 'sm:flex sm:items-start')}>
                <div
                  className={clsx(
                    'mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full',
                    isFullMode ? '' : 'sm:mx-0 sm:h-10 sm:w-10',
                    type === 'OK' ? `bg-blue-100` : `bg-red-100`,
                  )}
                >
                  {Icon}
                </div>
                <div
                  className={clsx(
                    'mt-3 text-center flex-grow',
                    !isFullMode && 'sm:mt-0 sm:ml-4 sm:text-left',
                  )}
                >
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900"
                    id="modal-title"
                  >
                    {title}
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">{contents}</p>
                  </div>
                  <div className="mt-4">
                    <p className="text-gray-500">
                      {inputData && (
                        <input
                          ref={inputRef}
                          type="text"
                          placeholder={inputData.placeholder}
                          maxLength={40}
                          defaultValue={inputData.defaultValue}
                          className={clsx(
                            'focus:ring-indigo-500 pt-2 pb-2 pr-2 focus:border-indigo-500 block w-full shadow-sm border-gray-300 rounded-md',
                            !isFullMode && 'sm:text',
                          )}
                        />
                      )}
                    </p>
                  </div>
                  <div className="mt-4">
                    {checkBoxData && (
                      <>
                        <label htmlFor="sendLog" className="flex items-center">
                          <input
                            style={{ appearance: 'auto' }}
                            type="checkbox"
                            className="mr-[4px] select-none"
                            id="sendLog"
                            // disabled
                            defaultChecked={!!checkBoxData?.defaultValue}
                            // checked={checked}
                            onClick={handleClickCheckBox}
                          />

                          <span className="text-xs text-gray-500">
                            {checkBoxData.text}
                          </span>
                        </label>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div
              className={clsx(
                'bg-gray-50 px-4 py-3',
                isFullMode
                  ? 'flex flex-row-reverse'
                  : 'sm:px-6 sm:flex sm:flex-row-reverse',
              )}
            >
              <button
                type="button"
                className={clsx(
                  'w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2',
                  isFullMode ? 'ml-3' : 'sm:ml-3 sm:w-auto sm:text-sm',
                  type === 'OK' ? `focus:ring-blue-500` : `focus:ring-red-500`,
                  type === 'OK' ? `bg-blue-600` : `bg-red-600`,
                  type === 'OK' ? `hover:bg-blue-700` : `hover:bg-red-700`,
                )}
                onClick={(e) =>
                  primaryButtonData.onClick(e, inputRef.current?.value, checked)
                }
              >
                {primaryButtonData.title}
              </button>
              {secondaryButtonData && (
                <button
                  type="button"
                  className={clsx(
                    'mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
                    isFullMode
                      ? 'ml-3'
                      : 'sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm',
                  )}
                  onClick={secondaryButtonData.onClick}
                >
                  {secondaryButtonData.title}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal

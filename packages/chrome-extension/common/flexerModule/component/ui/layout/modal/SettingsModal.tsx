import React, { useRef, useState } from 'react'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { Settings } from '../../../../store/settings'
import { useRecoilValue } from 'recoil'
import { $configsStore } from '../../../../store/configs'

export interface Props {
  settingsStore: Settings
  onSubmit: (settingsStore: Settings) => void
  onCancel: () => void
}

const SettingsModal = ({ settingsStore, onSubmit, onCancel }: Props) => {
  const isFullMode = useRecoilValue($configsStore).isFullMode

  const { startDate, endDate, isWorkingHourFixed, offsetWorkingHour } = settingsStore

  const [fixedWorkingHourChecked, setFixedWorkingHourChecked] =
    useState<boolean>(!!isWorkingHourFixed)

  const initialWorkingHourChecked = useRef<boolean>(!!isWorkingHourFixed)
  const [isWorkingHourChanged, setWorkingHourChange] = useState<boolean>(false)

  const [startDateChecked, setStartDateChecked] = useState<boolean>(!!startDate)
  const [tempStartDate, setTempStartDate] = useState<Date>(startDate)

  const [endDateChecked, setEndDateChecked] = useState<boolean>(!!endDate)
  const [tempEndDate, setTempEndDate] = useState<Date>(endDate)
  const [offsetWorkingHourChecked, setOffsetWorkingHourChecked] = useState<boolean>(!!offsetWorkingHour)
  const [tempOffsetWorkingHour, setTempOffsetWorkingHour] = useState<number>(offsetWorkingHour)

  // useEffect(() => {
  // if (settingsStore.isWorkingHourEditable === false) {
  //   setFixedWorkingHourChecked(true)
  // }
  // }, [])

  // useEffect(() => {
  //   if (!fixedWorkingHourChecked) {
  //     setStartDateChecked(false)
  //     setEndDateChecked(false)
  //     setTempStartDate(null)
  //     setTempEndDate(null)
  //     startDateCheckRef.current.checked = false
  //     endDateCheckRef.current.checked = false
  //   }
  // }, [fixedWorkingHourChecked])

  const handleFixedWorkingHourCheck = (e) => {
    setFixedWorkingHourChecked(!fixedWorkingHourChecked)
    setWorkingHourChange(
      initialWorkingHourChecked.current !== !fixedWorkingHourChecked,
    )
  }
  const handleStartDateCheck = (e) => {
    setStartDateChecked(!startDateChecked)
  }
  const handleEndDateCheck = (e) => {
    setEndDateChecked(!endDateChecked)
  }
  const handleOffsetWorkingOurCheck = (e) => {
    setOffsetWorkingHourChecked(!offsetWorkingHourChecked)
  }

  const handleClickSubmit = (e) => {
    e.preventDefault()

    if (!validate()) {
      return
    }

    onSubmit({
      ...settingsStore,
      startDate: startDateChecked ? tempStartDate : null,
      endDate: endDateChecked ? tempEndDate : null,
      isWorkingHourFixed: fixedWorkingHourChecked,
      // isWorkingHourEditable: settingsStore.isWorkingHourEditable,
      isWorkingHourEditable: true,
      offsetWorkingHour: offsetWorkingHourChecked ? tempOffsetWorkingHour : null,
    })
  }

  const validate = () => {
    const currentMonth = dayjs().month() + 1

    if (
      startDateChecked &&
      (!dayjs(tempStartDate).isValid() ||
        dayjs(tempStartDate).month() + 1 !== currentMonth)
    ) {
      alert('입사일을 확인해주세요. 입사일은 이번 달이어야 합니다.')
      return false
    }
    if (
      endDateChecked &&
      (!dayjs(tempEndDate).isValid() ||
        dayjs(tempEndDate).month() + 1 !== currentMonth)
    ) {
      alert('퇴사일을 확인해주세요. 퇴사일은 이번 달이어야 합니다.')
      return false
    }
    if (
      startDateChecked &&
      endDateChecked &&
      dayjs(tempStartDate).isAfter(dayjs(tempEndDate))
    ) {
      alert('입사일이 퇴사일보다 늦을 수 없습니다.')
      return false
    }
    return true
  }

  const handleChangeStartDate = (e) => {
    setTempStartDate(e.target.value)
  }

  const handleChangeEndDate = (e) => {
    setTempEndDate(e.target.value)
  }

  const handleChangeOffsetWorkingHour = (e) => {
    setTempOffsetWorkingHour(parseInt(e.target.value))
  }

  const handleClickCancel = (e) => {
    e.preventDefault()
    onCancel()
  }

  const getFirstDayOfMonth = (date: Date, formatStr: string) => {
    return dayjs(date).startOf('month').format(formatStr)
  }

  const getLastDayOfMonth = (date: Date, formatStr: string) => {
    return dayjs(date).endOf('month').format(formatStr)
  }

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
          !isFullMode && 'z-[2147483647]',
        )}
      >
        <div
          className={clsx(
            isFullMode
              ? 'h-full'
              : 'flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0',
          )}
        >
          <div
            className={clsx(
              'relative bg-white text-left',
              isFullMode
                ? 'flex flex-col w-full h-full'
                : 'rounded-lg overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full w-fit',
            )}
          >
            <div
              className={clsx(
                'bg-white px-4 pt-5 pb-4',
                isFullMode ? 'flex-grow' : 'sm:p-6 sm:pb-4',
              )}
            >
              <div className={clsx(!isFullMode && 'sm:flex sm:items-start')}>
                <section
                  className={clsx(
                    'mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100',
                    !isFullMode && 'sm:mx-0 sm:h-10 sm:w-10',
                  )}
                >
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
                </section>
                <aside
                  className={clsx(
                    'mt-3 text-center flex-grow',
                    !isFullMode && 'sm:mt-0 sm:ml-4 sm:text-left',
                  )}
                >
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900"
                    id="modal-title"
                  >
                    설정
                  </h3>
                  <div className="mt-[8px]">
                    <label
                      htmlFor="fixedWorkingHour"
                      className="w-fit flex items-center"
                    >
                      <input
                        id="fixedWorkingHour"
                        type="checkbox"
                        className="mr-[4px]"
                        // disabled={!settingsStore.isWorkingHourEditable}
                        style={{ appearance: 'auto' }}
                        defaultChecked={fixedWorkingHourChecked}
                        onClick={handleFixedWorkingHourCheck}
                      />
                      <span className="text-base text-gray-500">
                        일 평균 8시간 근무제
                      </span>
                      {settingsStore.isWorkingHourEditable && (
                        <span className="text-xs text-gray-500 rounded-full bg-gray-200 ml-[4px] pt-[2px] pb-[2px] pl-[4px] pr-[4px]">
                          Beta
                        </span>
                      )}
                    </label>
                    {isWorkingHourChanged && (
                      <span className="text-sm" style={{ color: 'darkorange' }}>
                        반드시 회사의 근무정책을 확인한 후 설정해주세요.
                      </span>
                    )}
                  </div>
                  <div className="h-[1px] bg-gray-200 mt-[8px]" />
                  <div className="mt-[8px]">
                    <label
                      htmlFor="customizeStartDate"
                      className="w-fit flex items-center"
                    >
                      <input
                        id="customizeStartDate"
                        type="checkbox"
                        className="mr-[4px]"
                        // disabled={!fixedWorkingHourChecked}
                        style={{ appearance: 'auto' }}
                        defaultChecked={startDateChecked}
                        onClick={handleStartDateCheck}
                      />
                      <span className="text-base text-gray-500">
                        이번 달 입사
                      </span>
                    </label>
                    {startDateChecked && (
                      <div className="grid grid-cols-2 grid-rows-1 items-center justify-between mt-2">
                        <div className="mt-[2px] mb-[2px]">
                          <p className="text-sm text-gray-500">입사일</p>
                        </div>
                        <div className="mt-[2px] mb-[2px]">
                          <p className="text-gray-500">
                            <input
                              type="date"
                              min={getFirstDayOfMonth(new Date(), 'YYYY-MM-DD')}
                              max={getLastDayOfMonth(new Date(), 'YYYY-MM-DD')}
                              defaultValue={
                                startDate
                                  ? dayjs(startDate).format('YYYY-MM-DD')
                                  : ''
                              }
                              className={clsx(
                                'focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm border-gray-300 rounded-md',
                                !isFullMode && 'sm:text',
                              )}
                              onChange={handleChangeStartDate}
                            />
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="mt-[8px]">
                    <label
                      htmlFor="customizeEndDate"
                      className="w-fit flex items-center"
                    >
                      <input
                        id="customizeEndDate"
                        type="checkbox"
                        className="mr-[4px]"
                        // disabled={!fixedWorkingHourChecked}
                        style={{ appearance: 'auto' }}
                        defaultChecked={endDateChecked}
                        onClick={handleEndDateCheck}
                      />
                      <span className="text-base text-gray-500">
                        이번 달 퇴사
                      </span>
                    </label>
                    {endDateChecked && (
                      <div className="grid grid-cols-2 grid-rows-1 items-center justify-between mt-2">
                        <div className="mt-[2px] mb-[2px]">
                          <p className="text-sm text-gray-500">퇴사일</p>
                        </div>
                        <div className="mt-[2px] mb-[2px]">
                          <p className="text-gray-500">
                            <input
                              type="date"
                              min={getFirstDayOfMonth(new Date(), 'YYYY-MM-DD')}
                              max={getLastDayOfMonth(new Date(), 'YYYY-MM-DD')}
                              defaultValue={
                                endDate
                                  ? dayjs(endDate).format('YYYY-MM-DD')
                                  : ''
                              }
                              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text border-gray-300 rounded-md"
                              onChange={handleChangeEndDate}
                            />
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="mt-[8px]">
                    <div className="flex items-center">
                      <label
                        htmlFor="offsetWorkingHour"
                        className="w-fit flex items-center flex-1">
                        <input
                          // ref={endDateCheckRef}
                          id="offsetWorkingHour"
                          type="checkbox"
                          className="mr-[4px]"
                          // disabled={!fixedWorkingHourChecked}
                          style={{ appearance: 'auto' }}
                          defaultChecked={offsetWorkingHourChecked}
                          onClick={handleOffsetWorkingOurCheck}
                        />
                        <span className="text-base text-gray-500">
                          기본 근무시간 변경
                        </span>
                      </label>
                      {offsetWorkingHourChecked && (
                        <>
                          <input
                            type="number"
                            min={-999}
                            max={999}
                            defaultValue={
                             tempOffsetWorkingHour
                            }
                            className="flex-0 basis-[content] focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text border-gray-300 rounded-md text-end"
                            onChange={handleChangeOffsetWorkingHour}
                          />
                          <div>시간 (음수인 경우 차감)</div>
                        </>
                      )}
                    </div>
                  </div>

                  {/*<div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">*/}
                  {/*  <button*/}
                  {/*    type="button"*/}
                  {/*    className={clsx(*/}
                  {/*      'w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm focus:ring-blue-500 bg-blue-600 hover:bg-blue-700',*/}
                  {/*    )}*/}
                  {/*    onClick={handleClickSubmit}*/}
                  {/*  >*/}
                  {/*    저장*/}
                  {/*  </button>*/}
                  {/*  <button*/}
                  {/*    type="button"*/}
                  {/*    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"*/}
                  {/*    onClick={handleClickCancel}*/}
                  {/*  >*/}
                  {/*    취소*/}
                  {/*  </button>*/}
                  {/*</div>*/}
                </aside>
              </div>
            </div>
            <div
              className={clsx(
                'bg-gray-50 px-4 py-3',
                isFullMode
                  ? 'flex flex-row items-center'
                  : 'sm:px-6 sm:flex sm:flex-row-reverse',
              )}
            >
              <button
                type="button"
                className={clsx(
                  'w-full inline-flex justify-center rounded-md border shadow-sm px-4 py-2 text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2',
                  isFullMode
                    ? ' focus:ring-indigo-500 border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                    : 'sm:ml-3 sm:w-auto sm:text-sm focus:ring-blue-500 bg-blue-600 hover:bg-blue-700 border-transparent text-white',
                )}
                onClick={handleClickSubmit}
              >
                저장
              </button>
              <button
                type="button"
                className={clsx(
                  'w-full inline-flex justify-center rounded-md border shadow-sm px-4 py-2 text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2',
                  isFullMode
                    ? 'focus:ring-blue-500 bg-blue-600 hover:bg-blue-700 border-transparent text-white'
                    : 'focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm mt-3 border-gray-300 bg-white text-gray-700 hover:bg-gray-50',
                )}
                onClick={handleClickCancel}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsModal

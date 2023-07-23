import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import chrome from '../../../../../util/chrome'

export interface Props {
  onClose?: () => void
}

const DashboardModal = ({ onClose }: Props) => {
  const [workingChartData, setWorkingChartData] = useState<number[][]>(null)

  useEffect(() => {
    init()
  }, [])

  const init = async () => {
    try {
      const coreValues = await getCoreValues()
      const { workedDayInfos } = coreValues
      dayjs.extend(duration)

      let weeks: number[][] = Array(6).fill([0])
      weeks = weeks.map((week, index) => (week = Array(7).fill(0)))

      let weekCount = 0
      workedDayInfos.forEach((item) => {
        const { date: dateStr, workingMinutes } = item
        const date = dayjs(dateStr)
        console.log('day', dateStr, date.day())
        weeks[weekCount][date.day()] = workingMinutes

        if (date.day() === 6) {
          weekCount++
        }
      })

      console.log('weeks', weeks)
      setWorkingChartData(weeks)
    } catch (e) {
      console.error(e)
    }
  }

  const handleClickClose = (e) => {
    e.preventDefault()
    onClose?.()
  }

  const getCoreValues = async () => {
    const userWorkingInfo = await chrome.sendMessage('STORE', {
      type: 'GET',
      data: {
        key: 'userWorkingInfo',
      },
    })

    return JSON.parse(userWorkingInfo)
  }

  return (
    <div
      className="relative z-[11001]"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      <div className="fixed z-[2147483647] inset-0 overflow-y-auto">
        <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
          <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full w-fit">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="grid grid-cols-5 gap-2">
                {workingChartData?.flatMap((week, index) => {
                  return week
                    .filter((_, index) => {
                      return !(index === 0 || index === 6)
                    })
                    .map((day, index) => {
                      return <div>{day}</div>
                    })
                })}
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={handleClickClose}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardModal

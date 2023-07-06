import { MouseEvent, useEffect, useRef, useState } from 'react'
import BarChart from './component/ui/chart/BarChart'
import { CoreValues } from '../../common/type'
import HeatmapChart from './component/ui/chart/HeatmapChart'
import chrome from '../../common/util/chrome'

export type NoticeView = {
  title: string
  contents: string
  isNew: boolean
}

function App() {
  const [coreValues, setCoreValues] = useState<CoreValues>(null)
  const [moreCharts, setMoreCharts] = useState<boolean>(false)
  const refreshInterval = useRef<number>(null)

  const initialize = () => {}

  const refreshDashboard = async () => {
    const userWorkingInfo = await chrome.sendMessage('STORE', {
      type: 'GET',
      data: {
        key: 'userWorkingInfo',
      },
    })

    setCoreValues(JSON.parse(userWorkingInfo))
  }

  const startDashboardRefreshInterval = () => {
    refreshInterval.current = window.setInterval(() => {
      refreshDashboard()
    }, 2000)
  }

  useEffect(() => {
    initialize()

    startDashboardRefreshInterval()
    return () => destroy()
  }, [])

  const destroy = () => {
    window.clearInterval(refreshInterval.current)
  }

  // console.log('coreValues', coreValues)

  const handleClickMoreCharts = (e: MouseEvent<HTMLButtonElement>) => {
    setMoreCharts(!moreCharts)
  }

  return (
    <div className="flex flex-col border border-gray-200 rounded-lg p-[8px] ml-[16px] mr-[16px]">
      <h3 className="text-sm font-bold leading-6 text-gray-900 inline-block">
        FLEXER
      </h3>
      <div className="flex h-fit flex-col items-center">
        <span className="flex-shrink-0 font-bold m-[8px]">근무 시간</span>
        <div className="w-full">
          {coreValues && (
            <BarChart
              current={{
                value: Math.round((coreValues.workedMinutes / 60) * 10) / 10,
                label: '근무시간',
              }}
              max={{
                value: 240,
                label: '최대 근무시간',
              }}
              target={{
                value:
                  Math.round((coreValues.totalWorkingMinutes / 60) * 10) / 10,
                label: '소정 근로시간',
              }}
            />
          )}
        </div>
      </div>
      <div className="w-full">
        {moreCharts && (
          <div className="">
            <HeatmapChart dayWork={coreValues.workedDayInfos} />
          </div>
        )}
        <button
          onClick={handleClickMoreCharts}
          className="w-full p-[8px] flex justify-center bg-gray-100 border border-gray-200 hover:bg-gray-200 rounded-lg"
        >
          {moreCharts ? '추가 통계 접기' : '추가 통계 보기'}
        </button>
      </div>
    </div>
  )
}

export default App

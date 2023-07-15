import React, { useEffect, useRef, useState } from 'react'
import Indicator from './component/ui/atomic/Indicator'
import WidgetBody from './component/ui/layout/main/WidgetBody'
import WidgetHeader from './component/ui/layout/main/WidgetHeader'
import Widget from './component/ui/layout/main/Widget'
import WidgetLogo from './component/ui/layout/main/WidgetLogo'
import WidgetMoreButton from './component/ui/layout/main/WidgetMoreButton'
import { ajaxModule } from '../../common/util/ajax'
import chrome from '../../common/util/chrome'
import { getAllNotices } from './api/notice'
import dayjs from 'dayjs'
import date from '../../common/util/date'
import { useRecoilState } from 'recoil'
import { $settingsStore } from './store/settings'
import { CoreValues } from '../../common/type'
import ExpandButton from './component/ui/atomic/ExpandButton'
import SmallIndicator from './component/ui/atomic/SmallIndicator'
import clsx from 'clsx'
import { $configsStore } from './store/configs'

export type NoticeView = {
  title: string
  contents: string
  isNew: boolean
}

function FlexerApp({ isFullMode }: { isFullMode: boolean }) {
  const [userSchedule, setUserSchedule] = useState(null)
  const [now, setNow] = useState(Date.now())
  const [coreValues, setCoreValues] = useState<CoreValues>(null)
  const [requiredTotalWorkingTime, setRequiredTotalWorkingTime] =
    useState<string>(null)
  const [requiredAverageWorkingTime, setRequiredAverageWorkingTime] =
    useState<string>(null)
  const [
    requiredExtraWorkingTimeForContract,
    setRequiredExtraWorkingTimeForContract,
  ] = useState<string>(null)
  const [notices, setNotices] = useState<NoticeView[]>([])
  const [settingsStore, setSettingsStore] = useRecoilState($settingsStore)
  const [configsStore, setConfigsStore] = useRecoilState($configsStore)
  const refreshInterval = useRef<number>(null)
  const resizeObserver = useRef<ResizeObserver>(null)
  const [isExpanded, setExpanded] = useState<boolean>(true)
  const [init, setInit] = useState<boolean>(false)
  const [isNarrowUI, setNarrowUI] = useState<boolean>(false)

  const initExternalElement = () => {
    const flexRoot = document.getElementById('app-shell-root')
    const el = flexRoot.children[0].children[0] as HTMLElement
    el.style.zIndex = '1000'
  }

  const initialize = async () => {
    ajaxModule.init()
    !isFullMode && initExternalElement()

    initSettings()

    await showWidget()
    setInit(true)

    try {
      await fetchNotice()
    } catch (e) {
      console.warn(e)
    }
  }

  const initSettings = async () => {
    const isExpanded = await chrome.sendMessage('STORE', {
      type: 'GET',
      data: {
        key: 'userCustomSettings',
      },
    })

    setExpanded(!!JSON.parse(isExpanded)?.isExpanded)
  }

  const getSchedule = async () => {
    const userSchedule = await chrome.sendMessage('STORE', {
      type: 'GET',
      data: {
        key: 'userSchedule',
      },
    })

    return JSON.parse(userSchedule)
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

  const showWidget = async () => {
    const { startDate, endDate, isWorkingHourFixed, isWorkingHourEditable } =
      await getSettingsFromStorage()

    setSettingsStore({
      ...settingsStore,
      startDate,
      endDate,
      isWorkingHourFixed,
      isWorkingHourEditable,
    })

    const schedule = await getSchedule()
    const coreValues = await getCoreValues()

    if (!coreValues) {
      return
    }

    setUserSchedule(schedule)
    setCoreValues(coreValues)

    const remainMyWorkingMinutes = coreValues.remainMyWorkingMinutes
    const remainWorkingDays = coreValues.remainWorkingDays

    // const remainMyWorkingMinutes = 32 * 60 - 4
    // const remainWorkingDays = coreValues.remainWorkingDays

    setRequiredTotalWorkingTime(
      date.refineToViewTime(coreValues.requiredTotalWorkingMinutes),
    )

    // console.log('remainWorkingMinutes', remainMyWorkingMinutes)
    // console.log('remainWorkingDays', remainWorkingDays)

    const requiredAverageWorkingMinutes = getRequiredAverageWorkingTime(
      remainMyWorkingMinutes,
      remainWorkingDays,
    )

    setRequiredAverageWorkingTime(
      date.refineToViewTime(requiredAverageWorkingMinutes),
    )

    const remainExtraMinutesForContract = getRemainExtraTimeForContract(
      remainMyWorkingMinutes,
      remainWorkingDays,
    )

    setRequiredExtraWorkingTimeForContract(
      date.refineToViewTime(remainExtraMinutesForContract, false),
    )
  }

  const getSettingsFromStorage = async () => {
    let value = {
      startDate: undefined,
      endDate: undefined,
      isWorkingHourFixed: undefined,
      isWorkingHourEditable: undefined,
    }

    try {
      const storeUserSettings = await chrome.sendMessage('STORE', {
        type: 'GET',
        data: {
          key: 'userSettings',
        },
      })

      if (storeUserSettings) {
        value = JSON.parse(storeUserSettings)
      }
    } catch (e) {
      console.warn(e)
    }

    // if (date.isWorkingHourEditable(now) === false) {
    // value.isWorkingHourFixed = !date.isWorkingHourEditable(now)
    console.log('value!!', value)
    // await chrome.sendMessage('STORE', {
    //   type: 'SET',
    //   data: {
    //     key: 'userSettings',
    //     value: JSON.stringify(value),
    //   },
    // })
    // }

    const currentMonth = new Date().getMonth()

    return {
      startDate:
        value?.startDate && dayjs(value.startDate).month() === currentMonth
          ? dayjs(value.startDate).toDate()
          : undefined,
      endDate:
        value?.endDate && dayjs(value.endDate).month() === currentMonth
          ? dayjs(value.endDate).toDate()
          : undefined,
      isWorkingHourFixed: !!value?.isWorkingHourFixed,
      isWorkingHourEditable: date.isWorkingHourEditable(now),
    }
  }

  const fetchNotice = async () => {
    try {
      const lastReadTime =
        parseInt(
          await chrome.sendMessage('STORE', {
            type: 'GET',
            data: {
              key: 'lastReadTime',
            },
          }),
        ) || -1

      const now = Date.now()

      let notices = []

      // If more than 2 hours have passed since the last check
      if (lastReadTime + 1000 * 60 * 60 * 2 > now) {
        notices = JSON.parse(
          await chrome.sendMessage('STORE', {
            type: 'GET',
            data: {
              key: 'notice',
            },
          }),
        )
      } else {
        notices = (await getAllNotices()).data
        await chrome.sendMessage('STORE', {
          type: 'SET',
          data: {
            key: 'notice',
            value: JSON.stringify(notices),
          },
        })
      }

      setNotices(
        notices
          .sort((a, b) => b.date - a.date)
          .map((notice) => {
            return {
              title: notice.title,
              contents: notice.contents,
              isNew: notice.date > lastReadTime,
            }
          }),
      )
    } catch (e) {
      console.error(e)
    }
  }

  // move to the service layer after the global state structure is setup
  const getRequiredAverageWorkingTime = (
    remainWorkingMinutes: number,
    remainWorkingDays: number,
  ) => {
    const remainMinutes = remainWorkingMinutes / remainWorkingDays

    return remainMinutes
    // if (remainMinutes < 0 || remainWorkingDays <= 0) {
    //   return {
    //     hour: 0,
    //     minute: 0,
    //   }
    // }
    //
    // const hour = Math.floor(remainMinutes / 60)
    // const minute = Math.floor(remainMinutes % 60)
    //
    // return {
    //   hour,
    //   minute: Math.abs(minute),
    // }
  }

  const getRemainExtraTimeForContract = (
    remainMyWorkingMinutes: number,
    remainWorkingDays: number,
  ) => {
    return remainMyWorkingMinutes - 480 * remainWorkingDays
  }

  const handleClickTotalRequiredWorkingTime = (e) => {
    e.preventDefault()
  }

  const startWidgetRefreshInterval = () => {
    refreshInterval.current = window.setInterval(() => {
      showWidget()
    }, 2000)
  }

  const changeExpand = async (isExpanded) => {
    setExpanded(isExpanded)
    await chrome.sendMessage('STORE', {
      type: 'SET',
      data: {
        key: 'userCustomSettings',
        value: JSON.stringify({ isExpanded }),
      },
    })
  }

  useEffect(() => {
    initialize()

    startWidgetRefreshInterval()
    !isFullMode && addResizeEventListener()

    setConfigsStore({
      isFullMode,
    })

    return () => {
      destroy()
    }
  }, [])

  const addResizeEventListener = () => {
    try {
      const navEl = document
        .getElementById('app-shell-root')
        .querySelector('nav')
      resizeObserver.current = new ResizeObserver(handleResize)
      resizeObserver.current.observe(navEl)
    } catch (e) {}
  }

  const removeResizeObserver = () => {
    try {
      const navEl = document
        .getElementById('app-shell-root')
        .querySelector('nav')
      resizeObserver.current.unobserve(navEl)
    } catch (e) {}
  }

  const handleResize = (entries) => {
    setNarrowUI(entries[0].contentRect.width < 100)
  }

  useEffect(() => {
    isNarrowUI && changeExpand(false)
  }, [isNarrowUI])

  const destroy = () => {
    !isFullMode && removeResizeObserver()
    window.clearInterval(refreshInterval.current)
  }

  return (
    <Widget>
      <WidgetHeader isNarrow={isNarrowUI}>
        <WidgetLogo version="v1.4" isNarrow={isNarrowUI} />
        <div className="flex justify-center items-center">
          {/*<WidgetDashboardButton />*/}
          <WidgetMoreButton
            userSchedule={userSchedule}
            notices={notices}
            isNarrow={isNarrowUI}
          />
        </div>
      </WidgetHeader>
      <WidgetBody isExpanded={isExpanded}>
        {!isExpanded && (
          <div className={clsx('flex', isNarrowUI ? 'flex-col' : 'flex-row')}>
            <SmallIndicator
              title="이번달"
              content={
                coreValues &&
                date.refineToViewTime(coreValues.remainMyWorkingMinutes, true)
              }
              tooltipText={(() => {
                if (
                  isNaN(coreValues?.workedMinutes) ||
                  isNaN(coreValues?.requiredTotalWorkingMinutes)
                ) {
                  return ''
                }

                const workedViewTimes = date.refineToViewTime(
                  coreValues.workedMinutes,
                  true,
                )
                const requiredViewTimes = date.refineToViewTime(
                  coreValues.totalWorkingMinutes,
                  true,
                )

                const ratio =
                  Math.round(
                    (coreValues.workedMinutes /
                      coreValues.requiredTotalWorkingMinutes) *
                      10000,
                  ) / 100

                return `${workedViewTimes} / ${requiredViewTimes} (${ratio}%)`
              })()}
            />
            <SmallIndicator
              title={`필요평균`}
              content={requiredAverageWorkingTime}
            />
            <SmallIndicator
              title={'필요추가'}
              content={requiredExtraWorkingTimeForContract}
              tooltipText={
                '월 마지막 근무일까지 잔여일을 하루 8시간씩 근무하는 경우'
              }
            />
          </div>
        )}
        {isExpanded && (
          <>
            <Indicator
              title="이번 달 필요 근무시간"
              content={
                coreValues &&
                date.refineToViewTime(coreValues.remainMyWorkingMinutes, true)
              }
              tooltipText={(() => {
                if (
                  isNaN(coreValues?.workedMinutes) ||
                  isNaN(coreValues?.requiredTotalWorkingMinutes)
                ) {
                  return ''
                }

                const workedViewTimes = date.refineToViewTime(
                  coreValues.workedMinutes,
                  true,
                )
                const requiredViewTimes = date.refineToViewTime(
                  coreValues.totalWorkingMinutes,
                  true,
                )

                const ratio =
                  Math.round(
                    (coreValues.workedMinutes /
                      coreValues.requiredTotalWorkingMinutes) *
                      10000,
                  ) / 100

                return `${workedViewTimes} / ${requiredViewTimes} (${ratio}%)`
              })()}
            />
            <Indicator
              title="필요 평균 근무시간"
              content={requiredAverageWorkingTime}
            />
            <Indicator
              title="필요 추가 근무시간"
              content={requiredExtraWorkingTimeForContract}
              tooltipText={
                '월 마지막 근무일까지 잔여일을 하루 8시간씩 근무하는 경우'
              }
            />
          </>
        )}
        <div
          className={`flex justify-end w-full absolute ${
            isExpanded ? `right-[8px] bottom-[8px]` : `right-[1px] bottom-[1px]`
          }`}
        >
          {init && !isNarrowUI && (
            <ExpandButton
              defaultExpanded={isExpanded}
              onClick={(e, isExpanded) => changeExpand(isExpanded)}
            />
          )}
        </div>
      </WidgetBody>
    </Widget>
  )
}

export default FlexerApp

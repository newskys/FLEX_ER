import { useEffect, useRef } from 'react'
import { NextData } from '../../../common/type/api/ssr'
import { ajaxModule } from '../../common/util/ajax'
import { getSchedule, getUsers } from './api/user'
import {
  Day,
  WorkScheduleResultsResponse,
} from '../../../common/type/api/workScheduleResults'
import chrome from '../../common/util/chrome'
import dayjs from 'dayjs'
import date from '../../common/util/date'
import { StandardWorkingMinutes } from './constant/work'
import { CoreValues, DayWork } from '../../common/type'

interface Props {
  data?: NextData
}

function App({ data }: Props) {
  const userSchedule = useRef<any | null>(null)
  const userIdHash = useRef<string | null>(null)
  const now = Date.now()

  const initialize = async () => {
    ajaxModule.init()

    try {
      let i,
        queries = data.props.dehydratedState.queries.length
      for (i = 0; i < data.props.dehydratedState.queries.length; i++) {
        const currentUser =
          data.props.dehydratedState.queries[0].state.data.currentUser
        if (currentUser) {
          userIdHash.current = currentUser.user.userIdHash
          break
        }
      }
      if (i === queries) {
        throw new Error('userIdHash not found in Server Side Data')
      }
    } catch (e) {
      userIdHash.current = await getUserIdHash()
    }

    const schedule = await getSchedule(userIdHash.current, now, now)
    userSchedule.current = schedule

    await processSchedules(userIdHash.current, schedule)
  }

  const processSchedules = async (userIdHash: string, schedule) => {
    const userSettings = await getSettingsFromStorage()
    console.log('userSettings', userSettings)
    const coreValues: CoreValues = calcCoreValues(
      schedule,
      userSettings.startDate,
      userSettings.endDate,
      userSettings.isWorkingHourFixed,
    )

    saveSchedulesToStorage(schedule, coreValues)
  }

  const saveSchedulesToStorage = async (schedule, coreValues: CoreValues) => {
    await chrome.sendMessage('STORE', {
      type: 'SET',
      data: {
        key: 'userSchedule',
        value: JSON.stringify(schedule),
      },
    })
    await chrome.sendMessage('STORE', {
      type: 'SET',
      data: {
        key: 'userWorkingInfo',
        value: JSON.stringify(coreValues),
      },
    })
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

  const calcCoreValues = (
    schedule: WorkScheduleResultsResponse,
    startDate: Date | undefined,
    endDate: Date | undefined,
    isWorkingHourFixed: boolean,
  ) => {
    const {
      days,
      paidSummary: { baseWorkingMinutes, workingHolidayMinutes },
    } = schedule.workScheduleResults[0]
    const workedDayInfos = getWorkedDays(schedule, false, startDate)
    const workedMinutes = workedDayInfos.reduce(
      (acc, currentValue) => acc + currentValue.workingMinutes,
      0,
    )

    const requiredTotalWorkingMinutes = isWorkingHourFixed
      ? days.filter((day) => !isHoliday(day, false)).length *
        StandardWorkingMinutes
      : baseWorkingMinutes - workingHolidayMinutes

    const remainWorkingDays = getRemainWorkingDays(
      schedule,
      true,
      startDate,
      endDate,
    ).length

    const futureTimeOffMinutes =
      getFutureDayTimeOffDays(days, true) * StandardWorkingMinutes

    const joinCorrectionMinutes = getJoinCorrectionMinutes(days, startDate)
    const retireCorrectionMinutes = getRetireCorrectionMinutes(days, endDate)

    const totalWorkingMinutes =
      requiredTotalWorkingMinutes -
      futureTimeOffMinutes -
      joinCorrectionMinutes -
      retireCorrectionMinutes
    const remainMyWorkingMinutes = totalWorkingMinutes - workedMinutes

    return {
      requiredTotalWorkingMinutes,
      baseWorkingMinutes,
      workingHolidayMinutes,
      futureTimeOffMinutes,
      totalWorkingMinutes,

      workedMinutes,
      workedDays: workedDayInfos.length,
      remainMyWorkingMinutes,
      remainWorkingDays,
      joinCorrectionMinutes,
      retireCorrectionMinutes,

      workedDayInfos,

      limitWorkingMinutes: (workedDayInfos.length + remainWorkingDays) * 624,
    }
  }

  const getUserIdHash = async () => {
    const users = await getUsers()
    return users.currentUser.user.userIdHash
  }

  const getJoinCorrectionMinutes = (
    days: Day[],
    startDate: Date,
    isFixedWorkingTime = true,
  ) => {
    if (!startDate) {
      return 0
    }

    const workingDaysBeforeJoin = days
      .filter((day) => new Date(day.date).getDate() < startDate.getDate())
      .filter((day) => !isHoliday(day, false)).length

    return (
      workingDaysBeforeJoin *
      (isFixedWorkingTime ? StandardWorkingMinutes : StandardWorkingMinutes)
    )
  }

  const getRetireCorrectionMinutes = (
    days: Day[],
    endDate: Date,
    isFixedWorkingTime = true,
  ) => {
    if (!endDate) {
      return 0
    }

    const workingDaysAfterRetire = days
      .filter((day) => new Date(day.date).getDate() > endDate.getDate())
      .filter((day) => !isHoliday(day, false)).length

    return (
      workingDaysAfterRetire *
      (isFixedWorkingTime ? StandardWorkingMinutes : StandardWorkingMinutes)
    )
  }

  const getFutureDayTimeOffDays = (days: Day[], includeToday = false) => {
    return days
      .filter(
        (day) =>
          new Date(day.date).getDate() > new Date().getDate() - +!!includeToday,
      )
      .filter((item) =>
        item.timeOffs.find((timeOff) => timeOff.timeOffRegisterUnit === 'DAY'),
      ).length
  }

  const getWorkedDays = (
    schedule,
    includeToday = false,
    startDate: Date | undefined,
  ) => {
    const days = schedule.workScheduleResults[0].days

    const refinedDays: DayWork[] = days
      .filter(
        (day) =>
          new Date(day.date).getDate() <
          Math.max(
            new Date().getDate() + +!!includeToday,
            startDate?.getDate() ?? 0,
          ),
      )
      .map((day) => {
        const timeOffs = day.timeOffs.reduce(
          (acc, currentValue) => acc + currentValue.usedMinutes,
          0,
        )
        const workingMinutes = day.workRecords
          .filter((record) => record.workFormType === 'WORK')
          .map((record) => {
            return (
              (record.blockTimeTo.timeStamp - record.blockTimeFrom.timeStamp) /
              60 /
              1000
            )
          })
          .reduce((acc, currentValue) => acc + currentValue, 0)
        return {
          date: day.date,
          workingMinutes: workingMinutes + timeOffs,
        }
      })

    return refinedDays
  }

  const getRemainWorkingDays = (
    schedule,
    includeToday = false,
    startDate: Date | undefined,
    endDate: Date | undefined,
  ) => {
    const days = schedule.workScheduleResults[0].days

    return days
      .filter(
        (day) =>
          new Date(day.date).getDate() >
          Math.max(
            new Date().getDate() - +!!includeToday,
            startDate ? startDate.getDate() - 1 : 0 ?? 0,
          ),
      )
      .filter((day) =>
        endDate ? new Date(day.date).getDate() <= endDate.getDate() : true,
      )
      .filter((day) => !isHoliday(day, true))
  }

  const isHoliday = (day: Day, includeMyVacation = false) => {
    if (day.customHoliday) {
      return true
    }

    if (
      day.dayWorkingType === 'WEEKLY_UNPAID_HOLIDAY' ||
      day.dayWorkingType === 'WEEKLY_PAID_HOLIDAY'
    ) {
      return true
    }

    if (
      includeMyVacation &&
      day.timeOffs.find((timeOff) => timeOff.timeOffRegisterUnit === 'DAY')
    ) {
      return true
    }

    return false
  }

  const startRefreshInterval = () => {
    window.setInterval(() => {
      processSchedules(userIdHash.current, userSchedule.current)
    }, 3000)
  }

  useEffect(() => {
    initialize().then(() => {
      startRefreshInterval()
    })
  }, [])

  return null
}

export default App

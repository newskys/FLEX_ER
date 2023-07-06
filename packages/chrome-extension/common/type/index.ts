export type CoreValues = {
  requiredTotalWorkingMinutes: number
  baseWorkingMinutes: number
  workingHolidayMinutes: number
  futureTimeOffMinutes: number
  totalWorkingMinutes: number

  workedMinutes: number
  workedDays: number
  remainMyWorkingMinutes: number
  remainWorkingDays: number
  joinCorrectionMinutes: number
  retireCorrectionMinutes: number

  limitWorkingMinutes: number

  workedDayInfos: DayWork[]
}

export type DayWork = {
  date: string
  workingMinutes: number
  timeOffMinutes?: number
}

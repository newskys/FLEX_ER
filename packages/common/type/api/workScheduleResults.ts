export interface PaidSummary {
  baseWorkingMinutes: number
  baseWeeklyPaidHolidayMinutes: number
  legalBaseWorkingMinutes: number
  actualWorkingMinutes: number
  actualWeeklyPaidHolidayMinutes: number
  timeOffMinutes: number
  holidayMinutes: number
  workingHolidayMinutes: number
  restMinutes: number
}

export interface UnpaidSummary {
  timeOffMinutes: number
  holidayMinutes: number
  restMinutes: number
}

export interface Period {
  unit: string
  unitCount: number
  zoneId: string
  from: string
  to: string
  applyTimeRangeFrom: number
  applyTimeRangeTo: number
}

export interface DeductionSummary {
  fullDayAbsentDays: number
  fullDayAbsentMinutes: number
}

export interface PeriodExceededSummary {
  regardedOverWorkMinutes: number
  overWorkMinutes: number
  holidayWorkMinutes: number
  holidayNightWorkMinutes: number
}

export interface WorkMinutesCalculationBasis {
  agreedWorkingMinutes: number
  statutoryWorkingMinutes: number
  statutoryMaxOverWorkingMinutes: number
  maxStatutoryTotalWorkingMinutes: number
}

export interface WorkFormResult {
  customerWorkFormId: string
  name: string
  type: string
  totalMinutes: number
  primary: boolean
}

export interface WorkFormSummary {
  workFormResults: WorkFormResult[]
}

export interface TimeOffSummary {
  timeOffResults: any[]
}

export interface LegalWorkMinutesSummary {
  normalWorkMinutes: number
  regardedOverWorkMinutes: number
  regardedOverNightWorkMinutes: number
  overWorkMinutes: number
  nightWorkMinutes: number
  holidayWorkMinutes: number
  overNightWorkMinutes: number
  holidayOverWorkMinutes: number
  holidayNightWorkMinutes: number
  holidayOverNightWorkMinutes: number
}

export interface BlockTimeFrom {
  zoneId: string
  timeStamp: number
}

export interface BlockTimeTo {
  zoneId: string
  timeStamp: number
}

export interface WorkBlock {
  blockTimeFrom: BlockTimeFrom
  blockTimeTo: BlockTimeTo
  legalCategory: string
}

export interface WorkRecord {
  userWorkRecordEventId: string
  customerWorkFormId: string
  blockTimeFrom: BlockTimeFrom
  blockTimeTo: BlockTimeTo
  eventSource: string
  eventStatus: string
  workFormType: string
  name: string
  workBlocks: WorkBlock[]
}

export interface Day {
  date: string
  applyTimeStampFrom: any
  applyTimeStampTo: any
  dayWorkingType: string
  customHoliday: boolean
  workRecords: WorkRecord[]
  timeOffs: TimeOffs[]
  workStartRecords: any[]
}

export interface TimeOffs {
  restMinutes: number
  timeOffPolicyId: string
  timeOffPolicyType: string
  timeOffRegisterUnit: 'DAY'
  usedMinutes: number
  usedPaidMinutes: number
  userTimeOffEventId: string
}

export interface WorkScheduleResult {
  userIdHash: string
  paidSummary: PaidSummary
  unpaidSummary: UnpaidSummary
  period: Period
  deductionSummary: DeductionSummary
  periodExceededSummary: PeriodExceededSummary
  workMinutesCalculationBasis: WorkMinutesCalculationBasis
  workFormSummary: WorkFormSummary
  timeOffSummary: TimeOffSummary
  legalWorkMinutesSummary: LegalWorkMinutesSummary
  days: Day[]
}

export interface WorkScheduleResultsResponse {
  workScheduleResults: WorkScheduleResult[]
}

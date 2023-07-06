export interface NowResponse {
    data: WorkingData[]
    summary: {
        plannedPaidMinutes: number
        targetWorkingDays: number
        targetWorkingMinutes: number
        workingMinutes: number
    }
}

export interface WorkingData {
    isTargetWorkingDay: boolean
    hasPaidTimeOff: boolean
    holiday: { name: string } | null
    workingMinutes: number
    date: {
        day: number
    }
    regardedWorkingMinutes: number
}
import { atom } from 'recoil'

export interface Settings {
  startDate: Date
  endDate: Date
  isWorkingHourEditable: boolean
  isWorkingHourFixed: boolean
  isExpanded: boolean
}

export const $settingsStore = atom<Settings>({
  key: 'settings',
  default: {
    startDate: null,
    endDate: null,
    isWorkingHourEditable: undefined,
    isWorkingHourFixed: undefined,
    isExpanded: true,
  },
})

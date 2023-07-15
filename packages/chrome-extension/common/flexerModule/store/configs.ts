import { atom } from 'recoil'

export interface Configs {
  isFullMode
}

export const $configsStore = atom<Configs>({
  key: 'settings',
  default: {
    isFullMode: false,
  },
})

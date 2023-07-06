import { atom } from 'recoil'

export interface Modal {
  isOpened: boolean
}

export const $modalStore = atom<Modal>({
  key: 'modal',
  default: {
    isOpened: false,
  },
})

import React, { useEffect, useRef, useState } from 'react'
import Modal, { ModalData } from '../modal/Modal'
import { ajaxModule } from '../../../../../../common/util/ajax'
import { NoticeView } from '../../../../FlexerApp'
import Reddot from '../../atomic/Reddot'
import clsx from 'clsx'
import chrome from '../../../../../../common/util/chrome'
import SettingsModal from '../modal/SettingsModal'
import { useRecoilState } from 'recoil'
import { $settingsStore, Settings } from '../../../../store/settings'
import ModalPortal from '../modal/ModalPortal'
import { sendAnalytics } from '../../../../api/notice'

interface Props {
  userSchedule: any
  notices: NoticeView[]
  isNarrow: boolean
}

const WidgetMoreButton = ({ userSchedule, notices, isNarrow }: Props) => {
  const [isMenuOpened, setMenuOpened] = useState<boolean>(false)
  const [modalData, setModalData] = useState<ModalData>(null)
  const [hasNewNotice, setHasNewNotice] = useState<boolean>(false)
  const [settingsStore, setSettingsStore] =
    useRecoilState<Settings>($settingsStore)
  const [showSettingsModal, setShowSettingModal] = useState<boolean>(false)
  const moreButtonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    setHasNewNotice(!!notices.find((notice) => notice.isNew))
  }, [notices])

  const handleClickDimmed = (e) => {
    e.preventDefault()
    setMenuOpened(false)
  }

  const handleClickMore = (e) => {
    !isMenuOpened && sendAnalytics('click_more_button')
    setMenuOpened(!isMenuOpened)
  }

  const checkReadNotice = async () => {
    setHasNewNotice(false)
    await chrome.sendMessage('STORE', {
      type: 'SET',
      data: {
        key: 'lastReadTime',
        value: `${Date.now()}`,
      },
    })
  }

  const handleClickNotice = (e) => {
    e.preventDefault()

    checkReadNotice()
    setMenuOpened(false)
    setModalData({
      type: 'OK',
      title: notices[0].title,
      primaryButtonData: {
        title: '확인',
        onClick: () => {
          setModalData(null)
        },
      },
      contents: notices[0].contents,
    })

    sendAnalytics('click_notice_button')
  }

  const handleClickReport = (e) => {
    e.preventDefault()
    setMenuOpened(false)
    setModalData({
      type: 'OK',
      title: '버그 신고 & 건의',
      contents: '개발자에게 버그를 신고하거나, 기능을 건의합니다.',
      checkBoxData: {
        text: '익명으로 근무 로그를 전송합니다.',
        defaultValue: false,
      },
      inputData: {
        placeholder: '내용을 입력해주세요.',
        defaultValue: null,
      },
      primaryButtonData: {
        title: '보내기',
        onClick: async (e, userInput, checked) => {
          setModalData(null)
          await ajaxModule.external.post(
            'https://flexer-server.vercel.app/api/report',
            {
              title: userInput,
              data: checked ? userSchedule : {},
              summary: checked ? {} : {},
              date: Date.now(),
            },
          )
          setModalData({
            type: 'OK',
            title: '전달 완료',
            contents: '전달이 완료되었습니다.',
            primaryButtonData: {
              title: '확인',
              onClick: () => {
                setModalData(null)
              },
            },
          })
        },
      },
      secondaryButtonData: {
        title: '취소',
        onClick: () => {
          setModalData(null)
        },
      },
    })

    sendAnalytics('click_report_button')
  }

  const handleClickPropose = (e) => {
    e.preventDefault()
    setMenuOpened(false)
  }

  const handleClickSettings = async (e) => {
    e.preventDefault()
    setMenuOpened(false)
    setShowSettingModal(true)
    sendAnalytics('click_settings_button')
  }

  const handleClickSubmitSettingModal = async (settingModalData) => {
    setShowSettingModal(false)
    sendAnalytics('click_settings_submit_button', {
      isWorkingHourFixed: settingModalData.isWorkingHourFixed,
    })

    await chrome.sendMessage('STORE', {
      type: 'SET',
      data: {
        key: 'userSettings',
        value: JSON.stringify(settingModalData),
      },
    })
  }

  const handleClickCloseSettingModal = () => {
    setShowSettingModal(false)
  }

  return (
    <>
      {isMenuOpened && (
        <div
          className="inset-0 w-full h-full absolute z-[11001]"
          onClick={handleClickDimmed}
        />
      )}
      {modalData && (
        <ModalPortal>
          <Modal {...modalData} />
        </ModalPortal>
      )}
      {showSettingsModal && (
        <ModalPortal>
          <SettingsModal
            settingsStore={settingsStore}
            onSubmit={handleClickSubmitSettingModal}
            onCancel={handleClickCloseSettingModal}
          />
        </ModalPortal>
      )}

      <div className="relative w-fit h-fit">
        <button ref={moreButtonRef} onClick={handleClickMore}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            />
          </svg>
        </button>
        {hasNewNotice && <Reddot className="right-[-6px]" />}
      </div>
      {isMenuOpened && moreButtonRef.current && (
        <>
          <div
            style={{
              left: `${
                moreButtonRef.current.getBoundingClientRect().right +
                (isNarrow ? 0 : -120)
              }px`,
              top: `${moreButtonRef.current.getBoundingClientRect().top}px`,
            }}
            className={`z-[2147483647] absolute mt-2 w-[120px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none`}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabIndex={-1}
          >
            <div className="py-1 flex flex-col items-end" role="none">
              {hasNewNotice && <Reddot className="top-[10px] right-[5px]" />}
              <a
                href="#"
                className={clsx(' text-gray-700 block px-4 py-2 text-sm')}
                role="menuitem"
                tabIndex={-1}
                onClick={handleClickNotice}
              >
                알림
              </a>
              <a
                href="#"
                className="text-gray-700 block px-4 py-2 text-sm"
                role="menuitem"
                tabIndex={-1}
                onClick={handleClickReport}
              >
                버그 신고 & 건의
              </a>
              <a
                href="#"
                className="text-gray-700 block px-4 py-2 text-sm"
                role="menuitem"
                tabIndex={-1}
                onClick={handleClickSettings}
              >
                설정
              </a>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default WidgetMoreButton

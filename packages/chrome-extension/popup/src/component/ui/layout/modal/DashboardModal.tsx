import React, { useRef } from 'react'

export interface Props {
  // settingsStore: Settings
  onClose?: () => void
}

const DashboardModal = ({ onClose }: Props) => {
  const startDateCheckRef = useRef<HTMLInputElement>(null)
  const endDateCheckRef = useRef<HTMLInputElement>(null)

  // const { startDate, endDate, isWorkingHourFixed } = settingsStore

  // const [fixedWorkingHourChecked, setFixedWorkingHourChecked] =
  //   useState<boolean>(!!isWorkingHourFixed)
  //
  // const [startDateChecked, setStartDateChecked] = useState<boolean>(!!startDate)
  // const [tempStartDate, setTempStartDate] = useState<Date>(startDate)
  //
  // const [endDateChecked, setEndDateChecked] = useState<boolean>(!!endDate)
  // const [tempEndDate, setTempEndDate] = useState<Date>(endDate)

  // useEffect(() => {
  //   if (settingsStore.isWorkingHourEditable === false) {
  //     setFixedWorkingHourChecked(true)
  //   }
  // }, [])
  //
  // useEffect(() => {
  //   if (!fixedWorkingHourChecked) {
  //     setStartDateChecked(false)
  //     setEndDateChecked(false)
  //     setTempStartDate(null)
  //     setTempEndDate(null)
  //     startDateCheckRef.current.checked = false
  //     endDateCheckRef.current.checked = false
  //   }
  // }, [fixedWorkingHourChecked])
  //
  // const handleFixedWorkingHourCheck = (e) => {
  //   setFixedWorkingHourChecked(!fixedWorkingHourChecked)
  // }
  // const handleStartDateCheck = (e) => {
  //   setStartDateChecked(!startDateChecked)
  // }
  // const handleEndDateCheck = (e) => {
  //   setEndDateChecked(!endDateChecked)
  // }
  //
  // const handleClickSubmit = (e) => {
  //   e.preventDefault()
  //
  //   if (!validate()) {
  //     return
  //   }
  //
  //   onSubmit({
  //     ...settingsStore,
  //     startDate: startDateChecked ? tempStartDate : null,
  //     endDate: endDateChecked ? tempEndDate : null,
  //     isWorkingHourFixed: fixedWorkingHourChecked,
  //     isWorkingHourEditable: settingsStore.isWorkingHourEditable,
  //   })
  // }
  //
  // const validate = () => {
  //   const currentMonth = dayjs().month() + 1
  //
  //   if (
  //     startDateChecked &&
  //     (!dayjs(tempStartDate).isValid() ||
  //       dayjs(tempStartDate).month() + 1 !== currentMonth)
  //   ) {
  //     alert('입사일을 확인해주세요. 입사일은 이번 달이어야 합니다.')
  //     return false
  //   }
  //   if (
  //     endDateChecked &&
  //     (!dayjs(tempEndDate).isValid() ||
  //       dayjs(tempEndDate).month() + 1 !== currentMonth)
  //   ) {
  //     alert('퇴사일을 확인해주세요. 퇴사일은 이번 달이어야 합니다.')
  //     return false
  //   }
  //   if (
  //     startDateChecked &&
  //     endDateChecked &&
  //     dayjs(tempStartDate).isAfter(dayjs(tempEndDate))
  //   ) {
  //     alert('입사일이 퇴사일보다 늦을 수 없습니다.')
  //     return false
  //   }
  //   return true
  // }
  //
  // const handleChangeStartDate = (e) => {
  //   setTempStartDate(e.target.value)
  // }
  //
  // const handleChangeEndDate = (e) => {
  //   setTempEndDate(e.target.value)
  // }

  const handleClickClose = (e) => {
    e.preventDefault()
    onClose?.()
  }

  // const getFirstDayOfMonth = (date: Date, formatStr: string) => {
  //   return dayjs(date).startOf('month').format(formatStr)
  // }
  //
  // const getLastDayOfMonth = (date: Date, formatStr: string) => {
  //   return dayjs(date).endOf('month').format(formatStr)
  // }

  return (
    <div
      className="relative z-[11001]"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      <div className="fixed z-[2147483647] inset-0 overflow-y-auto">
        <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center">
          <div className="relative bg-white text-left overflow-hidden w-fit">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="grid grid-cols-5 gap-2">
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={handleClickClose}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardModal

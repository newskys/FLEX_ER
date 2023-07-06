import React from 'react'
import Chart from 'react-apexcharts'
import { DayWork } from '../../../../../common/type'
import dayjs from 'dayjs'

interface Props {
  dayWork: DayWork[]
}

const HeatmapChart = ({ dayWork }: Props) => {
  const generateData = (count, minmax) => {
    const { min, max } = minmax

    const arr = []

    //generate random number between min and max
    for (let i = 0; i < count; i++) {
      const random = Math.floor(Math.random() * (max - min + 1)) + min
      console.log('random', random)
      arr.push(random)
    }

    return arr
  }

  const generateSeries = (dayWork: DayWork[]) => {
    const hasWeekendWork = dayWork.some(({ date }) => {
      const day = new Date(date).getDay()
      return day === 0 || day === 6 // 주말근무 1개라도 있는지 체크
    })

    const first = {
      name: '1주차',
      data: generateData(7, {
        min: 5,
        max: 10,
      }),
    }

    const firstDayOfWeek = new Date(dayWork[0].date).getDay()
    const totalDaysInMonth = dayjs(dayWork[0].date).daysInMonth()

    const prefixData =
      firstDayOfWeek > 0 ? Array<number>(firstDayOfWeek).fill(0) : []
    // const data: {
    //   date: Date
    //   workTime: string
    // } = []

    const data = dayWork
      // .filter(({ date: dateString }) => {
      //   const date = new Date(dateString)
      //   const isWeekend = date.getDay() === 0 || date.getDay() === 6
      //
      //   return hasWeekendWork || !isWeekend
      // })
      .map(({ date: dateString, workingMinutes }, index) => {
        return workingMinutes
        // return {
        //   date: new Date(dateString),
        //   workTime: date.refineToViewTime(workingMinutes, true),
        // }
      })

    const lastWorkDate = new Date(dayWork[dayWork.length - 1].date)
    const postfixData =
      lastWorkDate.getDate() < totalDaysInMonth
        ? Array<number>(
            Math.max(totalDaysInMonth - lastWorkDate.getDate(), 0),
          ).fill(0)
        : []

    const mergedData = [...prefixData, ...data, ...postfixData]
    console.log('postfixData', postfixData)

    const newArr: number[][] = []

    while (mergedData.length) {
      newArr.push(mergedData.splice(0, hasWeekendWork ? 7 : 5))
    }

    const series = newArr
      .map((arr, index) => {
        return {
          name: `${index + 1}주차`,
          data: arr,
        }
      })
      .reverse()

    // data[firstDayOfWeek] = dayWork[0]
    console.log(newArr)
    return series
  }

  dayWork && generateSeries(dayWork)

  return (
    <Chart
      width={'100%'}
      height={'500px'}
      options={{
        colors: ['#01C6C3'],
        chart: {
          // type: 'heatmap',
          toolbar: {
            show: false,
          },
          animations: {
            enabled: false,
          },
        },
        grid: {
          // show: false,
          // padding: {
          //   left: -15,
          //   top: -40,
          //   right: -10,
          //   bottom: -20,
          // },
        },
        // plotOptions: {
        //   bar: {
        //     horizontal: true,
        //     dataLabels: {
        //       position: 'top',
        //     },
        //   },
        // },
        // dataLabels: {
        //   enabled: true,
        //   style: {
        //     colors: ['#333'],
        //   },
        //   offsetX: 30,
        // },
        responsive: [
          {
            breakpoint: undefined,
            options: {},
          },
        ],
        xaxis: {
          categories: ['일', '월', '화', '수', '목', '금', '토'],
          // tickAmount: 10,
          // max: max.value,
          labels: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
        yaxis: {
          labels: {
            // offsetX: -30,
            show: false,
          },
        },
        states: {
          hover: {
            filter: {
              type: 'none',
            },
          },
          active: {
            filter: {
              type: 'none',
            },
          },
        },
        // colors: ['#01C6C3'],
        legend: {
          show: false,
          // showForSingleSeries: false,
          // customLegendItems: ['Actual', 'Expected'],
          // markers: {
          //   fillColors: ['#01C6C3', '#AA7AD9'],
          // },
        },
        tooltip: {
          enabled: true,
        },
      }}
      series={generateSeries(dayWork)}
      type="heatmap"
    />
  )
}

export default HeatmapChart

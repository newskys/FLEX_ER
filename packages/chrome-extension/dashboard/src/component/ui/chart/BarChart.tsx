import React from 'react'
import Chart from 'react-apexcharts'

interface Props {
  max: {
    value: number
    label: string
  }
  current: {
    value: number
    label: string
  }
  target: {
    value: number
    label: string
  }
}

const BarChart = ({ max, current, target }: Props) => {
  return (
    <Chart
      width={'100%'}
      height={'40px'}
      options={{
        chart: {
          type: 'bar',
          toolbar: {
            show: false,
          },
          animations: {
            enabled: false,
          },
        },
        grid: {
          show: false,
          padding: {
            left: -15,
            top: -40,
            right: -10,
            bottom: -20,
          },
        },
        plotOptions: {
          bar: {
            horizontal: true,
            dataLabels: {
              position: 'top',
            },
          },
        },
        dataLabels: {
          enabled: true,
          style: {
            colors: ['#333'],
          },
          offsetX: 30,
        },
        responsive: [
          {
            breakpoint: undefined,
            options: {},
          },
        ],
        xaxis: {
          tickAmount: 10,
          max: max.value,
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
            offsetX: -30,
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
        colors: ['#01C6C3'],
        legend: {
          show: false,
          showForSingleSeries: false,
          // customLegendItems: ['Actual', 'Expected'],
          markers: {
            fillColors: ['#01C6C3', '#AA7AD9'],
          },
        },
        tooltip: {
          enabled: true,
        },
      }}
      series={[
        {
          name: current.label,
          data: [
            {
              x: '',
              y: current.value,
              goals: [
                {
                  name: target.label,
                  value: target.value,
                  strokeWidth: 5,
                  strokeHeight: 10,
                  strokeColor: '#775DD0',
                },
              ],
            },
          ],
        },
      ]}
      type="bar"
    />
  )
}

export default BarChart

import Head from "next/head"
import Link from "next/link"
import dynamic from "next/dynamic"
import { useMemo, useCallback } from "react"

import useWorldTotalData from "../hooks/useWorldTotalData"
import Stack from "../components/common/stack"
import * as size from "../utils/size"
import * as color from "../utils/color"
import api from "../utils/api"

const Chart = dynamic(() =>
  import("react-charts").then(mod => mod.Chart),
  { ssr: false }
)

export default function Home() {
  const { status, data } = useWorldTotalData()

  return (
    <>
      <Head>
        <title>Main page</title>
      </Head>
      <Stack size={size.XL}>
        <h3>Global</h3>
      </Stack>
      <Stack size={size.XL}>
        {status === api.requestStatus.SUCCESS && <MyChart data={data} />}
      </Stack>
    </>
  )
}

function MyChart(props) {
  const sortedData = props.data
    .sort((a, b) => a.TotalConfirmed - b.TotalConfirmed)
    .map((data, index) => {
      const day = new Date()
      day.setDate(day.getDate() - props.data.length + index + 1)
      return {
        x: day,
        data
      }
    })

  const data = useMemo(
    () => [
      {
        label: 'Total Confirmed',
        data: sortedData.map(({x, data}) => ({
          x,
          y: data.TotalConfirmed
        })),
      },
      {
        label: 'Total Recovered',
        data: sortedData.map(({x, data}) => ({
          x,
          y: data.TotalRecovered
        })),
      },
      {
        label: 'Total Deaths',
        data: sortedData.map(({x, data}) => ({
          x,
          y: data.TotalDeaths
        })),
      },
    ],
    []
  )

  const axes = React.useMemo(
    () => [
      { primary: true, type: 'time', position: 'bottom' },
      { type: 'linear', position: 'left' },
    ],
    []
  )

  const series = useMemo(
    () => ({
      showPoints: false
    }),
    []
  )

  const primaryCursor = React.useMemo(
    () => ({
      render: props => (
        <span>
          {new Date(props.value).toDateString()}
        </span>
      )
    }),
    []
  )

  const colorPalette = {
    "Total Confirmed": color.toHSL(color.RED),
    "Total Recovered": color.toHSL(color.GREEN),
    "Total Deaths": color.toHSL(color.GRAY),
    "Total Actives": color.toHSL(color.ORANGE),
  };

  const getSeriesStyle = useCallback(
    (series) => ({
      transition: 'all .5s ease',
      fill: colorPalette[series.label],
      color: colorPalette[series.label],
    }),
    []
  )

  return (
    <div
      style={{
        width: '100%',
        height: '400px',
      }}
    >
      <Chart
        dark
        tooltip
        primaryCursor={primaryCursor}
        data={data}
        axes={axes}
        series={series}
        getSeriesStyle={getSeriesStyle}
      />
    </div>
  )
}

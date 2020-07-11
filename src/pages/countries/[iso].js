import Head from 'next/head'
import dynamic from "next/dynamic"
import { useMemo, useCallback } from "react"

import Stack from "components/common/stack"
import Summary from "components/common/summary"
import useCountryData from "api/hooks/useCountryData"
import useCountrySummary from "api/hooks/useCountrySummary"
import api from "api/api"
import * as size from 'utils/size'
import * as color from "utils/color"

const Chart = dynamic(
  () => import("react-charts").then(mod => mod.Chart),
  { ssr: false }
)

export async function getServerSideProps({ params: { iso } }) {
  return { props: { iso } }
}

export default function Country({ iso }) {
  const countryData = useCountryData(iso)

  return (
    <>
      <Head>
        <title>{iso}</title>
      </Head>
      <Stack size={size.M}>
        <h3>{iso}</h3>
      </Stack>
      <Stack size={size.XL}>
        <StatsSummary iso={iso} />
      </Stack>
      <section>
        <Stack size={size.M}>
          <h4>Spread over time</h4>
        </Stack>
        {/* <MyChart data={data || []} /> */}
      </section>
    </>
  )
}

function StatsSummary({ iso }) {
  const countrySummary = useCountrySummary(iso)

  if (api.isError(countrySummary)) {
    <div>Error</div>
  }

  if (api.isLoading(countrySummary)) {
    return <div>Loading...</div>
  }

  if (api.isSuccess(countrySummary)) {
    return <Summary.Cards data={api.getResult(countrySummary)} />
  }

  return null
}

function Skeleton() {
  return (
    <h3>Loading...</h3>
  )
}

function MyChart(props) {
  const items = props.data.map(country => ({
    ...country,
    Date: new Date(country.Date)
  }))

  const data = useMemo(
    () => [
      {
        label: 'Confirmed',
        data: items.map(item => ({
          x: item.Date,
          y: item.Confirmed
        })),
      },
      {
        label: 'Recovered',
        data: items.map(item => ({
          x: item.Date,
          y: item.Recovered
        })),
      },
      {
        label: 'Deaths',
        data: items.map(item => ({
          x: item.Date,
          y: item.Deaths
        })),
      },
      {
        label: 'Actives',
        data: items.map(item => ({
          x: item.Date,
          y: item.Active
        })),
      },
    ],
    [props.data]
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

  const primaryCursor = useMemo(
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
    "Confirmed": color.toHSL(color.RED),
    "Recovered": color.toHSL(color.GREEN),
    "Deaths": color.toHSL(color.GRAY),
    "Actives": color.toHSL(color.ORANGE),
  };

  const getSeriesStyle = useCallback(
    (series) => ({
      transition: 'all .5s ease',
      fill: colorPalette[series.label],
      color: colorPalette[series.label],
    }),
    []
  )

  const getDatumStyle = useCallback(
    () => ({
      transition: 'all .5s ease',
    }),
    []
  )

  return (
    <div
      style={{
        width: '100%',
        height: '50vh',
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
        getDatumStyle={getDatumStyle}
      />
    </div>
  )
}

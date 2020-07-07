import Head from 'next/head'
import dynamic from "next/dynamic"
import { useMemo, useCallback } from "react"

import Stack from "../../components/common/stack"
import useSummaryData from "../../hooks/useSummaryData"
import useScreen, { screenType } from "../../hooks/useScreen"
import api from "../../utils/api"
import * as size from '../../utils/size'
import * as color from "../../utils/color"

const Chart = dynamic(
  () => import("react-charts").then(mod => mod.Chart),
  { ssr: false }
)
const SummaryCompact = dynamic(
  () => import("../../components/common/summary").then(mod => mod.Compact),
  { ssr: false }
)
const SummaryCards = dynamic(
  () => import("../../components/common/summary").then(mod => mod.Cards),
  { ssr: false }
)

export async function getServerSideProps({ params: { slug } }) {
  const data = await api.getCountryTotal(slug)
  return { props: { slug, data } }
}

export default function Country({ slug, data }) {
  const summary = useSummaryData()
  const screen = useScreen()

  if (summary.status === api.requestStatus.LOADING) {
    return <Skeleton />
  }

  if (summary.status == api.requestStatus.ERROR) {
    return <h3>Error</h3>
  }

  const country = summary.data.countriesMap[slug]
  return (
    <>
      <Head>
        <title>{country.Country}</title>
      </Head>
      <Stack size={size.M}>
        <h3>{country.Country}</h3>
      </Stack>
      <Stack size={size.XL}>
        {screen === screenType.PHONE || screen === screenType.TABLET
          ? <SummaryCompact data={country} />
          : <SummaryCards data={country} />
        }
      </Stack>
      <section>
        <Stack size={size.M}>
          <h4>Spread over time</h4>
        </Stack>
        <MyChart data={data || []} />
      </section>
    </>
  )
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

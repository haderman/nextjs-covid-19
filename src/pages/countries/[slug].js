import Head from 'next/head'
import dynamic from "next/dynamic"
import { useMemo, useCallback } from "react"

import Stack from "../../components/common/stack"
import Inline from "../../components/common/inline"
import Numeric from "../../components/common/numeric"
import Chip from "../../components/common/chip"
import { useAppState } from "../../components/contexts/appState"
import api from "../../utils/api"
import * as size from '../../utils/size'
import * as color from "../../utils/color"

const Chart = dynamic(() =>
  import("react-charts").then(mod => mod.Chart),
  { ssr: false }
)

export async function getServerSideProps({ params: { slug } }) {
  const data = await api.getCountryTotal(slug)
  return { props: { slug, data } }
}

export default function Country({ slug, data }) {
  const { summary } = useAppState()

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
        <ViewSummary country={country} />
      </Stack>
      <Stack size={size.XL}>
        <section>
          <Stack size={size.M}>
            <h4>Spread over time</h4>
          </Stack>
          <MyChart data={data || []} />
        </section>
      </Stack>
    </>
  )
}

function ViewSummary({ country }) {
  return (
    <section className="flex flex-children-1">
      <Inline size={size.M}>
        <Card
          topText="Total confirmed cases"
          middleText={country.TotalConfirmed}
          middleTextColor={color.RED}
          bottomText={country.NewConfirmed}
          bottomTextColor={color.RED_SOFT}
        />
      </Inline>
      <Inline size={size.M}>
        <Card
          topText="Active cases"
          middleText={country.TotalConfirmed - country.TotalRecovered - country.TotalDeaths}
          middleTextColor={color.ORANGE}
          bottomText={country.NewConfirmed - country.NewRecovered - country.NewDeaths}
          bottomTextColor={color.ORANGE_SOFT}
        />
      </Inline>
      <Inline size={size.M}>
        <Card
          topText="Recovered cases"
          middleText={country.TotalRecovered}
          middleTextColor={color.GREEN}
          bottomText={country.NewRecovered}
          bottomTextColor={color.GREEN_SOFT}
        />
      </Inline>
      <Inline>
        <Card
          topText="Total deaths cases"
          middleText={country.TotalDeaths}
          middleTextColor={color.GRAY}
          bottomText={country.NewDeaths}
          bottomTextColor={color.GRAY_SOFT}
      />
      </Inline>
    </section>
  )
}

function Card(props) {
  const {
    topText,
    middleText,
    bottomText,
    middleTextColor,
    bottomTextColor,
  } = props

  return (
    <article className="inset-m flex-1 flex column align-center rounded border-s border-color-soft">
      <Stack size={size.M}>
        <p className="text-secondary">{topText}</p>
      </Stack>
      <Stack size={size.M}>
        <h3 className={`text-secondary text-xl text-${middleTextColor}`}>
          <Numeric value={middleText} />
        </h3>
      </Stack>
      <Stack>
        <Chip
          size={size.M}
          rounded={size.XL}
          background={bottomTextColor}
        >
          {bottomText >= 0 && "+"}<Numeric value={bottomText} />
        </Chip>
      </Stack>
    </article>
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

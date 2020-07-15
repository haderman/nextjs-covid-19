import { useState } from "react"
import Head from 'next/head'
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import LayoutHorizontalIcon from "../../icons/layout-navbar.svg"
import LayoutVerticalIcon from "../../icons/layout-sidebar-right.svg"
import Stack from "components/common/stack"
import Numeric from "components/common/numeric"
import Chip from "components/common/chip"
import useCountryTimeSeries from "api/hooks/useCountryTimeSeries"
import useCountrySummary from "api/hooks/useCountrySummary"
import useMounted from "hooks/useMounted"
import useScreen, { screenType } from "hooks/useScreen"
import api from "api/api"
import * as size from 'utils/size'
import * as color from "utils/color"
import Inline from "components/common/inline";

export async function getServerSideProps({ params: { iso } }) {
  return { props: { iso } }
}

export default function Country({ iso }) {
  const [orientation, setOrientation] = useState("vertical")
  const handleClick = newOrientation => evt => {
    setOrientation(newOrientation)
  }

  const isMounted = useMounted()
  const screen = useScreen()
  const isLayoutButtonsVisible =
    isMounted && screen === screenType.DESKTOP || screen === screenType.BIG_DESKTOP

  return (
    <>
      <Head>
        <title>{iso}</title>
      </Head>
      <Header>
        <h3>{iso}</h3>
        {isLayoutButtonsVisible &&
          <span>
            <Inline size={size.M}>
              <button className="icon-button" onClick={handleClick("vertical")}>
                <LayoutVerticalIcon className={orientation === "vertical" ? "stroke-primary" : ""} />
              </button>
            </Inline>
            <button className="icon-button" onClick={handleClick("horizontal")}>
              <LayoutHorizontalIcon className={orientation === "horizontal" ? "stroke-primary" : ""} />
            </button>
          </span>
        }
      </Header>
      <section className="inset-l">
        <TimeSeries iso={iso} orientation={orientation} />
      </section>
    </>
  )
}

function Header({ children }) {
  const style = [
    "squish-inset-l",
    "border-bottom-s",
    "border-color-soft",
    "text-primary",
    "flex",
    "justify-space-between",
    "align-center",
    "full-width",
  ].join(" ")

  return (
    <header className={style}>
      {children}
    </header>
  )
}

function TimeSeries({ iso, orientation }) {
  const timeSeries = useCountryTimeSeries(iso)

  if (api.isError(timeSeries)) {
    return <TimeSeriesError error={timeSeries.error} />
  }

  if (api.isLoading(timeSeries)) {
    return <TimeSeriesLoading />
  }

  if (api.isSuccess(timeSeries)) {
    return <TimeSeriesChart data={api.getResult(timeSeries)} iso={iso} orientation={orientation} />
  }

  return null
}

function TimeSeriesError({ error }) {
  return <div>Error</div>
}

function TimeSeriesLoading() {
  return <div>Loading..</div>
}

function TimeSeriesChart({ data, iso, orientation}) {
  const byAscendingDates = (a,b) => a > b ? -1 : a < b ? 1 : 0
  const data_ = Object.entries(data)
    .map(([date, value]) => ({ ...value, date }))
    .map(item => ({ ...item, actives: item.confirmed - item.recovered - item.deaths }))
    .sort(byAscendingDates)


  const countrySummary = useCountrySummary(iso)
  const summary = api.getResult(countrySummary)

  const Layout = orientation === "vertical" ? VerticalLayout : HorizontalLayout

  return (
    <Layout>
      <article id="main-area-chart" className="inset-m border-s border-color-soft rounded">
        <ResponsiveContainer>
          <AreaChart id="test" data={data_} margin={{top: 10, right: 0, left: 10, bottom: 0}}>
            <defs>
              <linearGradient id="colorConfirmed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color.toHSL(color.RED)} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={color.toHSL(color.RED)} stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorRecovered" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color.toHSL(color.GREEN)} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={color.toHSL(color.GREEN)} stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorActives" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color.toHSL(color.ORANGE)} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={color.toHSL(color.ORANGE)} stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorDeaths" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color.toHSL(color.GRAY)} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={color.toHSL(color.GRAY)} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#333" strokeDasharray="2 2" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" stackId="1" dataKey="confirmed" stroke={color.toHSL(color.RED)} fill="url(#colorConfirmed)" />
            <Area type="monotone" stackId="2" dataKey="recovered" stroke={color.toHSL(color.GREEN)} fill="url(#colorRecovered)" />
            <Area type="monotone" stackId="3" dataKey="actives" stroke={color.toHSL(color.ORANGE)} fill="url(#colorActives)" />
            <Area type="monotone" stackId="4" dataKey="deaths" stroke={color.toHSL(color.GRAY)} fill="url(#colorDeaths)" />
          </AreaChart>
        </ResponsiveContainer>
      </article>
      <Card
        id="area-chart-1"
        title="Confirmed cases"
        primaryText={summary.confirmed}
        secondaryText={summary.newConfirmed}
        primaryColor={color.RED}
        secondaryColor={color.RED_SOFT}
        timeSeries={data_}
        dataKey="confirmed"
      />
      <Card
        id="area-chart-2"
        title="Active cases"
        primaryText={summary.confirmed - summary.recovered - summary.deaths}
        secondaryText={summary.newConfirmed - summary.newRecovered - summary.newDeaths}
        primaryColor={color.ORANGE}
        secondaryColor={color.ORANGE_SOFT}
        timeSeries={data_}
        dataKey="actives"
      />
      <Card
        id="area-chart-3"
        title="Recovered cases"
        primaryText={summary.recovered}
        secondaryText={summary.newRecovered}
        primaryColor={color.GREEN}
        secondaryColor={color.GREEN_SOFT}
        timeSeries={data_}
        dataKey="recovered"
      />
      <Card
        id="area-chart-4"
        title="Death cases"
        primaryText={summary.deaths}
        secondaryText={summary.newDeaths}
        primaryColor={color.GRAY}
        secondaryColor={color.GRAY_SOFT}
        timeSeries={data_}
        dataKey="deaths"
      />
    </Layout>
  )
}

function VerticalLayout({ children }) {
  return (
    <section key="vertical" className="layout-area-charts-vertical full-width full-height">
      {children}
    </section>
  )
}

function HorizontalLayout({ children }) {
  return (
    <section key="horizontal" className="layout-area-charts-horizontal full-width full-height">
      {children}
    </section>
  )
}

function Card(props) {
  const {
    title,
    primaryText,
    secondaryText,
    primaryColor,
    secondaryColor,
    timeSeries,
    dataKey,
    id
  } = props

  return (
    <article id={id} className="inset-m rounded border-s border-color-soft">
      <Stack size={size.XS}>
        <p className="text-secondary">{title}</p>
      </Stack>
      <Stack size={size.XS}>
        <h3 className={`text-secondary text-xl text-${primaryColor}`}>
          <Numeric value={primaryText} />
        </h3>
      </Stack>
      <Chip
        size={size.M}
        rounded={size.XL}
        background={secondaryColor}
      >
        {secondaryText >= 0 && "+"}<Numeric value={secondaryText} />
      </Chip>
      <div className="absolute top-0 left-0 full-width full-height">
        <ResponsiveContainer>
          <AreaChart id="test" data={timeSeries}>
            <defs>
              <linearGradient id={`${id}-color`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color.toHSL(primaryColor)} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={color.toHSL(primaryColor)} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Area type="monotone" stackId="2" dataKey={dataKey} stroke={color.toHSL(primaryColor)} fill={`url(#${id}-color)`} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </article>
  )
}

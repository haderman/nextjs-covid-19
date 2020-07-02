import Head from 'next/head'
import dynamic from "next/dynamic"
import { useMemo } from "react"
import Stack from "../../components/common/stack"
import Inline from "../../components/common/inline"
import Numeric from "../../components/common/numeric"
import Chip from "../../components/common/chip"
import { useAppState } from "../../components/contexts/appState"
import api from "../../utils/api"
import * as size from '../../utils/size'
import * as color from "../../utils/color"

/**
 * @link https://nextjs.org/docs/advanced-features/dynamic-import
 */
const Chart = dynamic(() =>
  import("react-charts").then(mod => mod.Chart),
  { ssr: false }
)

export async function getServerSideProps({ params: { slug } }) {
  console.log("slug: ", slug)
  return { props: { slug } }
}

export default function Country({ slug }) {
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
          <MyChart />
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
          + <Numeric value={bottomText} />
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

function MyChart() {
  const data = useMemo(
    () => [
      {
        label: 'Series 1',
        data: [
          { x: 1, y: 10 },
          { x: 2, y: 20 },
          { x: 3, y: 30 },
        ],
      },
      {
        label: 'Series 2',
        data: [
          { x: 1, y: 16 },
          { x: 2, y: 32 },
          { x: 3, y: 640 },
        ],
      },
      {
        label: 'Series 3',
        data: [
          { x: 1, y: 10 },
          { x: 2, y: 40 },
          { x: 3, y: 10 },
        ],
      },
    ],
    []
  )

  const axes = React.useMemo(
    () => [
      { primary: true, type: 'linear', position: 'bottom' },
      { type: 'linear', position: 'left' },
    ],
    []
  )

  return (
    <div
      style={{
        width: '100%',
        height: '400px',
      }}
    >
      <Chart data={data} axes={axes} dark />
    </div>
  )
}

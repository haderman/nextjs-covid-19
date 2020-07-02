import Head from "next/head"
import Link from "next/link"
import dynamic from "next/dynamic"
import { useMemo } from "react"

import Stack from "../components/common/stack"
import * as size from '../utils/size'

/**
 * @link https://nextjs.org/docs/advanced-features/dynamic-import
 */
const Chart = dynamic(() =>
  import("react-charts").then(mod => mod.Chart),
  { ssr: false }
)

export default function Home() {
  return (
    <>
      <Head>
        <title>Main page</title>
      </Head>
      <Stack size={size.XL}>
        <h3>Global</h3>
      </Stack>
      <Stack size={size.XL}>
        <MyChart />
      </Stack>
      <div className="text-primary">
        <Link href="/test">
          <a>Go to TEst Page</a>
        </Link>
      </div>
    </>
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

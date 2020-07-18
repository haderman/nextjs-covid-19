import Head from "next/head"
import Link from "next/link"
import dynamic from "next/dynamic"
import { useMemo, useCallback } from "react"

import Stack from "components/common/stack"
import useScreen, { screenType } from "hooks/useScreen"
import * as size from "utils/size"
import * as color from "utils/color"
import api from "api/api"
import useGlobalSummary from "api/hooks/useGlobalSummary"

import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";


// const Chart = dynamic(() =>
//   import("react-charts").then(mod => mod.Chart),
//   { ssr: false }
// )

const SummaryCards = dynamic(
  () => import("../components/common/summary").then(mod => mod.Cards),
  { ssr: false }
)

export default function Home() {
  // const { status, data } = useWorldTotalData()
  // const summary = useSummaryData()
  const globalSummary = useGlobalSummary()
  const screen = useScreen()

  const isSummaryCompactVisible = screen === screenType.PHONE || screen === screenType.TABLET

  return (
    <>
      <Head>
        <title>Main page</title>
      </Head>
      <Stack size={size.XL}>
        <h3>Global</h3>
        {isSummaryCompactVisible && api.isSuccess(globalSummary) &&
          <SummaryCards data={api.getResult(globalSummary)} />
        }
      </Stack>
    </>
  )
}

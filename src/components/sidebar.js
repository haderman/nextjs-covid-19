import Link from 'next/link'

import Stack from "./common/stack"
import Chip from "./common/chip"
import Numeric from "./common/numeric"
import Summary from "./common/summary"
import ListCountries from "./common/listCountries"
import useSummaryData from "../hooks/useSummaryData"

import api from "../utils/api"
import * as size from "../utils/size"
import prettyDate from "../utils/prettyDate"

function Sidebar() {
  const summary = useSummaryData()

  return (
    <aside className="background-deep-1 inset-m">
      <Stack size={size.XL}>
        <GlobalSummary summary={summary} />
      </Stack>
      <ListCountries />
    </aside>
  )
}

function GlobalSummary({ summary }) {
  return (
    <section>
      {summary.status === api.requestStatus.ERROR ?
        <h2 className="text-error">Error...</h2>
      :summary.status === api.requestStatus.LOADING ?
        <h2>Loading...</h2>
      :summary.status === api.requestStatus.SUCCESS ?
        <>
          <Stack size={size.XS}>
            <h3>Global cases</h3>
          </Stack>
          <Stack size={size.M}>
            <span className="text-secondary text-s">
              Updated <time>{prettyDate(summary.data.date)}</time>
            </span>
          </Stack>
          <Link href="/" passHref>
            <a>
              <Summary.Compact data={summary.data.global} />
            </a>
          </Link>
        </>
      :null
      }
    </section>
  )
}

export default Sidebar

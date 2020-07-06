import Link from 'next/link'

import Stack from "./common/stack"
import Chip from "./common/chip"
import Numeric from "./common/numeric"
import ListCountries from "./common/listCountries"
import useSummaryData from "../hooks/useSummaryData"

import api from "../utils/api"
import * as size from "../utils/size"
import * as color from "../utils/color"
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
          <Link href="/">
            <a className="block stretch-inset-m rounded border-s border-color-strong background-interactive">
              <Stack size={size.S}>
                <h4>Total confirmed cases</h4>
              </Stack>
              <Stack size={size.L}>
                <div className="flex justify-space-between align-center">
                  <h3 className="text-red text-xl">
                    <Numeric value={summary.data.global.TotalConfirmed} />
                  </h3>
                  <Chip rounded={size.L} background={color.RED_SOFT} size={size.S}>
                    + <Numeric value={summary.data.global.NewConfirmed} />
                  </Chip>
                </div>
              </Stack>
              <div className="grid grid-gap-m grid-col-3-auto">
                {/* row 1 */}
                <span className="text-secondary">Actives</span>
                <Numeric
                  value={summary.data.global.TotalConfirmed - summary.data.global.TotalRecovered - summary.data.global.TotalDeaths}
                  className="text-orange text-end"
                />
                <span className="text-end">
                  <Chip rounded={size.L} background={color.ORANGE_SOFT} size={size.S}>
                    + <Numeric value={summary.data.global.NewConfirmed} />
                  </Chip>
                </span>
                {/* row 2 */}
                <span className="text-secondary">Recovered</span>
                <Numeric
                  value={summary.data.global.TotalRecovered}
                  className="text-green text-end"
                />
                <span className="text-end">
                  <Chip rounded={size.L} background={color.GREEN_SOFT} size={size.S}>
                    + <Numeric value={summary.data.global.NewRecovered} />
                  </Chip>
                </span>
                {/* row 3 */}
                <span className="text-secondary">Deaths</span>
                <Numeric
                  value={summary.data.global.TotalDeaths}
                  className="text-gray text-end"
                />
                <span className="text-end">
                  <Chip rounded={size.L} background={color.GRAY_SOFT} size={size.S}>
                    + <Numeric value={summary.data.global.NewDeaths} />
                  </Chip>
                </span>
              </div>
            </a>
          </Link>
        </>
      :null
      }
    </section>
  )
}

export default Sidebar

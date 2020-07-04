import Link from 'next/link'

import Stack from "./common/stack"
import Inline from "./common/inline"
import Chip from "./common/chip"
import Numeric from "./common/numeric"
import { useAppState } from "./contexts/appState"

import api from "../utils/api"
import * as size from "../utils/size"
import * as color from "../utils/color"
import prettyDate from "../utils/prettyDate"

function Sidebar() {
  const { countries, summary } = useAppState()

  return (
    <aside className="background-deep-1 inset-m">
      <Stack size={size.XL}>
        <GlobalSummary summary={summary} />
      </Stack>
      <Stack size={size.XL}>
        <Countries countries={countries} summary={summary} />
      </Stack>
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
        <Link href="/">
          <a className="block stretch-inset-m rounded border-s border-color-strong border-dashed">
            <Stack size={size.L}>
              <h4>Total confirmed cases</h4>
            </Stack>
            <Stack size={size.L}>
              <span className="text-secondary text-s">
                Updated <time>{prettyDate(summary.data.date)}</time>
              </span>
            </Stack>
            <Stack size={size.L}>
              <h2 className="text-red">
                <Numeric value={summary.data.global.TotalConfirmed} />
              </h2>
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
      :null
      }
    </section>
  )
}

function Countries({ countries, summary }) {
  return (
    <section className="clean-last-stack">
      <Stack size={size.M}>
        <h3>Countries</h3>
      </Stack>
      <ul>
        {countries
          .map(country => summary.data?.countriesMap?.[country.Slug])
          .filter(countryInfo => countryInfo !== undefined && countryInfo.TotalConfirmed !== 0)
          .sort((a, b) => b.NewConfirmed - a.NewConfirmed)
          .map(countryInfo =>
            <Stack key={countryInfo.Country} size={size.S} as="li">
              <Link href="/countries/[slug]" as={`/countries/${countryInfo.Slug}`}>
                <a>
                  <article className="clean-last-stack flex justify-space-between align-center inset-s border-s border-color-strong rounded-s border-dashed">
                    <span className="text-m">{countryInfo.Country}</span>
                    {summary.status === api.requestStatus.LOADING ?
                      <span className="skeleton">
                        <Chip size={size.M}>000</Chip>
                      </span>
                    :summary.status === api.requestStatus.SUCCESS ?
                      <Chip
                        size={size.S}
                        rounded={size.XL}
                        background={color.DEEP_0}
                      >
                        + <Numeric value={countryInfo.NewConfirmed} />
                      </Chip>
                    :null
                    }
                  </article>
                </a>
              </Link>
            </Stack>
          )
        }
      </ul>
    </section>
  )
}

export default Sidebar

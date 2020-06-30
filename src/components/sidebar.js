import Link from 'next/link'
import useSWR from "swr"

import Stack from "./common/stack"
import Inline from "./common/inline"
import AppContext, { useAppState } from "./contexts/appState"

import api from "../utils/api"
import * as size from '../utils/size'

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
  const viewData = (key, value) => (
    <p>
      <span><b>{key.split(/(?=[A-Z])/).join(" ")}: </b></span>
      <span className="text-secondary">{value}</span>
    </p>
  )

  return (
    <section className="clean-last-stack">
      {summary.status === api.requestStatus.ERROR ?
        <h2 className="text-error">Error...</h2>
      :summary.status === api.requestStatus.LOADING ?
        <h2>Loading...</h2>
      :summary.status === api.requestStatus.SUCCESS ?
        <>
          {Object.entries(summary.data.global).map(([key, value]) =>
            <Stack key={key} size={size.S}>
              {viewData(key, value)}
            </Stack>
          )}
        </>
      :null
      }
    </section>
  )
}

function Countries({ countries, summary }) {
  const viewData = (country) => {
    const info = summary.data?.countriesMap?.[country.Slug] ?? {
      TotalConfirmed: 0,
      TotalRecovered: 0,
      TotalDeaths: 0
    }

    return (
      <article className="clean-last-stack">
        <Stack size={size.S}>
          <h4>{country.Country}</h4>
        </Stack>
        {summary.status === api.requestStatus.LOADING ?
          <Stack size={size.XS}>
            <Inline size={size.S}>
              <span className="skeleton">
                <Chip size={size.M}>000</Chip>
              </span>
            </Inline>
            <Inline size={size.S}>
              <span className="skeleton">
                <Chip size={size.M}>000</Chip>
              </span>
            </Inline>
            <Inline size={size.S}>
              <span className="skeleton">
                <Chip size={size.M}>000</Chip>
              </span>
            </Inline>
          </Stack>
        :summary.status === api.requestStatus.SUCCESS ?
          <Stack size={size.XS}>
            <Inline size={size.S}>
              <Chip size={size.M}>{info.TotalConfirmed}</Chip>
            </Inline>
            <Inline size={size.S}>
              <Chip size={size.M}>{info.TotalRecovered}</Chip>
            </Inline>
            <Inline size={size.S}>
              <Chip size={size.M}>{info.TotalDeaths}</Chip>
            </Inline>
          </Stack>
        :null
        }
      </article>
    )
  }

  return (
    <section className="clean-last-stack">
      <Stack size={size.M}>
        <h3>Countries</h3>
      </Stack>
      {countries.map((country, index) =>
        <Stack key={country.Country} size={size.L}>
          <Link href="/countries/[slug]" as={`/countries/${country.Slug}`}>
            <a>{viewData(country)}</a>
          </Link>
        </Stack>
      )}
    </section>
  )
}

function Chip({ children, size }) {
  return (
    <span className={`rounded squish-inset-xs border-s border-color-strong text-secondary text-${size}`}>
      {children}
    </span>
  )
}

Chip.propTypes = {
  size: size.isSize
}


export default Sidebar

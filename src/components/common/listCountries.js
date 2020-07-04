import Link from 'next/link'

import { useAppState } from "../contexts/appState"
import useSummaryData from "../../hooks/useSummaryData"
import Stack from "./stack"
import Chip from "./chip"
import Numeric from "./numeric"
import * as size from "../../utils/size"
import * as color from "../../utils/color"
import api from "../../utils/api"

export default function ListCountries() {
  const { countries } = useAppState()
  const summary = useSummaryData()

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
                <a className="flex justify-space-between align-center inset-s border-s border-color-strong rounded-s background-interactive">
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
                </a>
              </Link>
            </Stack>
          )
        }
      </ul>
    </section>
  )
}

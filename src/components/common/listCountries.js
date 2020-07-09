import { useAppState } from "../contexts/appState"
import useSummaryData from "hooks/useSummaryData"
import ActiveLink from "./activeLink"
import Stack from "./stack"
import Chip from "./chip"
import Numeric from "./numeric"
import * as size from "utils/size"
import * as color from "utils/color"
import api from "utils/api"
import StarIcon from "../../svg/star.svg"

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
          .map(countryInfo => {
            return (
              <Stack key={countryInfo.Country} size={size.S} as="li">
                <DetailRow status={summary.status} country={countryInfo} />
              </Stack>
            )
          })
        }
      </ul>
    </section>
  )
}

function CompactRow({ status, country }) {
  return (
    <ActiveLink
      passHref
      href="/countries/[slug]"
      as={`/countries/${country.Slug}`}
      activeClassName="background-interactive-selected"
    >
      <a className="flex justify-space-between align-center inset-s border-s border-color-strong rounded-s background-interactive">
        <span className="text-m">{country.Country}</span>
        {status === api.requestStatus.LOADING ?
          <span className="skeleton">
            <Chip size={size.M}>000</Chip>
          </span>
        :status === api.requestStatus.SUCCESS ?
          <Chip
            size={size.S}
            rounded={size.XL}
            background={color.DEEP_0}
          >
            + <Numeric value={country.NewConfirmed} />
          </Chip>
        :null
        }
      </a>
    </ActiveLink>
  )
}

function DetailRow({ status, country }) {
  const handleOnClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    console.log("clicked")
  }

  return (
    <ActiveLink
      passHref
      href="/countries/[slug]"
      as={`/countries/${country.Slug}`}
      activeClassName="background-interactive-selected"
    >
      <a className="flex justify-space-between align-center stretch-inset-m rounded">
        <span>
          <Stack size={size.S}>
            <p className="text-m">{country.Country}</p>
          </Stack>
          <span className="text-xs text-secondary">
            <span>New cases </span>
            <Chip
              size={size.XS}
              rounded={size.XL}
              background={color.RED_SOFT}
            >
              +<Numeric value={country.NewConfirmed} />
            </Chip>
          </span>
        </span>
        <button className="icon-button" onClick={handleOnClick}>
          <StarIcon className="icon-s" />
        </button>
      </a>
    </ActiveLink>
  )
}

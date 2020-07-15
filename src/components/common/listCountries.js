import { useAppState } from "../contexts/appState"
import useGlobalLatestData from "api/hooks/useGlobalLatestData"
import ActiveLink from "./activeLink"
import Stack from "./stack"
import Chip from "./chip"
import Numeric from "./numeric"
import * as size from "utils/size"
import * as color from "utils/color"
import api from "api/api"
import StarIcon from "../../icons/star.svg"
import Inline from "./inline"

export default function ListCountries() {
  const { countryNameToIso, countryNameToFlag } = useAppState()
  const latestInfoByCountry = useGlobalLatestData()

  return (
    <section className="clean-last-stack">
      <Stack size={size.M}>
        <h3>Countries</h3>
      </Stack>
      <ul>
        {Object
          .entries(countryNameToIso)
          .map(([name, iso]) => {
            const flag = countryNameToFlag?.[name]?.flag ?? "🏳️"
            const stats = api.getResult(latestInfoByCountry)?.[iso] ?? "#"
            return {
              iso,
              name,
              flag,
              ...stats
            }
          })
          .sort((a, b) => (b.confirmed || 0) - (a.confirmed || 0))
          .map(country =>
            <Stack key={country.name} size={size.S} as="li">
              <DetailRow country={country} />
            </Stack>
          )
        }
      </ul>
    </section>
  )
}

function CompactRow({ status, country }) {
  return (
    <ActiveLink
      passHref
      href="/countries/[iso]"
      as={`/countries/${country.iso}`}
      activeClassName="background-interactive-selected"
    >
      <a className="flex justify-space-between align-center inset-s border-s border-color-strong rounded-s background-interactive">
        <span className="text-m">{country.name}</span>
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
            <Numeric value={country.NewConfirmed} />
          </Chip>
        :null
        }
      </a>
    </ActiveLink>
  )
}

function DetailRow({ country }) {
  const handleOnClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    console.log("clicked")
  }

  return (
    <ActiveLink
      passHref
      href="/countries/[iso]"
      as={`/countries/${country.iso}`}
      activeClassName="background-interactive-selected"
    >
      <a className="flex justify-space-between align-center stretch-inset-m rounded">
        <Inline size={size.L}>
          <span className="text-l">
            {country.flag}
          </span>
        </Inline>
        <span className="text-left flex-1">
          <Stack size={size.S}>
            <p className="text-m">{country.name}</p>
          </Stack>
          <span className="text-xs text-secondary">
            <span>Confirmed: </span>
            <Chip
              size={size.XS}
              rounded={size.XL}
              background={color.RED_SOFT}
            >
              <Numeric value={country.confirmed} />
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
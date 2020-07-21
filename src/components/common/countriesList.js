import { useAppState } from "../contexts/appState"
import useGlobalLatestData from "api/hooks/useGlobalLatestData"
import ActiveLink from "./activeLink"
import Stack from "./stack"
import Chip from "./chip"
import Numeric from "./numeric"
import * as size from "utils/size"
import * as color from "utils/color"
import favorites from "utils/favorites"
import api from "api/api"
import Inline from "./inline"
import FavoriteButton from "./favoriteButton"


function useCountriesListData() {
  const { countryNameToIso, countryNameToFlag } = useAppState()
  const latestInfoByCountry = useGlobalLatestData()

  function composeCountry([name, iso]) {
    return {
      iso,
      name,
      flag: countryNameToFlag?.[name]?.flag ?? "🏳️",
      ...(api.getResult(latestInfoByCountry)?.[iso] ?? {})
    }
  }

  function highToLow(a, b) {
    return (b.confirmed || 0) - (a.confirmed || 0)
  }

  return Object
    .entries(countryNameToIso)
    .map(composeCountry)
    .sort(highToLow)
}

export default function CountriesList() {
  const countriesList = useCountriesListData()

  return (
    <Stack as="ul" size={size.S}>
      {countriesList.map(country =>
        <li key={country.name} className="full-width">
          <DetailRow country={country} />
        </li>
      )}
    </Stack>
  )
}

export function FavoritesCountriesList() {
  const countriesList = useCountriesListData()
  const favoritesList = favorites.useFavoritesList()
  const isFavorite = country => favoritesList.values.includes(country.iso)

  return (
    <Stack as="ul" size={size.S}>
      {countriesList
        .filter(isFavorite)
        .map(country =>
        <li key={country.name} className="full-width">
          <DetailRow country={country} />
        </li>
      )}
    </Stack>
  )
}

function DetailRow({ country }) {
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
          <Stack as="span" size={size.S}>
            <p className="text-m">{country.name}</p>
            <p className="text-xs text-secondary">
              <span>Confirmed: </span>
              <Chip
                size={size.XS}
                rounded={size.XL}
                background={color.RED_SOFT}
              >
                <Numeric value={country.confirmed} />
              </Chip>
            </p>
          </Stack>
        </Inline>
        <FavoriteButton iso={country.iso} size={size.S} />
      </a>
    </ActiveLink>
  )
}

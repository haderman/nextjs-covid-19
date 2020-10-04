import PropTypes from 'prop-types';
import ActiveLink from "./activeLink"
import Stack from "./stack"
import Chip from "./chip"
import Numeric from "./numeric"
import useMounted from "hooks/useMounted"
import * as size from "utils/size"
import * as color from "utils/color"
import favorites from "utils/favorites"
import Inline from "./inline"
import FavoriteButton from "./favoriteButton"

function descending(a, b) {
  return b.totalCases.confirmed - a.totalCases.confirmed;
}

CountriesList.propTypes = {
  allCountries: PropTypes.array,
};

export default function CountriesList({ allCountries }) {
  return (
    <Stack as="ul" size={size.S}>
      {allCountries
        .sort(descending)
        .map(country =>
          <li key={country.iso} className="full-width hover-control hover-control-adjacents">
            <DetailRow country={country} />
          </li>
        )}
    </Stack>
  );
}

FavoritesCountriesList.propTypes = {
  allCountries: PropTypes.array,
};

export function FavoritesCountriesList({ allCountries }) {
  const favoritesList = favorites.useFavoritesList();
  const isFavorite = country => favoritesList.values.includes(country.iso);

  return (
    <Stack as="ul" size={size.S}>
      {allCountries
        .filter(isFavorite)
        .map(country =>
          <li key={country.iso} className="full-width hover-control">
            <DetailRow country={country} />
          </li>
      )}
    </Stack>
  );
}

function DetailRow({ country }) {
  const isMounted = useMounted()
  return (
    <ActiveLink
      passHref
      href="/countries/[iso]"
      as={`/countries/${country.iso}`}
      activeClassName="background-interactive-selected selected"
    >
      <a className="flex justify-space-between align-center stretch-inset-m rounded background-interactive:hover">
        <Inline size={size.L}>
          <img
            loading="lazy"
            className="icon-s"
            src={country.info.flag}
            alt={`Flag of ${country.info.name}`}
          />
          <Stack as="span" size={size.S}>
            <p className="text-m">{country.info.name}</p>
            <p className="text-xs text-secondary">
              <span>Confirmed: </span>
              <Chip
                size={size.XS}
                rounded={size.XL}
                background={color.RED_SOFT}
              >
                <Numeric value={country.totalCases.confirmed} />
              </Chip>
            </p>
          </Stack>
        </Inline>
        {isMounted && (
          <span className="display:hover">
            <FavoriteButton iso={country.iso} size={size.S} />
          </span>
        )}
      </a>
    </ActiveLink>
  )
}

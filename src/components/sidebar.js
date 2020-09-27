import PropTypes from 'prop-types'
import classNames from 'classnames'
import * as size from "utils/size"
import usePersistedState from "hooks/usePersistedState"
import ActiveLinke from "./common/activeLink"
import Numeric from "./common/numeric"
import Stack from "./common/stack"
import Inline from "./common/inline"
import CountriesList, { FavoritesCountriesList } from "./common/countriesList"
import ListIcon from "../icons/list.svg"
import HeartIcon from "../icons/heart.svg"

Sidebar.propTypes = {
  allCountries: PropTypes.array,
  worldTotalCases: PropTypes.object,
  worldTotalNewCases:  PropTypes.object,
};

export default function Sidebar({ allCountries, worldTotalCases, worldTotalNewCases }) {
  return (
    <aside className="squish-inset-l">
      <Stack size={size.XL}>
        <GlobalCases worldTotalCases={worldTotalCases} />
        <Countries allCountries={allCountries} />
      </Stack>
    </aside>
  )
}

function GlobalCases({ worldTotalCases }) {
  return (
    <Stack as="section" size={size.M}>
      <h2>Global cases</h2>
      <ActiveLinke href="/" passHref activeClassName="background-deep-1">
        <a className="">
          <GlobalCasesData {...worldTotalCases} />
        </a>
      </ActiveLinke>
    </Stack>
  )
}

GlobalCasesData.propTypes = {
  confirmed: PropTypes.number,
  recovered: PropTypes.number,
  deaths: PropTypes.number,
  actives: PropTypes.number,
}

function GlobalCasesData({ confirmed, recovered, deaths, actives }) {
  const activesPercentage = Math.floor((actives / confirmed) * 100)
  const deathsPercentage = Math.floor((deaths / confirmed) * 100)

  const deathsGradientStop = `var(--color-gray) ${deathsPercentage}%`
  const recoveredGradientStop = `var(--color-green) ${activesPercentage}%`
  const activesGradientStop = `var(--color-orange) ${deathsPercentage}%, var(--color-orange) ${activesPercentage}%`
  const background = `linear-gradient(to left, ${deathsGradientStop}, ${activesGradientStop}, ${recoveredGradientStop})`

  return (
    <Stack as="article" size={size.M}>
      <Stack size={size.XS}>
        <h3 className="text-s">Confirmed</h3>
        <span className="text-red text-l">
          <Numeric value={confirmed} />
        </span>
      </Stack>
      <Stack size={size.S}>
        <div className="full-width inset-xs rounded" style={{ background }}></div>
        <Inline size={size.L}>
          <Stack size={size.XS}>
            <h3 className="text-xs">Recovered</h3>
            <span className="text-green text-m">
              <Numeric value={recovered} />
            </span>
          </Stack>
          <Stack size={size.XS}>
            <h3 className="text-xs">Actives</h3>
            <span className="text-orange text-m">
              <Numeric value={actives} />
            </span>
          </Stack>
          <Stack size={size.XS}>
            <h3 className="text-xs">Deaths</h3>
            <span className="text-gray text-m">
              <Numeric value={deaths} />
            </span>
          </Stack>
        </Inline>
      </Stack>
    </Stack>
  )
}

function Countries({ allCountries }) {
  const [activedTab, setActivedTab] = usePersistedState("sidebar-actived-tab", "all-countries")
  return (
    <Stack as="section" size={size.M}>
      <h2>Countries</h2>
      <Tabs value={activedTab} onChange={setActivedTab}/>
      {activedTab === "all-countries"
        ? <CountriesList allCountries={allCountries} />
        : <FavoritesCountriesList allCountries={allCountries} />
      }
    </Stack>
  )
}

Tabs.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
}

function Tabs({ value, onChange }) {
  const handleOnClick = newValue => () => {
    onChange(newValue)
  }

  const isAllActived = value === "all-countries"
  const isFavoritesActived = value === "favorite-countries"
  const baseButtonClassNames = "inset-s flex-1 flex column align-center justify-center background-interactive:hover"

  return (
    <div className="flex border-s border-color-soft rounded-m overflow-hidden">
      <button
        onClick={handleOnClick("all-countries")}
        className={classNames(
          baseButtonClassNames,
          "border-right-s border-color-soft",
          { "background-interactive-selected": isAllActived }
        )}
      >
        <ListIcon className={classNames({ "stroke-primary": isAllActived })} />
        <span className={isAllActived ? "color-primary" : "text-secondary"}>
          All
        </span>
      </button>
      <button
        onClick={handleOnClick("favorite-countries")}
        className={classNames(
          baseButtonClassNames,
          { "background-interactive-selected": isFavoritesActived }
        )}
      >
        <HeartIcon className={classNames({ "app_heart_icon_fill_primary": isFavoritesActived })} />
        <span className={isFavoritesActived ? "color-primary" : "text-secondary"}>
          Favorites
        </span>
      </button>
    </div>
  )
}


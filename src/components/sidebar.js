import PropTypes from 'prop-types'
import classNames from 'classnames'
import useGlobalSummary from "api/hooks/useGlobalSummary"
import api from "api/api"
import * as size from "utils/size"
import usePersistedState from "hooks/usePersistedState"
import ActiveLinke from "./common/activeLink"
import Stack from "./common/stack"
import Summary from "./common/summary"
import CountriesList, { FavoritesCountriesList } from "./common/countriesList"
import ListIcon from "../icons/list.svg"
import HeartIcon from "../icons/heart.svg"

function Sidebar() {
  const globalSummary = useGlobalSummary()

  return (
    <aside className="background-deep-0 inset-m">
      <Stack size={size.XL}>
        <GlobalCount summary={globalSummary} />
        <Countries />
      </Stack>
    </aside>
  )
}

function GlobalCount() {
  const summary = useGlobalSummary()

  if (api.isLoading(summary)) {
    return (
      <section>
        <div>loading</div>
      </section>
    )
  }

  if (api.isError(summary)) {
    return (
      <section>
        <div>Error</div>
      </section>
    )
  }

  return (
    <Stack as="section" size={size.S}>
      <h3>Global cases</h3>
      <ActiveLinke href="/" passHref activeClassName="background-deep-1">
        <a>
          <Summary.Compact data={api.getResult(summary)} />
        </a>
      </ActiveLinke>
    </Stack>
  )
}

function Countries() {
  const [activedTab, setActivedTab] = usePersistedState("sidebar-actived-tab", "all-countries")
  return (
    <Stack as="section" size={size.M}>
      <h2>Countries</h2>
      <Tabs value={activedTab} onChange={setActivedTab}/>
      {activedTab === "all-countries"
        ? <CountriesList />
        : <FavoritesCountriesList />
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

  const baseButtonClassNames = "inset-s flex-1 flex column align-center justify-center"

  return (
    <div className="flex border-s border-color-soft">
      <button
        onClick={handleOnClick("all-countries")}
        className={classNames(
          baseButtonClassNames,
          "border-right-s border-color-soft",
          { "background-deep-1": isAllActived }
        )}
      >
        <ListIcon className={classNames({ "stroke-primary": isAllActived })} />
        <span className={isAllActived ? "color-primary" : "text-secondary"}>
          All
        </span>
      </button>
      <button
        onClick={handleOnClick("favorite-countries")}
        className={classNames(baseButtonClassNames, { "background-deep-1": isFavoritesActived })}
      >
        <HeartIcon className={classNames({ "stroke-green": isFavoritesActived })} />
        <span className={isFavoritesActived ? "text-green" : "text-secondary"}>
          Favorites
        </span>
      </button>
    </div>
  )
}

export default Sidebar

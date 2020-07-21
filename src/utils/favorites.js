import PropTypes from 'prop-types'
import { createContext, useContext } from "react"
import usePersistedState from "../hooks/usePersistedState"

const Context = createContext()

Provider.propTypes = {
  children: PropTypes.node
}

function Provider({ children }) {
  const [favoritesList, setFavoritesList] = usePersistedState("favorites", [])
  const value = {
    values: favoritesList,
    add: iso => {
      setFavoritesList(list => ([...list, iso]))
    },
    remove: iso => {
      setFavoritesList(list => list.filter(item => item !== iso))
    }
  }
  return <Context.Provider value={value}>{children}</Context.Provider>
}

function useFavoritesList() {
  return useContext(Context)
}

export default {
  Context,
  Provider,
  useFavoritesList,
}

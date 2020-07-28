import PropTypes from 'prop-types'
import { SWRConfig } from "swr"

import Layout from "components/layout"
import AppState from "components/contexts/appState"
import settings from "utils/settings"
import favorites from "utils/favorites"
import "styles/utils.css"
import "styles/layouts.css"
import "styles/app.css"

import countryNameToIso from "../data/country_name_to_iso.json"
import countryNameToFlag from "../data/country_flags.json"

App.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
}

function App({ Component, pageProps }) {
  const store = { countryNameToIso, countryNameToFlag }

  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        revalidateOnMount:true,
        revalidateOnReconnect: false,
        refreshWhenOffline: false,
        refreshWhenHidden: false,
        refreshInterval: 0
      }}
    >
      <AppState.Provider value={store}>
        <settings.Provider>
          <favorites.Provider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </favorites.Provider>
        </settings.Provider>
      </AppState.Provider>
    </SWRConfig>
  )
}

export default App

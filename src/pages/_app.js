import PropTypes from 'prop-types'
import { SWRConfig } from "swr"

import Layout from "components/layout"
import AppState from "components/contexts/appState"
import settings from "utils/settings"
import "styles/global.css"
import "styles/layouts.css"

App.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
  countryNameToIso: PropTypes.object,
  countryNameToFlag: PropTypes.object,
}

function App({ Component, pageProps, countryNameToIso, countryNameToFlag }) {
  // this is
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
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </settings.Provider>
      </AppState.Provider>
    </SWRConfig>
  )
}

App.getInitialProps = async (ctx) => {
  const countryNameToIso = require("../data/country_name_to_iso.json")
  const countryNameToFlag = require("../data/country_flags.json")
  return { countryNameToIso, countryNameToFlag }
}

export default App

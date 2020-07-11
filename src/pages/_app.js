// https://nextjs.org/docs/advanced-features/custom-app
import { SWRConfig } from "swr"
import Layout from "components/layout"
import AppState from "components/contexts/appState"
import "styles/global.css"
import "styles/app.css"

function App({ Component, pageProps, countryNameToIso, countryNameToFlag }) {
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
        <Layout>
          <Component {...pageProps} />
        </Layout>
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

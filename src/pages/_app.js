// https://nextjs.org/docs/advanced-features/custom-app

import Layout from "../components/layout"
import AppState from "../components/contexts/appState"
import useSummaryData from "../hooks/useSummaryData"
import api from "../utils/api"
import "../styles/global.css"

function App({ Component, pageProps, countries }) {
  const summary = useSummaryData()

  const store = {
    countries,
    summary
  }

  return (
    <AppState.Provider value={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppState.Provider>
  )
}

App.getInitialProps = async (ctx) => {
  const countries = await api.getCountries()
  return { countries }
}

export default App

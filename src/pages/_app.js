// https://nextjs.org/docs/advanced-features/custom-app

import Layout from "../components/layout"
import AppState from "../components/contexts/appState"
import api from "../utils/api"
import "../styles/global.css"

function App({ Component, pageProps, countries }) {
  const store = { countries }

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

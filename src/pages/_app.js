// https://nextjs.org/docs/advanced-features/custom-app

import Layout from "../components/layout"
import AppState from "../components/contexts/appState"
import useSWRWrapper from "../hooks/useSWRWrapper"
import api from "../utils/api"
import "../styles/global.css"

function normalizeSummaryCountries(data) {
  const countriesMap = data.Countries.reduce((acc, cur) => ({
    ...acc,
    [cur.Slug]: cur
  }), {})

  return {
    date: data.Date,
    global: data.Global,
    countriesMap: countriesMap
  }
}

function App({ Component, pageProps, countries }) {
  const summary = useSWRWrapper("summary", api.getSummary, normalizeSummaryCountries)

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

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }


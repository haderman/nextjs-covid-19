import PropTypes from 'prop-types'
import { ApolloProvider } from "@apollo/react-hooks"
import ApolloClient from "apollo-boost"
import settings from "utils/settings"
import favorites from "utils/favorites"
import "styles/utils.css"
import "styles/layouts.css"
import "styles/app.css"

App.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
}

function App({ Component, pageProps }) {
  const client = new ApolloClient({
    uri: "/api/graphql",
  });
  return (
    <ApolloProvider client={client}>
      <settings.Provider>
        <favorites.Provider>
          <Component {...pageProps} />
        </favorites.Provider>
      </settings.Provider>
    </ApolloProvider>
  )
}

export default App

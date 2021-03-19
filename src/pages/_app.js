import App from 'next/app';
import PropTypes from 'prop-types';
import Router from "next/router";
import NProgress from 'nprogress';
import queryGraphql from "../graphql/queryGraphql";
import Layout from "components/layout";
import GoogleTagManager from "components/googleTagManager";
import settings from "utils/settings";
import favorites from "utils/favorites";

import "styles/utils.css";
import "styles/layouts.css";
import "styles/app.css";
import "@hadermania/components/dist/index.css";

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

MyApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
  allCountries: PropTypes.array,
  worldTotalCases: PropTypes.object,
};

MyApp.getInitialProps = async (appContext) => {
  const data = await queryGraphql(`
    query {
      allCountries {
        iso
        info {
          name
          flag
        }
        totalCases {
          ...CasesFields
        }
      }
      worldTotalCases {
        ...CasesFields
      }
      worldTotalNewCases {
        ...CasesFields
      }
    }
    fragment CasesFields on Cases {
      confirmed
      deaths
      recovered
      actives
    }
  `);

  const appProps = await App.getInitialProps(appContext);

  return { ...appProps, ...data };
};

export default function MyApp({ Component, pageProps, allCountries, worldTotalCases }) {
  return (
    <settings.Provider>
      <favorites.Provider>
        <Layout sidebarProps={{ allCountries, worldTotalCases }}>
          <GoogleTagManager>
            <Component {...pageProps} />
          </GoogleTagManager>
        </Layout>
      </favorites.Provider>
    </settings.Provider>
  );
}


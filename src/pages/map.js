import PropTypes from "prop-types";
import Head from "next/head";
import dynamic from "next/dynamic";
import queryGraphql from "../graphql/queryGraphql";

const WorldMap = dynamic(() => import('../components/worldMap'), {
  ssr: false,
  loading() {
    return (
      <div>Loading...</div>
    );
  },
});

export async function getStaticProps() {
  const data = await queryGraphql(`
    query {
      worldTotalCases {
        ...CasesFields
      }
      worldTotalNewCases {
        ...CasesFields
      }
      worldTimeserie {
        date
        cases {
          ...CasesFields
        }
      }
      allCountries {
        info {
          name
          flag
          latlng
          population
        }
        totalCases {
          ...CasesFields
        }
        totalCasesPerMillion {
          ...CasesFields
        }
      }
    }
    fragment CasesFields on Cases {
      confirmed
      deaths
      recovered
      actives
    }
  `);

  return { props: { ...data } };
}

Home.propTypes = {
  worldTotalCases: PropTypes.object,
  worldTotalNewCases:  PropTypes.object,
  worldTimeserie: PropTypes.array,
  allCountries: PropTypes.array,
};

export default function Home({ allCountries }) {
  return (
    <>
      <Head>
        <title>World Total Cases</title>
      </Head>
      <WorldMap allCountries={allCountries} />
    </>
  );
}

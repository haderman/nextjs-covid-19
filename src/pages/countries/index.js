import PropTypes from "prop-types";
import Layout from "components/layout";
import CountriesList from "components/common/countriesList"
import queryGraphql from "../../graphql/queryGraphql";

export async function getStaticProps() {
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
        timeserie {
          date
          cases {
            ...CasesFields
          }
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

Countries.propTypes = {
  allCountries: PropTypes.array,
};

export default function Countries({ allCountries }) {
  return (
    <Layout>
      <CountriesList allCountries={allCountries} />
    </Layout>
  )
}

import PropTypes from "prop-types";
import { FavoritesCountriesList } from "components/common/countriesList"
import queryGraphql from "../graphql/queryGraphql";

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

Favorites.propTypes = {
  allCountries: PropTypes.array,
};

export default function Favorites({ allCountries }) {
  return (
    <div className="squish-inset-l">
      <FavoritesCountriesList allCountries={allCountries} />
    </div>
  );
}

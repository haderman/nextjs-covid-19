import PropTypes from "prop-types";
import Head from 'next/head';
import classNames from "classnames";
import queryGraphql from "../../graphql/queryGraphql";
import { ChartContainer, Chart, ChartCards } from "components/common/charts";
import Stack from "components/common/stack";

export async function getStaticPaths() {
  const { allCountries } = await queryGraphql(`
    query {
      allCountries {
        iso
      }
    }
  `);

  return {
    paths: allCountries.map(({ iso }) => (
      { params: { iso } }
    )),
    fallback: true,
  };
}

export async function getStaticProps({ params: { iso } }) {
  const data = await queryGraphql(`
    query($iso: String) {
      country(iso: $iso) {
        info {
          name
        }
        totalCases {
          ...CasesFields
        }
        newCases {
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
  `,
    { iso }
  );

  return { props: data }
}

Country.propTypes = {
  country: PropTypes.object,
};

export default function Country({ country = {} }) {
  return (
    <>
      <Head>
        <title>{country.info?.name ?? ""}</title>
      </Head>
      <Stack>
        <Header>
          <h2>{country.info?.name ?? ""}</h2>
        </Header>
        <ChartContainer className="squish-inset-l">
          <Chart timeserie={country.timeserie} />
          <ChartCards
            timeserie={country.timeserie}
            totalCases={country.totalCases}
            newCases={country.newCases}
          />
        </ChartContainer>
      </Stack>
    </>
  )
}

Header.propTypes = {
  children: PropTypes.node,
};

function Header({ children }) {
  const style = classNames(
    "text-primary",
    "flex",
    "justify-space-between",
    "align-center",
    "full-width",
    "squish-inset-l",
  );
  return (
    <header className={style}>
      {children}
    </header>
  );
}

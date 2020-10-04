import PropTypes from "prop-types";
import Head from "next/head";
import classNames from "classnames";
import { ChartContainer, Chart, ChartCards } from "components/common/charts";
import Stack from "components/common/stack";
import queryGraphql from "../graphql/queryGraphql";


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

export default function Home({ worldTotalCases, worldTotalNewCases, worldTimeserie }) {
  return (
    <>
      <Head>
        <title>World Total Cases</title>
      </Head>
      <Stack>
        <Header>
          <h2>World Total Cases</h2>
        </Header>
        <ChartContainer className="felx-1 squish-inset-l">
          <Chart timeserie={worldTimeserie} />
          <ChartCards
            timeserie={worldTimeserie}
            totalCases={worldTotalCases}
            newCases={worldTotalNewCases}
          />
        </ChartContainer>
      </Stack>
    </>
  );
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

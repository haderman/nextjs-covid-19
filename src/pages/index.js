import PropTypes from "prop-types";
import Head from "next/head";
import dynamic from "next/dynamic";
import classNames from "classnames";
import { ChartContainer, Chart, ChartCards } from "components/common/charts";
import Stack from "components/common/stack";
import usePersistedState from "hooks/usePersistedState";
import queryGraphql from "../graphql/queryGraphql";

const WorldMap = dynamic(() => import('../components/worldMap'), { ssr: false });

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
          latlng
          population
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

export default function Home({ worldTotalCases, worldTotalNewCases, worldTimeserie, allCountries }) {
  const [tabSelected, setTabSelected] = usePersistedState("home-tab-selected", "map");
  const handleChangeTab = value => setTabSelected(value);
  return (
    <>
      <Head>
        <title>World Total Cases</title>
      </Head>
      <Stack className="flex-1">
        <Header>
          <h2 className="squish-inset-l">World Total Cases</h2>
          <TabList
            selected={tabSelected}
            value={tabSelected}
            onChange={handleChangeTab}
            activeClassName="background-interactive-selected"
          >
            <Tab value="map">Map</Tab>
            <Tab value="charts">Charts</Tab>
          </TabList>
        </Header>
        <TabPanel>
          {tabSelected === "map" &&
            <WorldMap allCountries={allCountries} />
          }
          {tabSelected === "charts" &&
            <ChartContainer className="squish-inset-l">
              <Chart timeserie={worldTimeserie} />
              <ChartCards
                timeserie={worldTimeserie}
                totalCases={worldTotalCases}
                newCases={worldTotalNewCases}
              />
            </ChartContainer>
          }
        </TabPanel>

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
  );
  return (
    <header className={style}>
      {children}
    </header>
  );
}


Tabs.propTypes = {
  children: PropTypes.node,
};

function Tabs({ children }) {
  return (
    <div className="flex column flex-1">
      {children}
    </div>
  );
}

TabList.propTypes = {
  children: PropTypes.node,
  onChange: PropTypes.func,
  activeClassName: PropTypes.string,
  value: PropTypes.string,
};

function TabList({ children, onChange, value, activeClassName }) {
  return (
    <div
      role="tablist"
      aria-label="Entertainment"
      className="flex align-stretch full-height"
    >
      {React.Children.map(children, child =>
        React.cloneElement(child, {
          onChange,
          className: child.props.value === value ? activeClassName : "",
        })
      )}
    </div>
  );
}

Tab.propTypes = {
  children: PropTypes.node,
  value: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
};

function Tab({ children, value, onChange, className = "" }) {
  const handleOnClick = () => onChange(value);
  return (
    <button
      role="tab"
      aria-selected="true"
      aria-controls="nils-tab"
      id="nils"
      className={`inset-m text-m text-primary ${className}`.trim()}
      onClick={handleOnClick}
    >
      {children}
    </button>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
};

function TabPanel({ children }) {
  return (
    <div
      tabIndex="0"
      role="tabpanel"
      id="nils-tab"
      aria-labelledby="nils"
      className="flex-1"
    >
      {children}
    </div>
  );
}

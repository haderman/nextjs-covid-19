import PropTypes from "prop-types";
import Head from "next/head";
import dynamic from "next/dynamic";
import classNames from "classnames";
import usePersistedState from "hooks/usePersistedState";
import * as size from "utils/size";
import * as color from "utils/color";
import Inline from "components/common/inline";
import Stack from "components/common/stack";
import Numeric from "components/common/numeric";
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

Map.propTypes = {
  worldTotalCases: PropTypes.object,
  worldTotalNewCases:  PropTypes.object,
  worldTimeserie: PropTypes.array,
  allCountries: PropTypes.array,
};

export default function Map({ allCountries }) {
  const buttonList = getButtons();
  const [buttonActive, setButtonActive] = usePersistedState("button-map-active", buttonList[0]);
  const handleButtonGroupChange = value => setButtonActive(buttonList.find(btn => btn.value === value));
  const countriesTop10 = getRanking(buttonActive.value, allCountries);
  return (
    <>
      <Head>
        <title>World Total Cases</title>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
          integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
          crossOrigin=""
        />
      </Head>
      <WorldMap
        allCountries={allCountries}
        circleColor={buttonActive.color}
        value={buttonActive.value}
      />
      <div className="absolute inset-xl flex justify-center z-index-2 bottom-0">
        <ButtonGroup
          value={buttonActive.value}
          onChange={handleButtonGroupChange}
          activeClassName="background-interactive-selected"
        >
          {buttonList.map(btn =>
            <Button
              key={btn.value}
              color={btn.color}
              label={btn.label}
              value={btn.value}
            />
          )}
        </ButtonGroup>
      </div>
      <div className="absolute inset-xl flex justify-center z-index-2 top-0 right-0">
        <Stack as="article" size={size.L} className="inset-m background-deep-0 rounded border-s border-color-strong">
          <h2 className="text-primary">Ranking</h2>
          <Stack as="ul" size={size.M}>
            {countriesTop10.map(country =>
              <Inline as="li" size={size.M} key={country.info.name}>
                <img
                  loading="lazy"
                  className="icon-s"
                  src={country.info.flag}
                  alt={`Flag of ${country.info.name}`}
                />
                <Inline size={size.XL} className="flex-1 justify-space-between">
                  <span className="text-s truncate-s">{country.info.name}</span>
                  <Numeric
                    value={buttonActive.value === "confirmedCasesPerMillion"
                      ? country.totalCasesPerMillion.confirmed
                      : country.totalCases[buttonActive.value]
                    }
                    className="text-secondary"
                  />
                </Inline>
              </Inline>
            )}
          </Stack>
        </Stack>
      </div>
    </>
  );
}

ButtonGroup.propTypes = {
  children: PropTypes.node,
  onChange: PropTypes.func,
  value: PropTypes.string,
  activeClassName: PropTypes.string,
};

function ButtonGroup({ children, onChange, value, activeClassName }) {
  return (
    <Inline size={size.M}>
      {React.Children.map(children, child =>
        React.cloneElement(child, {
          onChange,
          className: child.props.value === value ? activeClassName : "",
        })
      )}
    </Inline>
  );
}

Button.propTypes = {
  color: color.isColor,
  label: PropTypes.string,
  value: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
};

function Button({ color, label, value, className, onChange }) {
  const buttonStyle = classNames(
    "inline-flex",
    "inset-xs",
    "rounded-xl",
    "background-deep-0",
    "border-m",
    "border-color-strong",
    "background-interactive:hover",
    className,
  );
  const handleOnClick = () => onChange(value);
  return (
    <button onClick={handleOnClick} className={buttonStyle}>
      <span className={`circle-xl background-${color}`} />
      <span className="inset-s text-primary">
        {label}
      </span>
    </button>
  )
}

function getButtons() {
  return [{
    label: "Cases per 1M people",
    value: "confirmedCasesPerMillion",
    color: color.BLUE,
  }, {
    label: "Confirmed",
    value: "confirmed",
    color: color.RED,
  }, {
    label: "Recovered",
    value: "recovered",
    color: color.GREEN,
  }, {
    label: "Actives",
    value: "actives",
    color: color.ORANGE,
  }, {
    label: "Deaths",
    value: "deaths",
    color: color.GRAY,
  }];
}

function calcRadius(reason, country) {
  const ONE_MILLION = 1000000;
  switch (reason) {
    case "confirmedCasesPerMillion":
      return 10 * (country.totalCases.confirmed / country.info.population * ONE_MILLION);
    case "confirmed":
      return country.totalCases.confirmed / 4;
    case "recovered":
      return country.totalCases.recovered / 4;
    case "actives":
      return country.totalCases.actives / 2;
    case "deaths":
      return 8 * country.totalCases.deaths;
    default:
      return 0;
  }
}

function getRanking(reason, countries) {
  let sortFunction = (
    reason === "confirmedCasesPerMillion" ?
      (a, b) => b.totalCasesPerMillion.confirmed - a.totalCasesPerMillion.confirmed :
    reason === "confirmed" ?
      (a, b) => b.totalCases.confirmed - a.totalCases.confirmed :
    reason === "recovered" ?
      (a, b) => b.totalCases.recovered - a.totalCases.recovered :
    reason === "actives" ?
      (a, b) => b.totalCases.actives - a.totalCases.actives :
    reason === "deaths" ?
      (a, b) => b.totalCases.deaths - a.totalCases.deaths :
    undefined
  );

  if (sortFunction === undefined) return countries;

  return [...countries].sort(sortFunction).slice(0, 10);
}

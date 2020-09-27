import PropTypes from "prop-types";
import Head from 'next/head';
import classNames from 'classnames';
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import queryGraphql from "../graphql/queryGraphql";
import LayoutHorizontalIcon from "../icons/layout-navbar.svg";
import LayoutVerticalIcon from "../icons/layout-sidebar-right.svg";
import Stack from "components/common/stack";
import Numeric from "components/common/numeric";
import Chip from "components/common/chip";
import Inline from "components/common/inline";
import useMounted from "hooks/useMounted";
import useScreen, { screenType } from "hooks/useScreen";
import * as size from 'utils/size';
import * as color from "utils/color";
import settings from "utils/settings";
import orientation from "utils/orientation";

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
};

export default function Home({ worldTotalCases, worldTotalNewCases, worldTimeserie }) {
  return (
    <>
      <Head>
        <title>World tolta cases</title>
      </Head>
      <ChartLayout title="World">
        <Chart timeserie={worldTimeserie} />
        <Cards
          timeserie={worldTimeserie}
          totalCases={worldTotalCases}
          newCases={worldTotalNewCases}
        />
      </ChartLayout>
    </>
  )
}

ChartLayout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

function ChartLayout({ title, children }) {
  const [chartOrientation, setChartOrientation] = settings.useChartOrientation();
  const handleClick = newOrientation => () => {
    setChartOrientation(newOrientation);
  };
  const isMounted = useMounted();
  const screen = useScreen();
  const isLayoutButtonsVisible = (
    isMounted &&
    screen === screenType.DESKTOP || screen === screenType.BIG_DESKTOP
  );
  return (
    <Stack size={size.M} as="section">
      <Header>
        <h2>{title}</h2>
        {isLayoutButtonsVisible &&
          <Inline as="span" size={size.S}>
            <button className="icon-button" onClick={handleClick(orientation.VERTICAL)}>
              <LayoutVerticalIcon className={orientation.isVertical(chartOrientation) ? "stroke-primary" : ""} />
            </button>
            <button className="icon-button" onClick={handleClick(orientation.HORIZONTAL)}>
              <LayoutHorizontalIcon className={orientation.isHorizontal(chartOrientation) ? "stroke-primary" : ""} />
            </button>
          </Inline>
        }
      </Header>
      {isMounted &&
        <section
          key={orientation.isVertical(chartOrientation) ? "vertical" : "horizontal" }
          className={
            classNames("full-width full-height", {
              "layout-area-charts-vertical": orientation.isVertical(chartOrientation),
              "layout-area-charts-horizontal": orientation.isHorizontal(chartOrientation),
            })
          }
        >
          {children}
        </section>
      }
    </Stack>
  );
}

Chart.propTypes = {
  timeserie: PropTypes.array,
};

function Chart({ timeserie }) {
  return (
    <article id="main-area-chart">
      <ResponsiveContainer>
        <AreaChart id="test" data={timeserie} margin={{top: 10, right: 0, left: 10, bottom: 0}}>
          <defs>
            <linearGradient id="colorConfirmed" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color.toHSL(color.RED)} stopOpacity={0.8}/>
              <stop offset="95%" stopColor={color.toHSL(color.RED)} stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorRecovered" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color.toHSL(color.GREEN)} stopOpacity={0.8}/>
              <stop offset="95%" stopColor={color.toHSL(color.GREEN)} stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorActives" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color.toHSL(color.ORANGE)} stopOpacity={0.8}/>
              <stop offset="95%" stopColor={color.toHSL(color.ORANGE)} stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorDeaths" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color.toHSL(color.GRAY)} stopOpacity={0.8}/>
              <stop offset="95%" stopColor={color.toHSL(color.GRAY)} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#333" strokeDasharray="2 2" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" stackId="1" dataKey="cases.confirmed" stroke={color.toHSL(color.RED)} fill="url(#colorConfirmed)" />
          <Area type="monotone" stackId="2" dataKey="cases.recovered" stroke={color.toHSL(color.GREEN)} fill="url(#colorRecovered)" />
          <Area type="monotone" stackId="3" dataKey="cases.actives" stroke={color.toHSL(color.ORANGE)} fill="url(#colorActives)" />
          <Area type="monotone" stackId="4" dataKey="cases.deaths" stroke={color.toHSL(color.GRAY)} fill="url(#colorDeaths)" />
        </AreaChart>
      </ResponsiveContainer>
    </article>
  );
}

Cards.propTypes = {
  timeserie: PropTypes.array,
  totalCases: PropTypes.object,
  newCases: PropTypes.object,
};

function Cards({ totalCases, newCases, timeserie }) {
  return (
    <>
      <Card
        id="area-chart-1"
        title="Confirmed cases"
        primaryText={totalCases.confirmed}
        secondaryText={newCases.confirmed}
        primaryColor={color.RED}
        secondaryColor={color.RED_SOFT}
        timeSeries={timeserie}
        dataKey="cases.confirmed"
      />
      <Card
        id="area-chart-2"
        title="Active cases"
        primaryText={totalCases.actives}
        secondaryText={newCases.actives}
        primaryColor={color.ORANGE}
        secondaryColor={color.ORANGE_SOFT}
        timeSeries={timeserie}
        dataKey="cases.actives"
      />
      <Card
        id="area-chart-3"
        title="Recovered cases"
        primaryText={totalCases.recovered}
        secondaryText={newCases.recovered}
        primaryColor={color.GREEN}
        secondaryColor={color.GREEN_SOFT}
        timeSeries={timeserie}
        dataKey="cases.recovered"
      />
      <Card
        id="area-chart-4"
        title="Death cases"
        primaryText={totalCases.deaths}
        secondaryText={newCases.deaths}
        primaryColor={color.GRAY}
        secondaryColor={color.GRAY_SOFT}
        timeSeries={timeserie}
        dataKey="cases.deaths"
      />
    </>
  );
}

Header.propTypes = {
  children: PropTypes.node,
};

function Header({ children }) {
  const style = [
    "text-primary",
    "flex",
    "justify-space-between",
    "align-center",
    "full-width",
  ].join(" ");

  return (
    <header className={style}>
      {children}
    </header>
  );
}

Card.propTypes = {
  title: PropTypes.string,
  primaryText: PropTypes.any,
  secondaryText: PropTypes.any,
  primaryColor: color.isColor,
  secondaryColor: color.isColor,
  timeSeries: PropTypes.array,
  dataKey: PropTypes.string,
  id: PropTypes.string,
};

function Card(props) {
  const {
    title,
    primaryText,
    secondaryText,
    primaryColor,
    secondaryColor,
    timeSeries,
    dataKey,
    id
  } = props;

  return (
    <article id={id} className="inset-m rounded border-s border-color-soft">
      <Stack size={size.XS}>
        <p className="text-secondary">{title}</p>
        <h3 className={`text-secondary text-l text-${primaryColor}`}>
          <Numeric value={primaryText} />
        </h3>
        <Inline>
          <Chip
            size={size.M}
            rounded={size.XL}
            background={secondaryColor}
          >
            {secondaryText >= 0 && "+"}<Numeric value={secondaryText} />
          </Chip>
        </Inline>
      </Stack>
      <div className="absolute top-0 left-0 full-width full-height">
        <ResponsiveContainer>
          <AreaChart id="test" data={timeSeries}>
            <defs>
              <linearGradient id={`${id}-color`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color.toHSL(primaryColor)} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={color.toHSL(primaryColor)} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Area type="monotone" stackId="2" dataKey={dataKey} stroke={color.toHSL(primaryColor)} fill={`url(#${id}-color)`} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </article>
  );
}

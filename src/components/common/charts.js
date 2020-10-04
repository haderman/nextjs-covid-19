import PropTypes from "prop-types";
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Stack from "components/common/stack";
import Numeric from "components/common/numeric";
import Chip from "components/common/chip";
import Inline from "components/common/inline";
import useMounted from "hooks/useMounted";
import useScreen from "hooks/useScreen";
import * as size from 'utils/size';
import * as color from "utils/color";

ChartContainer.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
};

export function ChartContainer({ children, className }) {
  const isMounted = useMounted();
  return (
    <Stack size={size.M} as="section" className={className}>
      {isMounted &&
        <section className="layout-area-charts-horizontal">
          {children}
        </section>
      }
    </Stack>
  );
}

Chart.propTypes = {
  timeserie: PropTypes.array,
};

export function Chart({ timeserie }) {
  const screen = useScreen();
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
          {!screen.isPhone() && <YAxis />}
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

ChartCards.propTypes = {
  timeserie: PropTypes.array,
  totalCases: PropTypes.object,
  newCases: PropTypes.object,
};

export function ChartCards({ totalCases, newCases, timeserie }) {
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

  const screen = useScreen();

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
      {!screen.isPhone() &&
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
      }
    </article>
  );
}

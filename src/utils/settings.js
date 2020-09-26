import PropTypes from 'prop-types';
import { createContext, useContext } from "react";
import usePersistedState from "../hooks/usePersistedState";
import orientation from "./orientation";

const Context = createContext();

Provider.propTypes = {
  children: PropTypes.node,
};

function Provider({ children }) {
  const [chartOrientation, setChartOrientation] = usePersistedState("chartOrientation", orientation.HORIZONTAL);
  const settings = {
    chartOrientation: [chartOrientation, setChartOrientation]
  };
  return (
    <Context.Provider value={settings}>
      {children}
    </Context.Provider>
  );
}

function useChartOrientation() {
  const settings = useContext(Context);
  return settings.chartOrientation;
}

export default {
  Context,
  Provider,
  useChartOrientation,
};

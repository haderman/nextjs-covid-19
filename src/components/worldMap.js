import PropTypes from "prop-types";
import Head from "next/head";
import classNames from "classnames";
import { Map, CircleMarker, Circle, Popup, TileLayer } from "react-leaflet";
import * as size from "utils/size";
import Inline from "./common/inline";

const position = [30, -30];

import * as color from "utils/color";

WorldMap.propTypes = {
  allCountries: PropTypes.array,
};

export default function WorldMap({ allCountries }) {
  const [buttonActive, setButtonActive] = React.useState("cases-per-m");
  const handleButtonGroupChange = value => setButtonActive(value);
  const maxConfirmed = Math.max(...allCountries.map(country => country.totalCases.confirmed));
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
          integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
          crossOrigin=""
        />
      </Head>
      <Map
        className="map z-index-1"
        style={{ width: '100%', height: '100%' }}
        center={position}
        zoom={2.5}
        minZoom={2}
        maxZoom={5}
      >
        <TileLayer
          attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {allCountries.map(country =>
          <Circle
            key={country.info.name}
            radius={10 * (country.totalCases.confirmed / country.info.population * 1000000)}
            center={country.info.latlng}
            fillOpacity={0.2}
            // color={color.toHSL(color.RED)}
            weight={2}
          >
            <Popup>
              <span>{country.info.name}</span>
            </Popup>
          </Circle>
        )}
      </Map>
      <div className="absolute inset-xl flex justify-center z-index-2 bottom-0">
        <ButtonGroup
          value={buttonActive}
          onChange={handleButtonGroupChange}
          activeClassName="background-interactive-selected"
        >
          <Button
            color={color.BLUE}
            label="Cases per 1M people"
            value="cases-per-m"
          />
          <Button
            color={color.RED}
            label="Confirmed"
            value="confirmed"
          />
          <Button
            color={color.GREEN}
            label="Recovered"
            calue="recovered"
          />
          <Button
            color={color.ORANGE}
            label="Actives"
            value="actives"
          />
          <Button
            color={color.GRAY}
            label="Deaths"
            value="deaths"
          />
        </ButtonGroup>
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

import PropTypes from "prop-types";
import { Map, Circle, TileLayer, Tooltip } from "react-leaflet";
import * as color from "utils/color";
import useScreen from "hooks/useScreen";
import usePersistedState from "hooks/usePersistedState"

WorldMap.propTypes = {
  allCountries: PropTypes.array,
  circleColor: color.isColor,
  value: PropTypes.oneOf([
    "confirmedCasesPerMillion",
    "confirmed",
    "recovered",
    "actives",
    "deaths",
  ]),
};

export default function WorldMap({ allCountries, circleColor, value }) {
  const screen = useScreen();
  const [viewport, setViewport] = usePersistedState('map-viewport', {
    center: [30, -90],
    zoom: 2
  });

  function handleViewportChanges(viewport) {
    setViewport(viewport);
  }

  return (
    <Map
      className="map z-index-1 flex-1 full-width full-height"
      center={viewport.center}
      zoom={viewport.zoom}
      minZoom={2}
      maxZoom={5}
      onViewportChange={handleViewportChanges}
      zoomControl={screen.isDesktop() || screen.isBigDesktop()}
    >
      <TileLayer
        attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {allCountries.map(country =>
        <Circle
          key={country.info.name}
          radius={calcRadius(value, country)}
          center={country.info.latlng}
          fillOpacity={0.2}
          color={color.toHSL(circleColor)}
          weight={2}
        >
          <Tooltip direction="top">
            <span>{country.info.name}</span>
          </Tooltip>
        </Circle>
      )}
    </Map>
  );
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


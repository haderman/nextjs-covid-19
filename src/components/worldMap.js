import PropTypes from "prop-types";
import Head from "next/head";
import { Map, CircleMarker, Popup, TileLayer } from "react-leaflet";

const position = [51.505, -0.09];

WorldMap.propTypes = {
  allCountries: PropTypes.array,
};

export default function WorldMap({ allCountries }) {
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
        center={position}
        zoom={2.5}
        style={{ width: '100%', height: '100%' }}
        className="map"
      >
        <TileLayer
          attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {allCountries.map(country =>
          <CircleMarker
            key={country.info.name}
            radius={10 * Math.log(country.info.population / 10000000)}
            center={country.info.latlng}
            fillOpacity={0.5}
            stroke={false}
          >
            <Popup>
              <span>{country.info.name}</span>
            </Popup>
          </CircleMarker>
        )}
      </Map>
    </>
  );
}

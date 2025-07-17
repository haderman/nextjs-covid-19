import axios from "axios";
import DataLoader from "dataloader";
import mapCountryNameToISO from "../../data/country_name_to_iso.json";

const statsLoader = new DataLoader(() => getStats());
const countriesInfoLoader = new DataLoader(() => getCountriesInfo());

async function getStats() {
  console.log("GET STATS");
  const response = await axios.get("https://pomber.github.io/covid19/timeseries.json");
  if (!isObject(response.data)) {
    return [{}];
  }

  let statsByISO = {};
  Object.keys(response.data).forEach(countryName => {
    const iso = mapCountryNameToISO[countryName];
    statsByISO[iso] = response.data[countryName];
  })
  return [statsByISO];
}

async function getCountriesInfo() {
  console.log("GET COUNTRIES INFO");
  // Use new REST Countries v3 endpoint and request only needed fields
  const fields = [
    "name",
    "flags",
    "population",
    "region",
    "subregion",
    "cca3",
    "latlng",
  ].join(",");

  const response = await axios.get(
    `https://restcountries.com/v3.1/all?fields=${fields}`
  );

  if (!Array.isArray(response.data)) {
    return [{}];
  }

  // Transform the v3 response to match the original schema expected by the app
  const transformed = response.data.map(country => ({
    name: country.name?.common ?? "",
    flag: country.flags?.svg ?? country.flags?.png ?? country.flag ?? "",
    population: country.population ?? 0,
    region: country.region ?? "",
    subregion: country.subregion ?? "",
    latlng: country.latlng ?? [],
    alpha3Code: country.cca3 ?? "",
  }));

  return [transformed];
}

function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

export default {
  getStats: () =>
    statsLoader.load("stats"),
  getCountriesInfo: () =>
    countriesInfoLoader.load("countriesInfo"),
};


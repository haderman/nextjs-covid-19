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
  const response = await axios.get("https://restcountries.eu/rest/v2/all");
  if (!isObject(response.data)) {
    return [{}];
  }
  return [response.data];
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


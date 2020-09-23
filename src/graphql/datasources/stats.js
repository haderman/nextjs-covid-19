import axios from "axios";
import DataLoader from "dataloader";

const statsLoader = new DataLoader(getStats);

async function getStats() {
  const response = await axios.get("https://pomber.github.io/covid19/timeseries.json");

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
  statsLoader,
};


import useSWR from "swr"
import api from "../api"

export default function useCountrySummary(iso) {
  const swrResponse = useSWR(`/country/${iso}`, api.getCountry(iso))
  if (api.isSuccess(swrResponse)) {
    const summary = calculateSummary(api.getResult(swrResponse))
    return api.setResult(swrResponse, summary)
  }
  return swrResponse
}

function calculateSummary(data) {
  const byAscendingDates = (a,b) => a > b ? -1 : a < b ? 1 : 0
  const [lastest, penultimate] = Object.keys(data).sort(byAscendingDates)
  const latestStats = data[lastest]
  const penultimateStats = data[penultimate]

  return {
    ...latestStats,
    newConfirmed: latestStats.confirmed - penultimateStats.confirmed,
    newDeaths: latestStats.deaths - penultimateStats.deaths,
    newRecovered: latestStats.recovered - penultimateStats.recovered,
    actives: latestStats.confirmed - latestStats.recovered - latestStats.deaths
  }
}

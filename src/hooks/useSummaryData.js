import useSWR from "swr"
import api from "utils/api"

export default function useSummaryData() {
  const swrResponse = useSWR("/summary", api.getSummary)
  const status = api.statusFriendly(swrResponse)

  if (api.requestStatus.SUCCESS === status) {
    const normalizedData = normalizeSummaryCountries(swrResponse.data)
    return { ...swrResponse, data: normalizedData, status }
  }

  return { ...swrResponse, status }
}

function normalizeSummaryCountries(data) {
  const countriesMap = data.Countries.reduce((acc, cur) => ({
    ...acc,
    [cur.Slug]: cur
  }), {})

  return {
    date: data.Date,
    global: data.Global,
    countriesMap: countriesMap
  }
}

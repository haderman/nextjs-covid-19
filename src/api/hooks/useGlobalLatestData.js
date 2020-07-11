import useSWR from "swr"
import api from "../api"

export default function useGlobalLatestData() {
  const swrResponse = useSWR("/global/latest", api.getGlobalLatest)
  if (api.isSuccess(swrResponse)) {
    const normalizedData = normalize(api.getResult(swrResponse))
    return api.setResult(swrResponse, normalizedData)
  }
  return swrResponse
}

function normalize(data) {
  return data.reduce((acc, current) => ({ ...acc, ...current }), {})
}

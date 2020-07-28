import useSWR from "swr"
import api from "api/api"

export default function useGlobalSummary() {
  const swrResponse = useSWR("/global/count", api.getGlobal)
  return swrResponse
}

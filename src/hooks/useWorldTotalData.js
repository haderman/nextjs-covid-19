import useSWR from "swr"
import api from "../utils/api"

export default function useWorldTotalData() {
  const swrResponse = useSWR("/total/world", api.getWorldTotal)
  const status = api.statusFriendly(swrResponse)
  return { ...swrResponse, status }
}


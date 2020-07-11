import useSWR from "swr"
import api from "../api"

export default function useGlobalCountData() {
  const swrResponse = useSWR("/global/count", api.getGlobalCount)
  return swrResponse
}


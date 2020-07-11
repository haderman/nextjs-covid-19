import useSWR from "swr"
import api from "../api"

export default function useCountryData(iso) {
  const swrResponse = useSWR(`/country/${iso}`, api.getCountry(iso))
  return swrResponse
}


import useSWR from "swr"
import api from "../utils/api"

export default function useSWRWrapper(key, fetcher, func) {
  const { data, error, isValidating } = useSWR(key, fetcher)

  const status =
    error ? api.requestStatus.ERROR :
    !data ? api.requestStatus.LOADING :
    api.requestStatus.SUCCESS

  if (status === api.requestStatus.SUCCESS && func) {
    const data_ = func(data)
    return { data: data_, error, isValidating, status }
  }

  return { data, error, isValidating, status }
}

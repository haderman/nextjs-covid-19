/**
 * @link https://documenter.getpostman.com/view/10808728/SzS8rjbc?version=latest
 */

import axios from "axios"

function getBaseURL() {
  return "https://covidapi.info/api/v1/"
}

function composeUrl(endpoint) {
  const url = new URL(endpoint, getBaseURL())
  return url.href
}

const requests = {
  async get(endpoint) {
    const { data } = await axios.get(composeUrl(endpoint))
    return data
  }
}

function getCountry(iso) {
  return () => requests.get(`country/${iso}`)
}

function getGlobalLatest() {
  return requests.get("global/latest")
}

function getGlobalCount() {
  return requests.get("global/count")
}

const requestStatus = {
  SUCCESS: "success",
  LOADING: "loading",
  ERROR: "error",
}

function toFriendlyStatus(swrResponse) {
  const { data, error } = swrResponse
  return error ? requestStatus.ERROR
    : !data ? requestStatus.LOADING
    : requestStatus.SUCCESS
}

function isError(swrResponse) {
  const status = toFriendlyStatus(swrResponse)
  return status === requestStatus.ERROR
}

function isLoading(swrResponse) {
  const status = toFriendlyStatus(swrResponse)
  return status === requestStatus.LOADING
}

function isSuccess(swrResponse) {
  const status = toFriendlyStatus(swrResponse)
  return status === requestStatus.SUCCESS
}

function getResult(swrResponse, defaultResult = {}) {
  return swrResponse?.data?.result ?? defaultResult
}

function setResult(swrResponse, result) {
  return {
    ...swrResponse,
    data: {
      ...swrResponse.data,
      result
    }
  }
}

export default {
  isError,
  isLoading,
  isSuccess,
  getResult,
  setResult,
  getGlobalCount,
  getGlobalLatest,
  getCountry,
}

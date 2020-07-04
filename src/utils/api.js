/**
 * @link https://documenter.getpostman.com/view/10808728/SzS8rjbc?version=latest
 */

import axios from "axios"

function getBaseURL() {
  return "https://api.covid19api.com/"
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

function getSummary() {
  console.log(" GET SUMMARY ")
  return requests.get("summary")
}

function getCountries() {
  return requests.get("countries")
}

function getStats() {
  return requests.get("stats")
}

function getVersion() {
  return requests.get("version")
}

function getWorldTotal() {
  const to = new Date().toISOString()
  return requests.get(`world?from=2020-03-01T00:00:00Z&to=${to}`)
}

function getCountryTotal(slug) {
  const to = new Date().toISOString()
  return requests.get(`total/country/${slug}?from=2020-03-01T00:00:00Z}&to=${to}`)
}

const requestStatus = {
  SUCCESS: "success",
  LOADING: "loading",
  ERROR: "error",
}

export default {
  getStats,
  getSummary,
  getVersion,
  getCountries,
  getWorldTotal,
  getCountryTotal,
  requestStatus,
}

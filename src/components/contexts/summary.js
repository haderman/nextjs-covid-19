import { createContext, useContext } from "react"

const SummaryContext = createContext()

export const useSummaryData = () => useContext(SummaryContext)

export default SummaryContext

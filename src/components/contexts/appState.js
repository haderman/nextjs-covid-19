import { createContext, useContext } from "react"

const AppContext = createContext()

export const useAppState = () => useContext(AppContext)

export default AppContext

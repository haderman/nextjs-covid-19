import dynamic from "next/dynamic"

import Header from "./header"
import useScreen, { screenType } from "../hooks/useScreen"

const Sidebar = dynamic(() => import("./sidebar"), { ssr: false })
const BottomNavigation = dynamic(() => import("./bottomNavigation"), { ssr: false })

export default function Layout({ children }) {
  const screen = useScreen()

  return (
    <div className="layout theme-dark background-deep-0 text-primary">
      <Header />
      {(screen === screenType.DESKTOP || screen === screenType.BIG_DESKTOP) && <Sidebar />}
      <main className="squish-inset-l">{children}</main>
      {screen === screenType.PHONE && <BottomNavigation />}
    </div>
  )
}

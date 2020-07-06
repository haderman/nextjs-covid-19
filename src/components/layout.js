import dynamic from "next/dynamic"

import Header from "./header"
import BottomNavigation from "./bottomNavigation"
import useScreen, { screenType } from "../hooks/useScreen"

const Sidebar = dynamic(() => import("./Sidebar"), { ssr: false })

export default function Layout({ children }) {
  const screen = useScreen()

  return (
    <div className="layout theme-dark background-deep-0 full-height text-primary">
      <Header />
      {(screen === screenType.DESKTOP || screen === screenType.BIG_DESKTOP) && <Sidebar />}
      <main className="squish-inset-l">{children}</main>
      {screen === screenType.PHONE && <BottomNavigation />}
    </div>
  )

  return (
    <div className="theme-dark background-deep-0 full-height text-primary">
      <Header />
      <div className="flex">
        {screen === screenType.DESKTOP || screen === screenType.BIG_DESKTOP ? <Sidebar /> : null}
        <main className="flex-1 squish-inset-l overflow">{children}</main>
      </div>
      {screen === screenType.PHONE && <BottomNavigation />}
    </div>
  )
}

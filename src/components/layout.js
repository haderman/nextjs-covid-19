import PropTypes from 'prop-types'
import Sidebar from "./sidebar"
import BottomNavigation from "./bottomNavigation"
import Header from "./header"
import useScreen, { screenType } from "../hooks/useScreen"
import useMounted from "../hooks/useMounted"

Layout.propTypes = {
  children: PropTypes.node
}

export default function Layout({ children }) {
  const screen = useScreen()
  const isMounted = useMounted()
  const isBottomNavigationVisible = isMounted && screen === screenType.PHONE
  const isSidebarVisible = isMounted &&
    (screen === screenType.DESKTOP || screen === screenType.BIG_DESKTOP)

  return (
    <div className="layout theme-dark background-deep-1 text-primary">
      <Header />
      {isSidebarVisible &&
        <Sidebar />
      }
      <main className="squish-inset-l">{children}</main>
      {isBottomNavigationVisible &&
        <BottomNavigation />
      }
    </div>
  )
}

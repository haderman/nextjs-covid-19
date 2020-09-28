import PropTypes from 'prop-types'
import Sidebar from "./sidebar"
import BottomNavigation from "./bottomNavigation"
import Header from "./header"
import useScreen from "../hooks/useScreen"
import useMounted from "../hooks/useMounted"

Layout.propTypes = {
  children: PropTypes.node,
  sidebarProps: PropTypes.object,
}

export default function Layout({ children, sidebarProps }) {
  const screen = useScreen();
  const isMounted = useMounted();
  const isBottomNavigationVisible = isMounted && screen.isPhone();
  const isSidebarVisible = isMounted && (screen.isDesktop() || screen.isBigDesktop());
  return (
    <div className="layout theme-dark background-deep-1 text-primary">
      <Header />
      {isSidebarVisible &&
        <Sidebar {...sidebarProps} />
      }
      <main className="squish-inset-l">{children}</main>
      {isBottomNavigationVisible &&
        <BottomNavigation />
      }
    </div>
  )
}

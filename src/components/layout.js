import PropTypes from "prop-types";
import { useRouter } from "next/router";
import classNames from "classnames";
import Sidebar from "./sidebar";
import BottomNavigation from "./bottomNavigation";
import Header from "./header";
import useScreen from "../hooks/useScreen";
import useMounted from "../hooks/useMounted";

Layout.propTypes = {
  children: PropTypes.node,
  sidebarProps: PropTypes.object,
};

export default function Layout({ children, sidebarProps }) {
  const router = useRouter();
  const screen = useScreen();
  const isMounted = useMounted();
  const isBottomNavigationVisible = isMounted && screen.isPhone();
  const isSidebarVisible = (
    isMounted &&
    (screen.isDesktop() || screen.isBigDesktop()) &&
    router.pathname !== "/map"
  );
  const classNameRoot = classNames("layout theme-dark background-deep-1 text-primary", {
    "layout-map": router.pathname === "/map",
  });
  return (
    <div className={classNameRoot}>
      <Header />
      {isSidebarVisible &&
        <Sidebar {...sidebarProps} />
      }
      <main className="flex column">
        {children}
      </main>
      {isBottomNavigationVisible &&
        <BottomNavigation />
      }
    </div>
  );
}

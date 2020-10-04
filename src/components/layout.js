import PropTypes from "prop-types";
import { useRouter } from "next/router";
import classNames from "classnames";
import Sidebar from "./sidebar";
import BottomNavigation from "./bottomNavigation";
import ActiveLink from "./common/activeLink"
import Inline from "./common/inline";
import useScreen from "../hooks/useScreen";
import useMounted from "../hooks/useMounted";
import * as size from "../utils/size";

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
  const isNavVisible = (
    isMounted &&
    (screen.isDesktop() || screen.isBigDesktop())
  );
  const classNameRoot = classNames("layout theme-dark background-deep-1 text-primary", {
    "layout-map": router.pathname === "/map",
  });
  return (
    <div className={classNameRoot}>
      <Header>
        <h1>COVID-19 Tracker</h1>
        {isNavVisible &&
          <Nav>
            <NavItem href="/map" label="Map" />
            <NavItem href="/" label="Charts" />
          </Nav>
        }
      </Header>
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

Header.propTypes = {
  children: PropTypes.node,
};

function Header({ children }) {
  const rootStyle = classNames(
    "background-inherit",
    "border-bottom-s",
    "border-color-soft",
    "flex",
    "justify-space-between",
    "sticky-top",
    "z-index-2",
    "flex",
    "align-center",
  );
  return (
    <header className={rootStyle}>
      {children}
    </header>
  );
}

Nav.propTypes = {
  children: PropTypes.node,
};

function Nav({ children }) {
  return (
    <nav>
      <Inline as="ol" size={size.M}>
        {children}
      </Inline>
    </nav>
  );
}

NavItem.propTypes = {
  label: PropTypes.string,
  href: PropTypes.string,
};

function NavItem({ label, href }) {
  return (
    <li className="flex-1 full-height">
      <ActiveLink href={href} passHref activeClassName="border-bottom-s">
        <a className="inset-m">
          {label}
        </a>
      </ActiveLink>
    </li>
  );
}

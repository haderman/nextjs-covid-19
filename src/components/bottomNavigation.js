import classNames from "classnames";
import { useRouter } from "next/router";
import ActiveLink from "./common/activeLink";
import ChartBarIcon from "../icons/chart-bar.svg";
import ListIcon from "../icons/list.svg";
import InfoIcon from "../icons/help.svg";
import MapIcon from "../icons/map.svg";

export default function BottomNavigation() {
  const router = useRouter();
  const aClassNames = "stack full-height flex justify-center align-center";
  const containerClassName = classNames("background-deep-0 border-top-s border-color-strong", {
    "sticky-bottom": router.pathname !== "/map",
    "fixed z-index-4 bottom-0 full-width": router.pathname === "/map",
  });
  return (
    <nav className={containerClassName}>
      <ol className="flex text-gray">
        <li className="flex-1 full-height">
          <ActiveLink href="/map" passHref activeClassName="selected color-primary">
            <a className={aClassNames}>
              <MapIcon className="icon" />
              <span className="text-xs">Map</span>
            </a>
          </ActiveLink>
        </li>
        <li className="flex-1 full-height">
          <ActiveLink href="/" passHref activeClassName="selected color-primary">
            <a className={aClassNames}>
              <ChartBarIcon className="icon" />
              <span className="text-xs">Charts</span>
            </a>
          </ActiveLink>
        </li>
        <li className="flex-1 full-height">
          <ActiveLink href="/countries" activeClassName="selected color-primary" isAciveInSubpaths>
            <a className={aClassNames}>
              <ListIcon className="icon" />
              <span className="text-xs">Countries</span>
            </a>
          </ActiveLink>
        </li>
        <li className="flex-1 full-height">
          <ActiveLink href="/about" passHref activeClassName="selected color-primary">
            <a className={aClassNames}>
              <InfoIcon className="icon" />
              <span className="text-xs">Info</span>
            </a>
          </ActiveLink>
        </li>
      </ol>
    </nav>
  );
}

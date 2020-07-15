import ActiveLink from "./common/activeLink"
import GlobeIcon from "../icons/globe.svg"
import ListIcon from "../icons/list.svg"
import InfoIcon from "../icons/help.svg"
import StarIcon from "../icons/star.svg"

export default function BottomNavigation() {
  const aClassNames = "full-height flex justify-center align-center"

  return (
    <nav className="sticky-bottom background-deep-0 border-top-s border-color-strong">
      <ol className="flex">
        <li className="flex-1 full-height">
          <ActiveLink href="/" passHref activeClassName="selected">
            <a className={aClassNames}>
              <GlobeIcon className="icon" />
            </a>
          </ActiveLink>
        </li>
        <li className="flex-1 full-height">
          <ActiveLink href="/countries" passHref activeClassName="selected" isAciveInSubpaths>
            <a className={aClassNames}>
              <ListIcon className="icon" />
            </a>
          </ActiveLink>
        </li>
        <li className="flex-1 full-height">
          <ActiveLink href="/favorites" passHref activeClassName="selected">
            <a className={aClassNames}>
              <StarIcon className="icon" />
            </a>
          </ActiveLink>
        </li>
        <li className="flex-1 full-height">
          <ActiveLink href="/about" passHref activeClassName="selected">
            <a className={aClassNames}>
              <InfoIcon className="icon" />
            </a>
          </ActiveLink>
        </li>
      </ol>
    </nav>
  )
}

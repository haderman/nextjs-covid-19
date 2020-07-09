import ActiveLink from "./common/activeLink"
import WorldwideIcon from "../svg/worldwide.svg"
import ListIcon from "../svg/list-1.svg"
import InfoIcon from "../svg/info.svg"
import StarIcon from "../svg/star.svg"

export default function BottomNavigation() {
  const aClassNames = "full-height flex justify-center align-center"

  return (
    <nav className="sticky-bottom background-deep-0 border-top-s border-color-strong">
      <ol className="flex">
        <li className="flex-1 full-height">
          <ActiveLink href="/" passHref activeClassName="selected">
            <a className={aClassNames}>
              <WorldwideIcon className="icon" />
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

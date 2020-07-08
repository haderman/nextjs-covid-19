import Link from "next/link"
import { useRouter } from 'next/router'
import classnames from 'classnames'

import WorldwideIcon from "../svg/worldwide.svg"
import ListIcon from "../svg/list-1.svg"
import InfoIcon from "../svg/info.svg"

export default function BottomNavigation() {
  const router = useRouter()

  const aClassNames = href => {
    return classnames("full-height flex justify-center align-center", { selected: router.pathname === href })
  }

  return (
    <nav className="sticky-bottom background-deep-0 border-top-s border-color-strong">
      <ol className="flex">
        <li className="flex-1 full-height">
          <Link href="/" passHref>
            <a className={aClassNames("/")}>
              <WorldwideIcon className="icon" />
            </a>
          </Link>
        </li>
        <li className="flex-1 full-height">
          <Link href="/countries" passHref>
            <a className={aClassNames("/countries")}>
              <ListIcon className="icon" />
            </a>
          </Link>
        </li>
        <li className="flex-1 full-height">
          <Link href="/about" passHref>
            <a className={aClassNames("/about")}>
              <InfoIcon className="icon" />
            </a>
          </Link>
        </li>
      </ol>
    </nav>
  )
}

import Link from "next/link"
import { useRouter } from 'next/router'
import classnames from 'classnames'

export default function BottomNavigation() {
  const router = useRouter()

  const aClassNames = href => {
    return classnames(
      "flex-1 inset-m border-top-s border-color-strong",
      { selected: router.pathname === href
    })
  }

  return (
    <nav className="sticky-bottom backdrop-blur">
      <ol className="flex">
        <li className="flex flex-1 text-center">
          <Link href="/" passHref>
            <a className={aClassNames("/")}>
              Global
            </a>
          </Link>
        </li>
        <li className="flex flex-1 text-center ">
          <Link href="/countries" passHref>
            <a className={aClassNames("/countries")}>
              Countries
            </a>
          </Link>
        </li>
      </ol>
    </nav>
  )
}

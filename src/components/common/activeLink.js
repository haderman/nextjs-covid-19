import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import Link from 'next/link'
import React, { Children } from 'react'

function ActiveLink({ children, activeClassName, isAciveInSubpaths, ...props }) {
  const { asPath } = useRouter()
  const child = Children.only(children)
  const childClassName = child.props.className || ''

  const className =
    asPath === props.as || asPath === props.href || (isAciveInSubpaths && asPath.includes(props.href))
      ? `${childClassName} ${activeClassName}`.trim()
      : childClassName

  return (
    <Link {...props}>
      {React.cloneElement(child, {
        className: className || null,
      })}
    </Link>
  )
}

ActiveLink.propTypes = {
  activeClassName: PropTypes.string.isRequired,
  isAciveInSubpaths: PropTypes.bool,
  children: PropTypes.node,
}

export default ActiveLink

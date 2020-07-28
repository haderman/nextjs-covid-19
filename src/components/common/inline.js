import PropTypes from 'prop-types'
import * as size from "utils/size"

function Inline({ size, children, as }) {
  const className = size ? `inline:${size}` : "inline-flex"
  const ElementType = as || "div"
  return <ElementType className={className}>{children}</ElementType>
}

Inline.propTypes = {
  size: size.isSize,
  children: PropTypes.node,
  as: PropTypes.string,
}

export default Inline

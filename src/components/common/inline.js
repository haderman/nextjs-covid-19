import * as size from "utils/size"

function Inline({ size, children, as }) {
  const className = size ? `inline:${size}` : ""
  const ElementType = as || "span"
  return <ElementType className={className}>{children}</ElementType>
}

Inline.propTypes = {
  size: size.isSize
}

export default Inline

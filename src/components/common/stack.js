import * as size from "utils/size"

function Stack({ size, children, as }) {
  const className = size ? `stack:${size}` : ""
  const ElementType = as || "div"
  return <ElementType className={className}>{children}</ElementType>
}

Stack.propTypes = {
  size: size.isSize,
}

export default Stack

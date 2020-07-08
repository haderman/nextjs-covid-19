import * as size from "utils/size"

// TODO: create "as" prop to render the component as the param e.g as li, div, etc

function Stack({ size, children, as }) {
  const className = size ? `stack-${size}` : ""
  const ElementType = as || "div"
  return <ElementType className={className}>{children}</ElementType>
}

Stack.propTypes = {
  size: size.isSize,
}

export default Stack

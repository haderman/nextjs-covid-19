import * as size from "../../utils/size"

// TODO: create "as" prop to render the component as the param e.g as li, div, etc

function Stack({ size, children }) {
  const className = size ? `stack-${size}` : ""
  return <div className={className}>{children}</div>
}

Stack.propTypes = {
  size: size.isSize,
}

export default Stack

import * as size from "../../utils/size"

function Stack({ size, children }) {
  const className = size ? `stack-${size}` : ""
  return <div className={className}>{children}</div>
}

Stack.propTypes = {
  size: size.isSize
}

export default Stack

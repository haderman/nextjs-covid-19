import * as size from "../../utils/size"

function Inline({ size, children }) {
  const className = size ? `inline-${size}` : ""
  return <span className={className}>{children}</span>
}

Inline.propTypes = {
  size: size.isSize
}

export default Inline

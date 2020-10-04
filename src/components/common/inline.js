import PropTypes from 'prop-types'
import * as size from "utils/size"

Inline.propTypes = {
  size: size.isSize,
  children: PropTypes.node,
  as: PropTypes.string,
  className: PropTypes.string,
};

export default function Inline({ size, children, as, className = "" }) {
  const inlineClassName = size ? `inline:${size}` : "inline-flex";
  const ElementType = as || "div";
  return (
    <ElementType className={`${inlineClassName} ${className}`.trim()}>
      {children}
    </ElementType>
  );
}

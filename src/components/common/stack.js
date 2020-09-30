import PropTypes from "prop-types";
import * as size from "utils/size";

Stack.propTypes = {
  size: size.isSize,
  children: PropTypes.node,
  as: PropTypes.string,
  className: PropTypes.string,
};

export default function Stack({ size, children, as, className = "" }) {
  const stackClassName = size ? `stack:${size}` : "stack";
  const ElementType = as || "div";
  return (
    <ElementType className={`${stackClassName} ${className}`.trim()}>
      {children}
    </ElementType>
  );
}

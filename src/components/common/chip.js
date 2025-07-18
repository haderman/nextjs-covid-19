import * as size from "utils/size"
import * as color from "utils/color"
import PropTypes from "prop-types"

function Chip({ children, size, rounded, background, color }) {
  const styles = [
    `rounded-${rounded}`,
    "squish-inset-s",
    // "border-s",
    "border-color-strong",
    "text-secondary",
    `text-${size}`,
    `background-${background}`,
    `color-${color}`,
  ].join(" ")
  return (
    <span className={styles}>
      {children}
    </span>
  )
}

Chip.propTypes = {
  children: PropTypes.node,
  size: size.isSize,
  rounded: size.isSize,
  background: color.isColor,
  color: color.isColor,
}

export default Chip

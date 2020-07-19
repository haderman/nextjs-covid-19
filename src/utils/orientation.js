const VERTICAL = "vertical"
const HORIZONTAL = "horizontal"

/**
 * Custom PropType validation
 * @param {*} props
 * @param {*} propName
 * @param {*} componentName
 */
function isOrientation(props, propName, componentName) {
  const value = props[propName]

  if (value === undefined || value === null || value === "") {
    return null
  }

  if (value === VERTICAL || value === HORIZONTAL) {
    return null
  }

  return new TypeError(`Invalid orientation Prop Value: ${value} for ${propName} in ${componentName}`);
}

function isVertical(orientation) {
  return orientation === VERTICAL
}

function isHorizontal(orientation) {
  return orientation === HORIZONTAL
}

export default {
  isOrientation,
  isVertical,
  isHorizontal,
  VERTICAL,
  HORIZONTAL,
}

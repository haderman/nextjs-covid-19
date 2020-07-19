export const XS = "xs"
export const S = "s"
export const M = "m"
export const L = "l"
export const XL = "xl"


/**
 * Custom PropType validation
 * @param {*} props
 * @param {*} propName
 * @param {*} componentName
 */
export function isSize(props, propName, componentName) {
  const value = props[propName]

  if (value === undefined || value === null || value === "") {
    return null
  }

  if (
    value === XS ||
    value === S ||
    value === M ||
    value === L ||
    value === XL
  ) {
    return null
  }

  return new TypeError(`Invalid Size Prop Value: ${value} for ${propName} in ${componentName}`);
}


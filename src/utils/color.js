export const DEEP_0 = "deep-0";
export const DEEP_1 = "deep-1";
export const DEEP_2 = "deep-2";
export const DEEP_3 = "deep-3";
export const DEEP_4 = "deep-4";
export const DEEP_5 = "deep-5";
export const DEEP_6 = "deep-5";
export const GREEN = "green";
export const GREEN_SOFT = "green-soft";
export const ORANGE = "orange";
export const ORANGE_SOFT = "orange-soft";
export const RED = "red";
export const RED_SOFT = "red-soft";
export const GRAY = "gray";
export const GRAY_SOFT = "gray-soft";
export const BLUE = "blue";
export const BLUE_SOFT = "blue-soft";

export function toHSL(color) {
  switch (color) {
    case GREEN: return "hsl(120, 60%, 40%)";
    case RED: return "hsl(0, 60%, 40%)";
    case ORANGE: return "hsl(40, 60%, 40%)";
    case GRAY: return "hsl(0, 0%, 46%)";
    case BLUE: return "hsl(215, 89%, 57%)";
    default: return "hsl(0, 0%, 46%)";
  }
}

/**
 * Custom PropType validation
 * @param {*} props
 * @param {*} propName
 * @param {*} componentName
 */
export function isColor(props, propName, componentName) {
  const value = props[propName];

  if (value === undefined || value === null || value === "") {
    return null;
  }

  if (
    value === DEEP_0 ||
    value === DEEP_1 ||
    value === DEEP_2 ||
    value === DEEP_3 ||
    value === DEEP_4 ||
    value === DEEP_5 ||
    value === DEEP_6 ||
    value === GREEN ||
    value === GREEN_SOFT ||
    value === GRAY ||
    value === GRAY_SOFT ||
    value === ORANGE ||
    value === ORANGE_SOFT ||
    value === RED ||
    value === RED_SOFT ||
    value === BLUE ||
    value === BLUE_SOFT
  ) {
    return null;
  }

  return new TypeError(`Invalid Size Prop Value: ${value} for ${propName} in ${componentName}`);
}


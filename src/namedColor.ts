import { convertcolorToRgb, convertcolorToHex, convertcolorToHsl } from './utils/converters'
import { rgbToString, hexToString, hslToString } from './utils/utils'

import type { RgbValues, HexValues, HlsValues } from './type'

/**
 * Convert a named color to RGB
 * @param arg {string} a string representing a named color
 * @param percent {boolean} if true, the result will be a string of the form rgb(r%, g%, b%) or rgba(r%, g%, b%, a%)
 * @see https://raw.githubusercontent.com/nwl-x/colorConverter.js/main/named-colors.htm
 * @returns {string} a string of the form rgb(r, g, b) or rgba(r,g, b, a)
 */
export const colorToRgb = (arg: string, percent = false): string => {
  const { r, g, b, a }: RgbValues = convertcolorToRgb(arg, percent)

  return rgbToString({ r, g, b, a })
}

/**
 * Convert a named color to HEX
 * @param arg {string} a string representing a named color
 * @see https://raw.githubusercontent.com/nwl-x/colorConverter.js/main/named-colors.htm
 * @returns {string} a string of the form #rrggbb or #rrggbbaa
 */
export const colorToHex = (arg: string) => {
  const { r, g, b, a }: HexValues = convertcolorToHex(arg)

  return hexToString({ r, g, b, a })
}

/**
 * Convert a named color to HSL
 * @param arg {string} a string representing a named color
 * @see https://raw.githubusercontent.com/nwl-x/colorConverter.js/main/named-colors.htm
 * @returns {string} a string of the form hsl(h, s%, l%) or hsla(h, s%, l%, a%)
 */
export const colorToHsl = (arg: string) => {
  const { h, s, l, a }: HlsValues = convertcolorToHsl(arg)

  return hslToString({ h, s, l, a })
}

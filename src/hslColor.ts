import { convertHslToRgb, convertHslToHex } from './utils/converters'
import { rgbToString, hexToString } from './utils/utils'

import type { RgbValues, HexValues } from './type'

// TODO arg = string | RgbValues Object

/**
 * Convert a HSL color to RGB
 *
 * @param arg {string} - a string of the form hsl(h, s%, l%) or hsla(h, s%, l%, a%)
 * @param percent {boolean} - if true, the result will be a string of the form rgb(r%, g%, b%) or rgba(r%, g%, b%, a%)
 * @returns {string} a string of the form rgb(r, g, b) or rgba(r,g, b, a)
 */
export const hslToRgb = (arg: string): string => {
  const { r, g, b, a }: RgbValues = convertHslToRgb(arg)

  return rgbToString({ r, g, b, a })
}

/**
 * Convert a HSL color to HEX
 *
 * @param arg {string} - a string of the form hsl(h, s%, l%) or hsla(h, s%, l%, a%)
 * @returns {string} a string of the form #rrggbb or #rrggbbaa
 */
export const hslToHex = (arg: string): string => {
  const { r, g, b, a }: HexValues = convertHslToHex(arg)

  return hexToString({ r, g, b, a })
}

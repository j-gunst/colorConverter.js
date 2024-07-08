import { convertHslToRgb, convertHslToHex } from './utils/converters'
import { rgbToString, hexToString } from './utils/utils'

import type { RgbValues, HexValues } from './type'

/**
 * Convert a HSL color to RGB
 *
 * @param {string} arg - a string of the form hsl(h, s%, l%) or hsla(h, s%, l%, a%)
 * @param {boolean} percent - if true, the result will be a string of the form rgb(r%, g%, b%) or rgba(r%, g%, b%, a%)
 * @returns {string} a string of the form rgb(r, g, b) or rgba(r,g, b, a)
 */
export const hslToRgb = (arg: string, percent: boolean = false): string => {
  const { red, green, blue, alpha }: RgbValues = convertHslToRgb(arg, percent)

  return rgbToString({ red, green, blue, alpha })
}

/**
 * Convert a HSL color to HEX
 *
 * @param {string} arg - a string of the form hsl(h, s%, l%) or hsla(h, s%, l%, a%)
 * @returns {string} a string of the form #rrggbb or #rrggbbaa
 */
export const hslToHex = (arg: string): string => {
  const { red, green, blue, alpha }: HexValues = convertHslToHex(arg)

  return hexToString({ red, green, blue, alpha })
}

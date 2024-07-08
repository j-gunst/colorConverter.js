import { convertHexToRgb, convertHexToHls } from './utils/converters'
import { rgbToString, hslToString } from './utils/utils'

import type { HexValues, HlsValues } from './type'

// TODO arg = string | HexValues Object

/**
 * Convert a HEX color to RGB
 *
 * @param arg {string} - a string of the form #rrggbb or #rrggbbaa
 * @param percent {boolean} - if true, the result will be a string of the form rgb(r%, g%, b%) or rgba(r%, g%, b%, a%)
 * @returns {string} a string of the form rgb(r, g, b) or rgba(r,g, b, a)
 */
export const hexToRgb = (arg: string, percent: boolean = false): string => {
  const { r, g, b, a }: HexValues = convertHexToRgb(arg, percent)

  return rgbToString({ r, g, b, a })
}

/**
 * Convert a HEX color to HSL
 *
 * @param arg {string} - a string of the form #rrggbb or #rrggbbaa
 * @returns {string} a string of the form hsl(h, s%, l%) or hsla(h, s%, l%, a%)
 */
export const hexToHsl = (arg: string): string => {
  const { h, s, l, a }: HlsValues = convertHexToHls(arg)

  return hslToString({ h, s, l, a })
}

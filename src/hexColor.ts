import { convertHexToRgb, convertHexToHls } from './utils/converters'
import { rgbToString, hslToString } from './utils/utils'

import type { HexValues, HlsValues } from './type'

/**
 * Convert a HEX color to RGB
 *
 * @param {string} arg - a string of the form #rrggbb or #rrggbbaa
 * @param {boolean} percent - if true, the result will be a string of the form rgb(r%, g%, b%) or rgba(r%, g%, b%, a%)
 * @returns {string} a string of the form rgb(r, g, b) or rgba(r,g, b, a)
 */
export const hexToRgb = (arg: string, percent: boolean = false): string => {
  const { red, green, blue, alpha }: HexValues = convertHexToRgb(arg, percent)

  return rgbToString({ red, green, blue, alpha })
}

/**
 * Convert a HEX color to HSL
 *
 * @param {string} arg - a string of the form #rrggbb or #rrggbbaa
 * @returns {string} a string of the form hsl(h, s%, l%) or hsla(h, s%, l%, a%)
 */
export const hexToHsl = (arg: string): string => {
  const { hue, saturation, lightness, alpha }: HlsValues = convertHexToHls(arg)

  return hslToString({ hue, saturation, lightness, alpha })
}

import { convertRgbToHex, convertRgbToHls } from './utils/converters'
import { hexToString, hslToString } from './utils/utils'

import type { HexValues, HlsValues } from './type'

/**
 * Convert a RGB color to HEX
 *
 * @param {string} arg - a string of the form rgb(r, g, b) or rgba(r,g, b, a)
 * @returns {string} a string of the form #rrggbb or #rrggbbaa
 */
export const rgbToHex = (arg: string): string => {
  const { red, green, blue, alpha }: HexValues = convertRgbToHex(arg)

  return hexToString({ red, green, blue, alpha })
}

/**
 * Convert a RGB color to HSL
 *
 * @param {string} arg - a string of the form rgb(r, g, b) or rgba(r,g, b, a)
 * @returns {string} a string of the form hsl(h, s%, l%) or hsla(h, s%, l%, a%)
 */
export const rgbToHsl = (arg: string): string => {
  const { hue, saturation, lightness, alpha }: HlsValues = convertRgbToHls(arg)

  return hslToString({ hue, saturation, lightness, alpha })
}

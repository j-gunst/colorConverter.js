import { convertRgbToHex, convertRgbToHls } from './utils/converters'
import { hexToString, hslToString } from './utils/utils'

import type { HexValues, HlsValues } from './type'

// TODO arg = string | HexValues Object

/**
 * Convert a RGB color to HEX
 *
 * @param arg {string} - a string of the form rgb(r, g, b) or rgba(r,g, b, a)
 * @returns {string} a string of the form #rrggbb or #rrggbbaa
 */
export const rgbToHex = (arg: string) => {
  const { r, g, b, a }: HexValues = convertRgbToHex(arg)

  return hexToString({ r, g, b, a })
}

/**
 * Convert a RGB color to HSL
 *
 * @param arg {string} - a string of the form rgb(r, g, b) or rgba(r,g, b, a)
 * @returns {string} a string of the form hsl(h, s%, l%) or hsla(h, s%, l%, a%)
 */
export const rgbToHsl = (arg: string) => {
  const { h, s, l, a }: HlsValues = convertRgbToHls(arg)

  return hslToString({ h, s, l, a })
}

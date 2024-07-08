import { convertcolorToRgb, convertcolorToHex, convertcolorToHsl } from './utils/converters'
import { rgbToString, hexToString, hslToString } from './utils/utils'

import type { RgbValues, HexValues, HlsValues } from './type'

/**
 * Convert a named color to RGB
 *
 * @param {string} arg a string representing a named color
 * @param {boolean} percent if true, the result will be a string of the form rgb(r%, g%, b%) or rgba(r%, g%, b%, a%)
 * @see https://www.w3.org/TR/css-color-4/#named-colors
 * @returns {string} a string of the form rgb(r, g, b) or rgba(r,g, b, a)
 */
export const colorToRgb = (arg: string, percent: boolean = false): string => {
  const { red, green, blue, alpha }: RgbValues = convertcolorToRgb(arg, percent)

  return rgbToString({ red, green, blue, alpha })
}

/**
 * Convert a named color to HEX
 *
 * @param {string} arg a string representing a named color
 * @see https://www.w3.org/TR/css-color-4/#named-colors
 * @returns {string} a string of the form #rrggbb or #rrggbbaa
 */
export const colorToHex = (arg: string): string => {
  const { red, green, blue, alpha }: HexValues = convertcolorToHex(arg)

  return hexToString({ red, green, blue, alpha })
}

/**
 * Convert a named color to HSL
 *
 * @param {string} arg a string representing a named color
 * @see https://www.w3.org/TR/css-color-4/#named-colors
 * @returns {string} a string of the form hsl(h, s%, l%) or hsla(h, s%, l%, a%)
 */
export const colorToHsl = (arg: string): string => {
  const { hue, saturation, lightness, alpha }: HlsValues = convertcolorToHsl(arg)

  return hslToString({ hue, saturation, lightness, alpha })
}

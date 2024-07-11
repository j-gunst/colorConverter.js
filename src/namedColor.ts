import { convertcolorToRgb, convertcolorToHex, convertcolorToHsl } from './utils/converters'
import { formatRgb, formatHex, formatHsl } from './utils/formaters'

import type { RgbValues, HexValues, HlsValues } from './type'

/**
 * ## Convert a named color to RGB
 *
 * @param {string} arg - a CSS named color
 * @param {boolean} percent - if true it returns rgb in percent
 * @see https://www.w3.org/TR/css-color-4/#named-colors
 *
 * @returns {string} rgb(r, g, b) or rgba(r,g, b, a)
 */
export const colorToRgb = (arg: string, percent: boolean = false): string => {
  const { red, green, blue, alpha }: RgbValues = convertcolorToRgb(arg, percent)

  return formatRgb({ red, green, blue, alpha })
}

/**
 * ## Convert a named color to HEX
 *
 * @param {string} arg - a CSS named color
 * @see https://www.w3.org/TR/css-color-4/#named-colors
 *
 * @returns {string} #rrggbb or #rrggbbaa
 */
export const colorToHex = (arg: string): string => {
  const { red, green, blue, alpha }: HexValues = convertcolorToHex(arg)

  return formatHex({ red, green, blue, alpha })
}

/**
 * ## Convert a named color to HSL
 *
 * @param {string} arg - a CSS named color
 * @see https://www.w3.org/TR/css-color-4/#named-colors
 *
 * @returns {string} hsl(h, s%, l%) or hsla(h, s%, l%, a%)
 */
export const colorToHsl = (arg: string): string => {
  const { hue, saturation, lightness, alpha }: HlsValues = convertcolorToHsl(arg)

  return formatHsl({ hue, saturation, lightness, alpha })
}

import { convertHslToRgb, convertHslToHex } from './utils/converters'
import { formatRgb, formatHex } from './utils/formaters'

import type { RgbValues, HexValues } from './type'

/**
 * ## Convert a HSL color to RGB
 *
 * @param {string} arg - various formats:
 *  - hsl[a](h, s%, l%[, a%])
 *  - { h, s, l[, a] }
 * @param {boolean} percent - if true it returns rgb in percent
 *
 * @returns {string} rgb(r, g, b) or rgba(r,g, b, a)
 */
export const hslToRgb = (arg: string, percent: boolean = false): string => {
  const { red, green, blue, alpha }: RgbValues = convertHslToRgb(arg, percent)

  return formatRgb({ red, green, blue, alpha })
}

/**
 * ## Convert a HSL color to HEX
 *
 * @param {string} arg - various formats:
 *  - hsl[a](h, s%, l%[, a%])
 *  - { h, s, l[, a] }
 * @returns {string} #rrggbb or #rrggbbaa
 */
export const hslToHex = (arg: string): string => {
  const { red, green, blue, alpha }: HexValues = convertHslToHex(arg)

  return formatHex({ red, green, blue, alpha })
}

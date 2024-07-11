import { convertHexToRgb, convertHexToHls } from './utils/converters'
import { formatRgb, formatHsl } from './utils/formaters'

import type { HexArgument, HexValues, HlsValues } from './type'

/**
 * ## Convert a HEX color to RGB
 *
 * @param {string | HexArgument} arg - various formats:
 *  - [#]rgb[a]
 *  - [#]rrggbb[aa]
 *  - {r, g, b[, a]}
 * @param {boolean} percent - if true it returns rgb in percent
 *
 * @returns {string} rgb(r, g, b) or rgba(r,g, b, a)
 */
export const hexToRgb = (arg: string | HexArgument, percent: boolean = false): string => {
  const { red, green, blue, alpha }: HexValues = convertHexToRgb(arg, percent)

  return formatRgb({ red, green, blue, alpha })
}

/**
 * ## Convert a HEX color to HSL
 *
 * @param {string | HexArgument} arg - various formats:
 *  - [#]rgb[a]
 *  - [#]rrggbb[aa]
 *  - {r, g, b[, a]}
 *
 * @returns {string} hsl(h, s%, l%) or hsla(h, s%, l%, a%)
 */
export const hexToHsl = (arg: string | HexArgument): string => {
  const { hue, saturation, lightness, alpha }: HlsValues = convertHexToHls(arg)

  return formatHsl({ hue, saturation, lightness, alpha })
}

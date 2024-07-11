import { convertRgbToHex, convertRgbToHls } from './utils/converters'
import { formatHex, formatHsl } from './utils/formaters'

import type { HexValues, HlsValues } from './type'

/**
 * ## Convert a RGB color to HEX
 *
 * @param {string} arg - various formats:
 *  - rgb[a](r, g, b[, a])
 *  - { r, g, b[, a] }
 *
 * @returns {string} a #rrggbb or #rrggbbaa
 */
export const rgbToHex = (arg: string): string => {
  const { red, green, blue, alpha }: HexValues = convertRgbToHex(arg)

  return formatHex({ red, green, blue, alpha })
}

/**
 * ## Convert a RGB color to HSL
 *
 * @param {string} arg  - various formats:
 *  - rgb[a](r, g, b[, a])
 *  - { r, g, b[, a] }
 *
 * @returns {string} hsl(h, s%, l%) or hsla(h, s%, l%, a%)
 */
export const rgbToHsl = (arg: string): string => {
  const { hue, saturation, lightness, alpha }: HlsValues = convertRgbToHls(arg)

  return formatHsl({ hue, saturation, lightness, alpha })
}

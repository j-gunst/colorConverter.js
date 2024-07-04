import { convertcolorToRgb, convertcolorToHex, convertcolorToHsl } from './utils/converters'
import { rgbToString, hexToString, hslToString } from './utils/utils'

import type { RgbValues, HexValues, HlsValues } from './type'

export const colorToRgb = (arg: string, percent = false) => {
  const { r, g, b, a }: RgbValues = convertcolorToRgb(arg, percent)

  return rgbToString({ r, g, b, a })
}

export const colorToHex = (arg: string) => {
  const { r, g, b, a }: HexValues = convertcolorToHex(arg)

  return hexToString({ r, g, b, a })
}

export const colorToHsl = (arg: string) => {
  const { h, s, l, a }: HlsValues = convertcolorToHsl(arg)

  return hslToString({ h, s, l, a })
}

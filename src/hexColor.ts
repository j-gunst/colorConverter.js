import { convertHexToRgb, convertHexToHls } from './utils/converters'
import { rgbToString, hslToString } from './utils/utils'

import type { HexValues, HlsValues } from './type'

// TODO arg = string | HexValues Object
export const hexToRgb = (arg: string, percent = false) => {
  const { r, g, b, a }: HexValues = convertHexToRgb(arg, percent)

  return rgbToString({ r, g, b, a })
}

// TODO arg = string | HlsValues Object
export const hexToHsl = (arg: string) => {
  const { h, s, l, a }: HlsValues = convertHexToHls(arg)

  return hslToString({ h, s, l, a })
}

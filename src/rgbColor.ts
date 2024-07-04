import { convertRgbToHex, convertRgbToHls } from './utils/converters'
import { hexToString, hslToString } from './utils/utils'

import type { HexValues, HlsValues } from './type'

// TODO arg = string | HexValues Object
export const rgbToHex = (arg: string) => {
  const { r, g, b, a }: HexValues = convertRgbToHex(arg)

  return hexToString({ r, g, b, a })
}

// TODO arg = string | HexValues Object
export const rgbToHsl = (arg: string) => {
  const { h, s, l, a }: HlsValues = convertRgbToHls(arg)

  return hslToString({ h, s, l, a })
}

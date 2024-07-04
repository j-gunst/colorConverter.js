import { convertHslToRgb, convertHslToHex } from './utils/converters'
import { rgbToString, hexToString } from './utils/utils'

import type { RgbValues, HexValues } from './type'

// TODO arg = string | RgbValues Object
export const hslToRgb = (arg: string) => {
  const { r, g, b, a }: RgbValues = convertHslToRgb(arg)

  return rgbToString({ r, g, b, a })
}

// TODO arg = string | HexValues Object
export const hslToHex = (arg: string) => {
  const { r, g, b, a }: HexValues = convertHslToHex(arg)

  return hexToString({ r, g, b, a })
}

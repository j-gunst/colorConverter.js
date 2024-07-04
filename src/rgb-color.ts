import { HexValues, HlsValues } from './type'
import { convertRgbToHex, convertRgbToHls } from './utils/rgb-utils'

export const rgbToHex = (arg: string) => {
  const { r, g, b, a }: HexValues = convertRgbToHex(arg)

  return `#${r}${g}${b}${a ? a : ''}`
}

export const rgbToHsl = (arg: string) => {
  const { hue, saturation, lightness, alpha }: HlsValues = convertRgbToHls(arg)

  return alpha ? `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})` : `hsl(${hue}, ${saturation}%, ${lightness}%)`
}

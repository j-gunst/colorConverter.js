export type RgbValues = {
  r: string
  g: string
  b: string
  a?: string
}

export type HexValues = RgbValues

export type HlsValues = {
  hue: number
  saturation: number
  lightness: number
  alpha?: string | null
}

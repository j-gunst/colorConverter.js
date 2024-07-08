export type RgbValues = {
  red: string
  green: string
  blue: string
  alpha?: string
}

export type HexValues = {
  red: string
  green: string
  blue: string
  alpha?: string
}

export type HlsValues = {
  hue: string
  saturation: string
  lightness: string
  alpha?: string
}

export type NamedColor = {
  name: string
  hex: string
  rgb: {
    red: number | string
    green: number | string
    blue: number | string
  }
  hsl: {
    hue: number
    saturation: number
    lightness: number
  }
}

export type NamedColors = {
  [key: string]: NamedColor
}

import { isNamedColor } from './utils/utils'
export declare const rgbToHex: (arg: string) => string
export declare const rgbToHsl: (arg: string) => string

export declare const hexToRgb: (arg: string) => string
export declare const hexToHsl: (arg: string) => string

export declare const hslTorgb: (arg: string) => string
export declare const hslToHex: (arg: string) => string

export type RgbValues = {
  r: string
  g: string
  b: string
  a?: string
}

export type HexValues = RgbValues

export type HlsValues = {
  h: string
  s: string
  l: string
  a?: string
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

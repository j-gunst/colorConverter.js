export type RgbValues = {
  red: string
  green: string
  blue: string
  alpha?: string
}

export type HexValues = RgbValues

export type ChannelValues = RgbValues

export type ChannelType = 'hex' | 'hsl'

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

export type RbgArgument = {
  r: string | number
  g: string | number
  b: string | number
  a?: string | number
}

export type HexArgument = RbgArgument

export type HlsArgument = {
  h: string | number
  s: string
  l: string
  a?: string
}

export declare const rgbToHex: (arg: string) => string
export declare const rgbToHsl: (arg: string) => string
export declare const hexToRgb: (arg: string, percent?: boolean) => string
export declare const hexToHsl: (arg: string) => string
export declare const hslToRgb: (arg: string, percent?: boolean) => string
export declare const hslToHex: (arg: string) => string
export declare const colorToRgb: (arg: string, percent?: boolean) => string
export declare const colorToHex: (arg: string) => string
export declare const colorToHsl: (arg: string) => string

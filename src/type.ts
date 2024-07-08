export declare const hexToRgb: (arg: string, percent?: boolean) => string
export declare const hexToHsl: (arg: string) => string

export declare const hslToRgb: (arg: string) => string
export declare const hslToHex: (arg: string) => string

export declare const rgbToHex: (arg: string) => string
export declare const rgbToHsl: (arg: string) => string

export declare const colorToRgb: (arg: string, percent?: boolean) => string
export declare const colorToHex: (arg: string) => string
export declare const colorToHsl: (arg: string) => string

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

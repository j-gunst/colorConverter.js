import namedColors from '../namedColors.json'

import type { RgbValues, HexValues, HlsValues, NamedColor } from '../type'

// ==== Regex ====

export const rgbRegex =
  /^rgba?\(\s*(?<r>\d{1,3}%?)\s*,?\s*(?<g>\d{1,3}%?)\s*,?\s*(?<b>\d{1,3}%?)(?:\s*(,|\/)?\s*)?(?<a>0?\.\d{1,2}|\d{1,3}%?|\d{1,3}\s*\/\s*\d{1,3})?\)$/i

export const hexRegex = /^#(?<r>[0-9a-f]{1,2})(?<g>[0-9a-f]{1,2})(?<b>[0-9a-f]{1,2})(?<a>[0-9a-f]{2})?$/i

export const hslRegex =
  /^hsla?\(\s*('|")?(?<h>\d{1,3})('|")?\s*,?\s*(?<s>\d{1,3}%?)\s*,?\s*(?<l>\d{1,3}%?)\s*,?\s*(?<a>0?\.\d{1,2}|\d{1,3}%?|\d{1,3}\s*\/\s*\d{1,3})?\s*\)$/i

// ==== checkers ====

// TODO add tests utils.spec.ts
export const isString = (arg: string) => typeof arg === 'string'

// TODO add tests utils.spec.ts
export const isRgbColor = (arg: string) => isString(arg) && rgbRegex.test(arg)

// TODO add tests utils.spec.ts
export const isHexColor = (arg: string) => isString(arg) && hexRegex.test(arg)

// TODO add tests utils.spec.ts
export const isHslColor = (arg: string) => isString(arg) && hslRegex.test(arg)

// TODO add tests utils.spec.ts
export const isNamedColor = (arg: string) => {
  return (
    isString(arg) &&
    Object.keys(namedColors)
      .map((color) => color.toLowerCase())
      .includes(arg.toLowerCase())
  )
}

// ==== Utils ====

// TODO add tests utils.spec.ts
export const hexToString = ({ r, g, b, a }: HexValues) => `#${r}${g}${b}${a ? a : ''}`

// TODO add tests utils.spec.ts
export const rgbToString = ({ r, g, b, a }: RgbValues) => `rgb${a ? 'a' : ''}(${r}, ${g}, ${b}${a ? `, ${a}` : ''})`

// TODO add tests utils.spec.ts
export const hslToString = ({ h, s, l, a }: HlsValues) => `hsl${a ? 'a' : ''}(${h}, ${s}%, ${l}%${a ? `, ${a}%` : ''})`

// TODO add tests utils.spec.ts
export const getNamedColorInfos = (arg: string): NamedColor => {
  const colorInfos = Object.values(namedColors)
    .map((color) => {
      if (color.name.toLowerCase() === arg.toLowerCase()) {
        return color
      }

      return false
    })
    .filter(Boolean)

  return colorInfos[0] || namedColors['White']
}

import { formatHexString, formatHsl, formatRgb } from './formaters'
import { extractRgbValues, isHslColor, isString } from './utils'

import type { RbgArgument, HexArgument, HlsValues, RgbValues, HlsArgument } from '../type'

// ==== RGB(A) ====

/**
 * @param {string | RbgArgument} arg - various formats:
 *  - rgb[a](r, g, b[, a])
 *  - { r, g, b[, a] }
 */
export const resolveRgbArgument = (arg: string | RbgArgument): string => {
  if (isString(arg)) {
    return formatRgb(extractRgbValues(arg as string))
  }

  const { r = '255', g = '255', b = '255', a: alpha = undefined } = (arg as RbgArgument) || {}

  const red = r.toString().endsWith('%') ? r.toString().slice(0, -1) : r
  const green = g.toString().endsWith('%') ? g.toString().slice(0, -1) : g
  const blue = b.toString().endsWith('%') ? b.toString().slice(0, -1) : b

  const rbg = { red, green, blue, alpha } as RgbValues

  return formatRgb(rbg)
}

// ==== HEX(A) ====

/**
 * @param {string | HexArgument} arg - various formats:
 *  - [#]rgb[a]
 *  - [#]rrggbb[aa]
 *  - {r, g, b[, a]}
 */
export const resolveHexArgument = (arg: string | HexArgument): string => {
  if (isString(arg)) {
    if (!(arg as string).startsWith('#')) {
      return formatHexString(`#${arg as string}`)
    }

    return formatHexString(arg as string)
  }

  const {
    r: red = '255',
    g: green = '255',
    b: blue = '255',
    a: alpha = undefined
  }: HexArgument = (arg as HexArgument) || {}

  const hex = Object.values({ red, green, blue, alpha }).filter(Boolean).join('')

  return formatHexString(hex)
}

// ==== HSL(A) ====

/**
 * @param {string | HlsArgument} arg - various formats:
 *  - hsl[a](h, s%, l%[, a%])
 *  - { h, s, l[, a] }
 */
export const resolveHslArgument = (arg: string | HlsArgument): string => {
  if (isString(arg) && isHslColor(arg as string)) {
    return arg as string
  }

  const { h = '0', s = '0', l = '100', a = undefined }: HlsArgument = (arg as HlsArgument) || {}

  const hue = h.toString()
  const saturation = s.toString().endsWith('%') ? s.toString().slice(0, -1) : s
  const lightness = s.toString().endsWith('%') ? l.toString().slice(0, -1) : l
  const alpha = a && a.toString().endsWith('%') ? a.toString().slice(0, -1) : a

  const hsl = { hue, saturation, lightness, alpha } as HlsValues

  return formatHsl(hsl)
}

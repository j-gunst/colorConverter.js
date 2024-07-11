import type { RgbValues, HexValues, HlsValues } from '../type'

/**
 * @param {RgbValues} param0
 * @returns {string}
 */
export const formatRgb = ({ red, green, blue, alpha }: RgbValues): string => {
  return `rgb${alpha ? 'a' : ''}(${red},${green},${blue}${alpha ? `,${alpha}` : ''})`
}

/**
 * @param {HexValues} param0
 * @returns {string}
 */
export const formatHex = ({ red, green, blue, alpha }: HexValues): string => {
  return `#${red}${green}${blue}${alpha ? alpha : ''}`
}

export const formatHexString = (arg: string): string => {
  let output = arg

  if (!output.startsWith('#')) {
    output = `#${output}`
  }

  const hex = output.replace('#', '').split('')

  // rrggbb or rrggbbaa
  if ([6, 8].includes(hex.length)) {
    output = hex.join('')
  }

  // rgb or rgba
  if ([3, 4].includes(hex.length)) {
    output = hex.map((rgb) => rgb.repeat(2)).join('')
  }

  return `#${output}`
}

/**
 * @param {HlsValues} param0
 * @returns {string}
 */
export const formatHsl = ({ hue, saturation, lightness, alpha }: HlsValues): string => {
  return `hsl${alpha ? 'a' : ''}(${hue},${saturation}%,${lightness}%${alpha ? `,${alpha}%` : ''})`
}

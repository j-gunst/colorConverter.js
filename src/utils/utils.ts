import namedColors from '../namedColors.json'
import { RGB_DEFAULT_VALUES, HEX_DEFAULT_VALUES, HSL_DEFAULT_VALUES } from './constants'

import type { RgbValues, HexValues, HlsValues, NamedColor } from '../type'

// ==== Regex ====

export const rgbRegex =
  /^rgba?\(\s*(?<red>\d{1,3}%?)\s*,?\s*(?<green>\d{1,3}%?)\s*,?\s*(?<blue>\d{1,3}%?)(?:\s*(,|\/)?\s*)?(?<alpha>0?\.\d{1,2}|\d{1,3}%?|\d{1,3}\s*\/\s*\d{1,3})?\)$/i

export const hexRegex = /^#(?<red>[0-9a-f]{1,2})(?<green>[0-9a-f]{1,2})(?<blue>[0-9a-f]{1,2})(?<alpha>[0-9a-f]{1,2})?$/i

export const hslRegex =
  /^hsla?\(\s*(?:'|")?(?<hue>(\d{1,3}|\d*\.\d*)(?:deg|rad|turn)?)(?:%)?(?:'|")?\s*,?\s*(?<saturation>\d{1,3})(?:%)?\s*,?\s*(?<lightness>\d{1,3})(?:%)?\s*,?\s*(?<alpha>0?\.\d{1,2}|\d{1,3}%?|\d{1,3}\s*\/\s*\d{1,3})?\s*\)$/i

// ==== checkers ====

/**
 * @param {unknown} arg
 * @returns {boolean}
 */
export const isString = (arg: unknown): boolean => typeof arg === 'string'

/**
 * @param {string} arg
 * @returns {boolean}
 */
export const isRgbColor = (arg: string): boolean => isString(arg) && rgbRegex.test(arg)

/**
 * @param {string} arg
 * @returns {boolean}
 */
export const isHexColor = (arg: string): boolean => isString(arg) && hexRegex.test(arg)

/**
 * @param {string} arg
 * @returns {boolean}
 */
export const isHslColor = (arg: string): boolean => isString(arg) && hslRegex.test(arg)

/**
 * @param {string} arg
 * @returns {boolean}
 */
export const isNamedColor = (arg: string): boolean => {
  return (
    isString(arg) &&
    Object.keys(namedColors)
      .map((color) => color.toLowerCase())
      .includes(arg.toLowerCase())
  )
}

// ==== Utils ====

/**
 * @param {string} arg
 *
 * @returns {RgbValues}
 */
export const extractRgbValues = (arg: string): RgbValues => {
  let groups: RgbValues = RGB_DEFAULT_VALUES

  if (!isRgbColor(arg)) {
    return groups
  }

  const result = rgbRegex.exec(arg)

  if (result) {
    groups = result.groups as RgbValues
  }

  return groups
}

/**
 * @param {string} arg
 * @returns {HexValues | null}
 */
export const extractHexValues = (arg: string): HexValues => {
  let groups: HexValues = HEX_DEFAULT_VALUES

  if (!isHexColor(arg)) {
    return groups
  }

  const result = hexRegex.exec(arg)

  if (result) {
    groups = result.groups as HexValues
  }

  return groups
}

/**
 * @param {string} arg
 * @returns {HlsValues | null}
 */
export const extractHslValues = (arg: string): HlsValues => {
  let groups: HlsValues = HSL_DEFAULT_VALUES

  if (!isHslColor(arg)) {
    return groups
  }

  const result = hslRegex.exec(arg)

  if (result) {
    groups = result.groups as HlsValues
  }

  return groups
}

/**
 * @param {string} arg
 * @returns {NamedColor}
 */
export const getNamedColorInfos = (arg: string): NamedColor | null => {
  const colorInfos = Object.values(namedColors)
    .map((color) => {
      if (color.name.toLowerCase() === arg.toLowerCase()) {
        return color
      }

      return false
    })
    .filter(Boolean)

  return colorInfos[0] || null
}

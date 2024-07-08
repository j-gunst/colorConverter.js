import type { RgbValues } from '../type'
import { extractRgbValues } from './utils'

/**
 * @param {string | undefined} alpha - a channel RGB / HSL alpha value
 * @return {string | null} a calculated channel RGB / HSL alpha value
 */
export const processPercentDivider = (alpha: string | undefined): string | undefined => {
  if (!alpha) {
    return undefined
  }

  let output = `${alpha}`

  if (output.endsWith('%')) {
    output = `${+output.slice(0, -1) / 100}`
  }

  if (output.indexOf('/') !== -1) {
    const calc = output.split('/')

    output = `${+calc[0] / +calc[1] / 100}`
  }

  return output
}

// ==== RGB(A) to HEX(A) ====

/**
 * @param {string} channel - a channel RGB value
 * @return {string} a channel HEX value
 */
export const processRgb = (channel: string): string => {
  let output = +channel > 255 ? '255' : channel.toString()

  if (output.endsWith('%')) {
    output = Math.round(255 / (100 / +output.slice(0, -1))).toString()
  }

  return (+output).toString(16).padStart(2, '0').toString()
}

/**
 * @param {string | undefined} alpha - a channel RGB alpha value
 * @return {string | null} a channel HEX alpha value
 */
export const processRgbAlpha = (alpha: string | undefined): string | undefined => {
  const processed = processPercentDivider(alpha)

  if (processed) {
    return Math.round(+processed * 255).toString(16)
  }

  return undefined
}

export const processRgbToHex = (arg: string): RgbValues => {
  const { red, green, blue, alpha } = extractRgbValues(arg)

  let output: RgbValues = {
    red: processRgb(red),
    green: processRgb(green),
    blue: processRgb(blue)
  }

  if (alpha) {
    output = { ...output, alpha: processRgbAlpha(alpha) }
  }

  return output
}

// ==== RGB(A) to HSL(A) ====

export const processHsl = (channel: string): string => {
  let output = +channel > 255 ? '255' : channel.toString()

  if (output.endsWith('%')) {
    output = Math.round(255 / (100 / +output.slice(0, -1))).toString()
  }

  return (+output / 255).toString()
}

/**
 * @param {string | undefined} alpha - a channel RGB alpha value
 * @return {string | null} a channel HSL alpha value
 */
export const processHslAlpha = (alpha: string | undefined): string | undefined => {
  const processed = processPercentDivider(alpha)

  if (processed) {
    return `${+processed * 100}`
  }

  return undefined
}

/**
 * @param {RgbValues} param0 - an object of the form { r, g, b }
 * @return {ChannelValues} an object of the form { red: string, green: string, blue: string }
 */
export const processRgbToHls = (arg: string): RgbValues => {
  const { red, green, blue, alpha } = extractRgbValues(arg)

  let output: RgbValues = {
    red: processHsl(red),
    green: processHsl(green),
    blue: processHsl(blue)
  }

  if (alpha) {
    output = { ...output, alpha: processHslAlpha(alpha) }
  }

  return output
}

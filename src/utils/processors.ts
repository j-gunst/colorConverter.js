import type { ChannelType, ChannelValues } from '../type'
import { extractRgbValues } from './utils'

/**
 * @param {string | undefined} alpha - a channel RGB|HSL alpha value
 *
 * @return {string | null} a calculated channel RGB|HSL alpha value
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

/**
 * @param {string | undefined} alpha - a channel RGB alpha value
 *
 * @return {string | null} a channel HEX alpha value
 */
export const processRgbAlpha = (alpha: string | undefined, type: string = 'hex'): string | undefined => {
  const processed = processPercentDivider(alpha)

  if (!processed) {
    return undefined
  }

  if (type === 'hex') {
    return Math.round(+processed * 255).toString(16)
  }

  return `${+processed * 100}`
}

/**
 * @param {string} channel - a channel RGB value
 *
 * @return {string} a channel HEX value
 */
export const processRgb = (channel: string, type: ChannelType = 'hex'): string => {
  let output = +channel > 255 ? '255' : channel.toString()

  if (output.endsWith('%')) {
    output = Math.round(255 / (100 / +output.slice(0, -1))).toString()
  }

  if (type === 'hex') {
    return (+output).toString(16).padStart(2, '0').toString()
  }

  return (+output / 255).toString()
}

export const processRgbChannel = (arg: string, type: ChannelType = 'hex'): ChannelValues => {
  const { red, green, blue, alpha } = extractRgbValues(arg)

  let output: ChannelValues = {
    red: processRgb(red, type),
    green: processRgb(green, type),
    blue: processRgb(blue, type)
  }

  if (alpha) {
    output = { ...output, alpha: processRgbAlpha(alpha, type) }
  }

  return output
}

/**
 * @param {RgbValues} arg - rgb[a](r, g, b[, a])
 *
 * @return {ChannelValues}
 */
export const processRgbToHex = (arg: string): ChannelValues => {
  return processRgbChannel(arg, 'hex')
}

/**
 * @param {RgbValues} arg - hsl[a](h, s%, l%[, a%])
 *
 * @return {ChannelValues}
 */
export const processRgbToHls = (arg: string): ChannelValues => {
  return processRgbChannel(arg, 'hsl')
}

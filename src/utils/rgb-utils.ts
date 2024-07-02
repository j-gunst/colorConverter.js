import { RgbValues, HexValues, HlsValues } from '../type'

// ==== Regex ====

const rgbRegex =
  /^rgba?\(\s*(?<r>\d{1,3}%?)\s*,?\s*(?<g>\d{1,3}%?)\s*,?\s*(?<b>\d{1,3}%?)(?:\s*(,|\/)?\s*)?(?<a>(0?\.\d{1,2}|\d{1,3}%?|\d{1,3}\s*\/\s*\d{1,3}))?\)$/i

// ==== Utils ====

const stringToHex = (arg: string): string => (+arg).toString(16).padStart(2, '0')

const isRgbColor = (arg: string): boolean => typeof arg === 'string' && rgbRegex.test(arg)

const convertChannel = (channel: string) => {
  let output = channel || '255'

  // Percentage
  if (output.endsWith('%')) {
    output = `${Math.round(255 / (100 / +output.slice(0, -1)))}`
  }

  return +output > 255 ? '255' : output
}

const convertAlphaPercent = (alpha: string | undefined) => {
  if (!alpha) {
    return null
  }

  let output = alpha

  // 1 - Percentage
  if (output.endsWith('%')) {
    output = `${+output.slice(0, -1) / 100}`
  }

  // 2 - Divider
  if (output.indexOf('/') !== -1) {
    const calc = output.split('/')

    output = `${+calc[0] / +calc[1] / 100}`
  }

  return output
}

const convertAlpha = (alpha: string | undefined) => {
  const converted = convertAlphaPercent(alpha)

  if (converted) {
    return Math.round(+converted * 255).toString(16)
  }

  return null
}

// ==== rgb(a) to hex ====

export const convertRgbToHex = (arg: string): HexValues => {
  const defaultValues: RgbValues = {
    r: 'ff',
    g: 'ff',
    b: 'ff'
  }

  if (!isRgbColor(arg)) {
    return defaultValues
  }

  const result = rgbRegex.exec(arg)

  if (!result) {
    return defaultValues
  }

  const { groups } = result || {}
  const { r, g, b, a } = groups as RgbValues

  // ==== Channels ====
  const red = convertChannel(r)
  const green = convertChannel(g)
  const blue = convertChannel(b)

  // ==== Output ====
  let output: RgbValues = { r: stringToHex(red), g: stringToHex(green), b: stringToHex(blue) }

  // ==== Alpha ====
  const alpha = convertAlpha(a)

  if (alpha) {
    output = {
      ...output,
      a: alpha
    }
  }

  return output
}

// ==== rgb(a) to hsl ====

export const convertRgbToHls = (arg: string): HlsValues => {
  const defaultValues = {
    hue: 0,
    saturation: 0,
    lightness: 100
  }

  if (!isRgbColor(arg)) {
    return defaultValues
  }

  const result = rgbRegex.exec(arg)

  if (!result) {
    return defaultValues
  }

  const { groups } = result || {}
  const { r, g, b, a } = groups as RgbValues

  // ==== Channels ====
  // Make r, g, and b fractions of 1
  const red = +convertChannel(r) / 255
  const green = +convertChannel(g) / 255
  const blue = +convertChannel(b) / 255

  // Greatest and smallest channel values
  const cmin = Math.min(red, green, blue)
  const cmax = Math.max(red, green, blue)
  const delta = cmax - cmin

  // hue, saturation, lightness
  let hue = 0
  let saturation = 0
  let lightness = 0

  // Calculate Hue
  if (delta === 0) {
    // No difference hurray!
    hue = 0
  } else if (cmax === red) {
    // Red is max
    hue = ((green - blue) / delta) % 6
  } else if (cmax === green) {
    // Green is max
    hue = (blue - red) / delta + 2
  } else {
    // Blue is max
    hue = (red - green) / delta + 4
  }

  hue = Math.round(hue * 60)

  // Make negative hues positive behind 360°
  if (hue < 0) {
    hue += 360
  }

  // Calculate lightness
  lightness = (cmax + cmin) / 2

  // Calculate saturation
  saturation = delta === 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1))

  // Multiply saturation and lightness by 100
  saturation = +(saturation * 100).toFixed(0)
  lightness = +(lightness * 100).toFixed(0)

  // ==== Alpha ====
  const alpha = convertAlpha(a)

  return { hue, saturation, lightness, alpha }
}

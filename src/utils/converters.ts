import { rgbToString, isNamedColor, getNamedColorInfos, extractHexValues, extractHslValues, processHexString } from './utils'
import { processRgbToHex, processRgbToHls } from './processors'
import { HEX_DEFAULT_VALUES, RGB_DEFAULT_VALUES, HSL_DEFAULT_VALUES } from './constants'

import type { HexValues, RgbValues, HlsValues } from '../type'

// ==== RGB(A) ====

/**
 * Convert RGB(A) string to HEX(A) Object
 *
 * @param {string} arg - a string of the form rgb(r, g, b) or rgba(r,g, b, a)
 * @return {HexValues} an object of the form { red, green, blue } or { red, green, blue, alpha }
 */
export const convertRgbToHex = (arg: string): HexValues => {
  const { red, green, blue, alpha } = processRgbToHex(arg)

  let output: RgbValues = { red, green, blue }

  if (alpha) {
    output = { ...output, alpha: alpha.toString() }
  }

  return output
}

/**
 * Convert RGB(A) string to HSL(A) Object
 *
 * @param {string} arg - a string of the form rgb(r, g, b) or rgba(r,g, b, a)
 * @return {HlsValues} an object of the form { h, s, l } or { h, s, l, a }
 */
export const convertRgbToHls = (arg: string): HlsValues => {
  const { red, green, blue, alpha } = processRgbToHls(arg)

  const cmin = Math.min(+red, +green, +blue)
  const cmax = Math.max(+red, +green, +blue)
  const delta = cmax - cmin

  let hue = 0

  switch (true) {
    case delta === 0:
      // No difference hurray!
      hue = 0
      break
    case cmax === +red:
      // Red is max
      hue = ((+green - +blue) / delta) % 6
      break
    case cmax === +green:
      // Green is max
      hue = (+blue - +red) / delta + 2
      break
    default:
      // Blue is max
      hue = (+red - +green) / delta + 4
      break
  }

  hue = Math.round(hue * 60)

  let lightness = (cmax + cmin) / 2
  let saturation = delta === 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1))

  lightness = +(lightness * 100).toFixed(0)
  saturation = +(saturation * 100).toFixed(0)

  let output: HlsValues = { hue: hue.toString(), saturation: saturation.toString(), lightness: lightness.toString() }

  if (alpha) {
    output = { ...output, alpha: alpha.toString() }
  }

  return output
}

// ==== HEX(A) ====

/**
 * Convert HEX(A) string to RGB(A) Object
 *
 * @param {string} arg - a string of the form #rrggbb or #rrggbbaa
 * @param {boolean} percent - if true, the result will be a string of the form rgb(r%, g%, b%) or rgba(r%, g%, b%, a%)
 * @return {RgbValues} an object of the form { r, g, b } or { r, g, b, a }
 */
export const convertHexToRgb = (arg: string, percent: boolean = false): RgbValues => {
  const hex = processHexString(arg)

  let { red, green, blue, alpha } = extractHexValues(hex)

  red = parseInt(red, 16).toString()
  green = parseInt(green, 16).toString()
  blue = parseInt(blue, 16).toString()

  if (percent) {
    red = `${((+red / 255) * 100).toFixed(1)}%`
    green = `${((+green / 255) * 100).toFixed(1)}%`
    blue = `${((+blue / 255) * 100).toFixed(1)}%`
  }

  let output: HexValues = { red, green, blue }

  if (alpha) {
    alpha = (parseInt(alpha, 16) / 255).toFixed(1)

    if (percent) {
      alpha = `${(+alpha * 100).toFixed(0)}%`
    }

    output = { ...output, alpha: alpha.toString() }
  }

  return output
}

/**
 * Convert HEX(A) string to HSL(A) Object
 *
 * @param {string} arg - a string of the form #rrggbb or #rrggbbaa
 * @return {HlsValues} an object of the form { h, s, l } or { h, s, l, a }
 */
export const convertHexToHls = (arg: string): HlsValues => {
  // Convert hex to RGB first
  const { red, green, blue, alpha }: HexValues = convertHexToRgb(arg)

  // Then to hsl
  return convertRgbToHls(rgbToString({ red, green, blue, alpha }))
}

// ==== HSL ====

export const processHueDeg = (part: number, quote: number, hueDeg: number) => {
  let degree = hueDeg

  if (hueDeg < 0) {
    degree += 1
  }

  if (hueDeg > 1) {
    degree -= 1
  }

  switch (true) {
    case degree < 1 / 6:
      return part + (quote - part) * 6 * degree

    case degree < 1 / 2:
      return quote

    case degree < 2 / 3:
      return part + (quote - part) * (2 / 3 - degree) * 6

    default:
      return part
  }
}

export const hueDegToRgb = ({ hue, saturation, lightness }: HlsValues) => {
  const h = +hue.slice(0, -3)
  const s = +saturation / 100
  const l = +lightness / 100

  let quote = 0

  if (l < 0.5) {
    quote = l * (1 + s)
  } else {
    quote = l + s - l * s
  }

  const part = 2 * l - quote

  const hueDeg = h > 360 ? 1 : h / 360

  return {
    red: Math.round(processHueDeg(part, quote, hueDeg + 1 / 3) * 255),
    green: Math.round(processHueDeg(part, quote, hueDeg) * 255),
    blue: Math.round(processHueDeg(part, quote, hueDeg - 1 / 3) * 255)
  }
}

export const convertHslDegToRgb = ({ hue, saturation, lightness }: HlsValues) => {
  let { red, green, blue } = hueDegToRgb({ hue, saturation, lightness })

  if (+saturation === 0) {
    red = Math.round(+lightness * 255)
    green = Math.round(+lightness * 255)
    blue = Math.round(+lightness * 255)
  }

  return { red: red.toString(), green: green.toString(), blue: blue.toString() }
}

export const convertHslPureToRgb = ({ hue, saturation, lightness, alpha }: HlsValues, percent = false): RgbValues => {
  if (+hue >= 360) {
    hue = (+hue % 360).toString()
  }

  saturation = (+saturation / 100).toString()
  lightness = (+lightness / 100).toString()

  let red = 0
  let green = 0
  let blue = 0

  const chroma = (1 - Math.abs(2 * +lightness - 1)) * +saturation
  const moduled = chroma * (1 - Math.abs(((+hue / 60) % 2) - 1))

  switch (true) {
    case +hue >= 300 && +hue < 360:
      red = chroma
      blue = moduled
      break
    case +hue >= 240:
      red = moduled
      blue = chroma
      break
    case +hue >= 180:
      green = moduled
      blue = chroma
      break
    case +hue >= 120:
      green = chroma
      blue = moduled
      break
    case +hue >= 60:
      red = moduled
      green = chroma
      break
    case +hue >= 0 && +hue < 60:
      red = chroma
      green = moduled
      break
  }

  const light = +lightness - chroma / 2

  red = Math.round((red + light) * 255)
  green = Math.round((green + light) * 255)
  blue = Math.round((blue + light) * 255)

  let output: RgbValues = { red: red.toString(), green: green.toString(), blue: blue.toString() }

  if (percent) {
    output = {
      red: `${((+red / 255) * 100).toFixed(1)}%`,
      green: `${((+green / 255) * 100).toFixed(1)}%`,
      blue: `${((+blue / 255) * 100).toFixed(1)}%`
    }
  }

  if (alpha) {
    alpha = alpha.toString()

    if (percent) {
      alpha = `${(+alpha * 100).toFixed(0)}%`
    }

    output = { ...output, alpha }
  }

  return output
}

/**
 * Convert HSL(A) string to RGB(A) Object
 *
 * @param {string} arg - a string of the form hsl(h, s%, l%) or hsla(h, s%, l%, a%)
 * @return {RgbValues} an object of the form { r, g, b } or { r, g, b, a }
 */
export const convertHslToRgb = (arg: string, percent = false): RgbValues => {
  const { hue, saturation, lightness, alpha } = extractHslValues(arg)

  if (hue.indexOf('deg') > -1) {
    return convertHslDegToRgb({ hue, saturation, lightness })
  }

  if (hue.indexOf('rad') > -1) {
    const radToDeg = (+hue.slice(0, -3) * (180 / Math.PI)) % 360

    return convertHslDegToRgb({ hue: `${radToDeg}deg`, saturation, lightness })
  }

  if (hue.indexOf('turn') > -1) {
    const turnToDeg = +hue.slice(0, -3) * 360

    return convertHslDegToRgb({ hue: `${turnToDeg}deg`, saturation, lightness })
  }

  return convertHslPureToRgb({ hue, saturation, lightness, alpha }, percent)
}

/**
 * Convert HSL(A) string to HEX(A) Object
 *
 * @param {string} arg - a string of the form hsl(h, s%, l%) or hsla(h, s%, l%, a%)
 * @return {HexValues} an object of the form { r, g, b } or { r, g, b, a }
 */
export const convertHslToHex = (arg: string): HexValues => {
  // Convert hsl to rgb first
  const { red, green, blue, alpha } = convertHslToRgb(arg)

  // Then to hex
  return convertRgbToHex(rgbToString({ red, green, blue, alpha }))
}

// ==== Named Color ====

/**
 * Convert named color string to RGB(A) Object
 *
 * @param {string} arg - any of named color
 * @param {boolean} percent if true, the result will be a string of the form rgb(r%, g%, b%) or rgba(r%, g%, b%, a%)
 * @return {RgbValues} an object of the form { r, g, b } or { r, g, b, a }
 */
export const convertcolorToRgb = (arg: string, percent: boolean = false): RgbValues => {
  if (!isNamedColor(arg)) {
    return RGB_DEFAULT_VALUES
  }

  const color = getNamedColorInfos(arg)

  if (!color) {
    return RGB_DEFAULT_VALUES
  }

  let {
    rgb: { red, green, blue }
  } = color

  if (percent) {
    red = `${((+red / 255) * 100).toFixed(1)}%`
    green = `${((+green / 255) * 100).toFixed(1)}%`
    blue = `${((+blue / 255) * 100).toFixed(1)}%`
  }

  return { red: red.toString(), green: green.toString(), blue: blue.toString() }
}

/**
 * Convert named color string to HEX(A) Object
 *
 * @param {string} arg - any of named color
 * @return {HexValues} an object of the form { r, g, b } or { r, g, b, a }
 */
export const convertcolorToHex = (arg: string): HexValues => {
  if (!isNamedColor(arg)) {
    return HEX_DEFAULT_VALUES
  }

  const color = getNamedColorInfos(arg)

  if (!color) {
    return HEX_DEFAULT_VALUES
  }

  const {
    rgb: { red: r, green: g, blue: b }
  } = color

  const { red, green, blue } = processRgbToHex(rgbToString({ red: r.toString(), green: g.toString(), blue: b.toString() }))

  return { red: red.toString(), green: green.toString(), blue: blue.toString() }
}

/**
 * Convert named color string to HSL(A) Object
 *
 * @param {string} arg - any of named color
 * @return {HlsValues} an object of the form { h, s, l } or { h, s, l, a }
 */
export const convertcolorToHsl = (arg: string): HlsValues => {
  if (!isNamedColor(arg)) {
    return HSL_DEFAULT_VALUES
  }

  const color = getNamedColorInfos(arg)

  if (!color) {
    return HSL_DEFAULT_VALUES
  }

  const {
    hsl: { hue, saturation, lightness }
  } = color

  return { hue: hue.toString(), saturation: saturation.toString(), lightness: lightness.toString() }
}

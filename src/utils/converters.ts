import { rgbRegex, hexRegex, hslRegex, isRgbColor, isHexColor, isHslColor, rgbToString, isNamedColor, getNamedColorInfos } from './utils'
import { processRgbAlpha, processRgbChannel, processHslAlpha, processHslChannel } from './processors'

import type { HexValues, RgbValues, HlsValues } from '../type'

const hexDefaultValues: HexValues = { r: 'ff', g: 'ff', b: 'ff' }
const rgbDefaultValues: RgbValues = { r: '255', g: '255', b: '255' }
const hslDefaultValues: HlsValues = { h: '0', s: '0', l: '100' }

// ==== RGB(A) ====

// TODO add tests converters.spec.ts
export const convertRgbToHex = (arg: string): HexValues => {
  if (!isRgbColor(arg)) {
    return hexDefaultValues
  }

  const result = rgbRegex.exec(arg)

  if (!result) {
    return hexDefaultValues
  }

  const { groups } = result || {}
  const { r, g, b, a } = groups as RgbValues

  const { red, green, blue } = processRgbChannel({ r, g, b })
  const alpha = processRgbAlpha(a)

  let output: RgbValues = { r: red, g: green, b: blue }

  if (alpha) {
    output = { ...output, a: alpha }
  }

  return output
}

// TODO add tests converters.spec.ts
export const convertRgbToHls = (arg: string): HlsValues => {
  if (!isRgbColor(arg)) {
    return hslDefaultValues
  }

  const result = rgbRegex.exec(arg)

  if (!result) {
    return hslDefaultValues
  }

  const { groups } = result || {}
  const { r, g, b, a } = groups as RgbValues

  const { red, green, blue } = processHslChannel({ r, g, b })
  const alpha = processHslAlpha(a)

  const cmin = Math.min(red, green, blue)
  const cmax = Math.max(red, green, blue)
  const delta = cmax - cmin

  let hue = 0
  let saturation = 0
  let lightness = 0

  switch (true) {
    case delta === 0:
      // No difference hurray!
      hue = 0
      break
    case cmax === red:
      // Red is max
      hue = ((green - blue) / delta) % 6
      break
    case cmax === green:
      // Green is max
      hue = (blue - red) / delta + 2
      break
    default:
      // Blue is max
      hue = (red - green) / delta + 4
      break
  }

  hue = Math.round(hue * 60)

  // Make negative hues positive behind 360°
  if (hue < 0) {
    hue += 360
  }

  lightness = (cmax + cmin) / 2
  saturation = delta === 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1))

  lightness = +(lightness * 100).toFixed(0)
  saturation = +(saturation * 100).toFixed(0)

  let output: HlsValues = { h: `${hue}`, s: `${saturation}`, l: `${lightness}` }

  if (alpha) {
    output = { ...output, a: `${alpha}` }
  }

  return output
}

// ==== HEX(A) ====

// TODO add tests converters.spec.ts
export const convertHexToRgb = (arg: string, percent = false) => {
  if (!isHexColor(arg)) {
    return rgbDefaultValues
  }

  const result = hexRegex.exec(arg)

  if (!result) {
    return rgbDefaultValues
  }

  const { groups } = result || {}
  const { r, g, b, a } = groups as HexValues

  let red = `${parseInt(r.length === 1 ? `${r}${r}` : r, 16)}`
  let green = `${parseInt(g.length === 1 ? `${g}${g}` : g, 16)}`
  let blue = `${parseInt(b.length === 1 ? `${b}${b}` : b, 16)}`
  let alpha = a && a.length === 1 ? `${a}${a}` : a

  if (percent) {
    red = `${((+red / 255) * 100).toFixed(1)}%`
    green = `${((+green / 255) * 100).toFixed(1)}%`
    blue = `${((+blue / 255) * 100).toFixed(1)}%`
  }

  let output: RgbValues = { r: red, g: green, b: blue }

  if (alpha) {
    alpha = (parseInt(alpha, 16) / 255).toFixed(1)

    if (percent) {
      alpha = `${(+alpha * 100).toFixed(0)}%`
    }

    output = { ...output, a: alpha.toString() }
  }

  return output
}

// TODO add tests converters.spec.ts
export const convertHexToHls = (arg: string) => {
  // Convert hex to RGB first
  const { r, g, b, a }: HexValues = convertHexToRgb(arg)

  // Then to hsl
  return convertRgbToHls(rgbToString({ r, g, b, a }))
}

// ==== HSL ====

// TODO add tests converters.spec.ts
export const convertHslToRgb = (arg: string) => {
  if (!isHslColor(arg)) {
    return rgbDefaultValues
  }

  const result = hslRegex.exec(arg)

  if (!result) {
    return rgbDefaultValues
  }

  const { groups } = result || {}
  let { h, s, l, a } = groups as HlsValues

  if (h.indexOf('deg') > -1) {
    h = h.slice(0, -3)
  }

  if (h.indexOf('rad') > -1) {
    h = Math.round(+h.slice(0, -3) * (180 / Math.PI)).toString()
  }

  if (h.indexOf('turn') > -1) {
    h = Math.round(+h.slice(0, -4) * 360).toString()
  }

  if (s.endsWith('%')) {
    s = s.slice(0, -1)
  }

  if (l.endsWith('%')) {
    l = l.slice(0, -1)
  }

  const saturation = +s / 100
  const lightness = +l / 100
  let hue = +h

  if (hue >= 360) {
    hue %= 360
  }

  let red = 0
  let green = 0
  let blue = 0

  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation
  const moduled = chroma * (1 - Math.abs(((hue / 60) % 2) - 1))

  switch (true) {
    case hue >= 300 && hue < 360:
      red = chroma
      blue = moduled
      break
    case hue >= 240:
      red = moduled
      blue = chroma
      break
    case hue >= 180:
      green = moduled
      blue = chroma
      break
    case hue >= 120:
      green = chroma
      blue = moduled
      break
    case hue >= 60:
      red = moduled
      green = chroma
      break
    case hue >= 0 && hue < 60:
      red = chroma
      green = moduled
      break
  }

  const light = lightness - chroma / 2

  red = Math.round((red + light) * 255)
  green = Math.round((green + light) * 255)
  blue = Math.round((blue + light) * 255)

  let output: RgbValues = { r: red.toString(), g: green.toString(), b: blue.toString() }

  if (a) {
    a = a.toString()

    output = { ...output, a }
  }

  return output
}

// TODO add tests converters.spec.ts
export const convertHslToHex = (arg: string) => {
  // Convert hsl to rgb first
  const { r, g, b, a } = convertHslToRgb(arg)

  // Then to hex
  return convertRgbToHex(rgbToString({ r, g, b, a }))
}

// ==== Named Color ====

// TODO add tests converters.spec.ts
export const convertcolorToRgb = (arg: string, percent = false): RgbValues => {
  if (!isNamedColor(arg)) {
    return rgbDefaultValues
  }

  const color = getNamedColorInfos(arg)

  if (!color) {
    return hexDefaultValues
  }

  let {
    rgb: { red, green, blue }
  } = color

  if (percent) {
    red = `${((+red / 255) * 100).toFixed(1)}%`
    green = `${((+green / 255) * 100).toFixed(1)}%`
    blue = `${((+blue / 255) * 100).toFixed(1)}%`
  }

  return { r: red.toString(), g: green.toString(), b: blue.toString() }
}

// TODO add tests converters.spec.ts
export const convertcolorToHex = (arg: string): HexValues => {
  if (!isNamedColor(arg)) {
    return hexDefaultValues
  }

  const color = getNamedColorInfos(arg)

  if (!color) {
    return hexDefaultValues
  }

  const {
    rgb: { red: r, green: g, blue: b }
  } = color

  const { red, green, blue } = processRgbChannel({ r: r.toString(), g: g.toString(), b: b.toString() })

  return { r: red, g: green, b: blue }
}

// TODO add tests converters.spec.ts
export const convertcolorToHsl = (arg: string): HlsValues => {
  if (!isNamedColor(arg)) {
    return hslDefaultValues
  }

  const color = getNamedColorInfos(arg)

  if (!color) {
    return hslDefaultValues
  }

  const {
    hsl: { hue: h, saturation: s, lightness: l }
  } = color

  return { h: h.toString(), s: s.toString(), l: l.toString() }
}

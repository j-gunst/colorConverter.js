import type { RgbValues } from '../type'

// TODO add tests processors.spec.ts
export const processPercentDivider = (alpha: string | undefined) => {
  if (!alpha) {
    return null
  }

  let output = alpha

  if (output.endsWith('%')) {
    output = `${+output.slice(0, -1) / 100}`
  }

  if (output.indexOf('/') !== -1) {
    const calc = output.split('/')

    output = `${+calc[0] / +calc[1] / 100}`
  }

  return output
}

// ==== RGB ====

// TODO add tests processors.spec.ts
export const processRgb = (channel: string) => {
  let output = +channel > 255 ? '255' : channel

  if (output.endsWith('%')) {
    output = `${Math.round(255 / (100 / +output.slice(0, -1)))}`
  }

  return `${(+output).toString(16).padStart(2, '0')}`
}

// TODO add tests processors.spec.ts
export const processRgbChannel = ({ r, g, b }: RgbValues) => ({ red: processRgb(r), green: processRgb(g), blue: processRgb(b) })

// TODO add tests processors.spec.ts
export const processRgbAlpha = (alpha: string | undefined) => {
  const processed = processPercentDivider(alpha)

  if (processed) {
    return Math.round(+processed * 255).toString(16)
  }

  return null
}

// ==== HSL ====

// TODO add tests processors.spec.ts
export const processHsl = (channel: string) => {
  let output = +channel > 255 ? '255' : channel

  if (output.endsWith('%')) {
    output = `${Math.round(255 / (100 / +output.slice(0, -1)))}`
  }

  return +output / 255
}

// TODO add tests processors.spec.ts
export const processHslChannel = ({ r, g, b }: RgbValues) => ({ red: processHsl(r), green: processHsl(g), blue: processHsl(b) })

// TODO add tests processors.spec.ts
export const processHslAlpha = (alpha: string | undefined) => {
  const processed = processPercentDivider(alpha)

  if (processed) {
    return `${+processed * 100}`
  }

  return null
}

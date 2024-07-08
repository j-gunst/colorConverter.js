import { colorToRgb, colorToHex, colorToHsl } from '../src/index'
import { RGB_DEFAULT_STRING, HEX_DEFAULT_STRING, HSL_DEFAULT_STRING } from '../src/utils/constants'

describe('colorTo(Rgb|Hex|Hsl) with invalid cases', () => {
  test.each`
    arg
    ${null}
    ${false}
    ${undefined}
    ${'string'}
    ${''}
    ${12345}
    ${-12345}
    ${Infinity}
    ${-Infinity}
    ${NaN}
    ${{}}
    ${[]}
    ${'plop'}
  `(`With "$arg"`, ({ arg }) => {
    expect(colorToRgb(arg)).toBe(RGB_DEFAULT_STRING)
    expect(colorToHex(arg)).toBe(HEX_DEFAULT_STRING)
    expect(colorToHsl(arg)).toBe(HSL_DEFAULT_STRING)
  })
})

describe('colorToRgb', () => {
  test.each`
    arg              | expected                      | percent
    ${'plop'}        | ${'rgb(255, 255, 255)'}       | ${false}
    ${'BlueViolet'}  | ${'rgb(138, 43, 226)'}        | ${false}
    ${'BLUEVIOLET'}  | ${'rgb(138, 43, 226)'}        | ${false}
    ${'AliceBlue'}   | ${'rgb(240, 248, 255)'}       | ${false}
    ${'YellowGreen'} | ${'rgb(60.4%, 80.4%, 19.6%)'} | ${true}
  `(`With "$arg" returns "$expected"`, ({ arg, expected, percent }) => expect(colorToRgb(arg, percent)).toBe(expected))
})

describe('colorToHex', () => {
  test.each`
    arg              | expected
    ${'plop'}        | ${'#ffffff'}
    ${'BlueViolet'}  | ${'#8a2be2'}
    ${'blueviolet'}  | ${'#8a2be2'}
    ${'AliceBlue'}   | ${'#f0f8ff'}
    ${'YellowGreen'} | ${'#9acd32'}
  `(`With "$arg" returns "$expected"`, ({ arg, expected }) => expect(colorToHex(arg)).toBe(expected))
})

describe('colorToHsl', () => {
  test.each`
    arg              | expected
    ${'plop'}        | ${'hsl(0, 0%, 100%)'}
    ${'BlueViolet'}  | ${'hsl(271, 76%, 53%)'}
    ${'blueviolet'}  | ${'hsl(271, 76%, 53%)'}
    ${'AliceBlue'}   | ${'hsl(208, 100%, 97%)'}
    ${'YellowGreen'} | ${'hsl(80, 60%, 50%)'}
  `(`With "$arg" returns "$expected"`, ({ arg, expected }) => expect(colorToHsl(arg)).toBe(expected))
})

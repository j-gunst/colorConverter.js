import { colorToRgb, colorToHex, colorToHsl } from '../src/index'

describe('colorToRgb with invalid cases', () => {
  test.each`
    arg          | expected
    ${null}      | ${'rgb(255, 255, 255)'}
    ${false}     | ${'rgb(255, 255, 255)'}
    ${undefined} | ${'rgb(255, 255, 255)'}
    ${'string'}  | ${'rgb(255, 255, 255)'}
    ${''}        | ${'rgb(255, 255, 255)'}
    ${12345}     | ${'rgb(255, 255, 255)'}
    ${-12345}    | ${'rgb(255, 255, 255)'}
    ${Infinity}  | ${'rgb(255, 255, 255)'}
    ${-Infinity} | ${'rgb(255, 255, 255)'}
    ${NaN}       | ${'rgb(255, 255, 255)'}
    ${{}}        | ${'rgb(255, 255, 255)'}
    ${[]}        | ${'rgb(255, 255, 255)'}
    ${'plop'}    | ${'rgb(255, 255, 255)'}
  `(`With "$arg" returns "$expected"`, ({ arg, expected }) => expect(colorToRgb(arg)).toBe(expected))
})

describe('colorToRgb with valid cases', () => {
  test.each`
    arg              | expected                      | percent
    ${'BlueViolet'}  | ${'rgb(138, 43, 226)'}        | ${false}
    ${'BLUEVIOLET'}  | ${'rgb(138, 43, 226)'}        | ${false}
    ${'AliceBlue'}   | ${'rgb(240, 248, 255)'}       | ${false}
    ${'YellowGreen'} | ${'rgb(60.4%, 80.4%, 19.6%)'} | ${true}
  `(`With "$arg" returns "$expected"`, ({ arg, expected, percent }) => expect(colorToRgb(arg, percent)).toBe(expected))
})

describe('colorToHex with invalid cases', () => {
  test.each`
    arg          | expected
    ${null}      | ${'#ffffff'}
    ${false}     | ${'#ffffff'}
    ${undefined} | ${'#ffffff'}
    ${'string'}  | ${'#ffffff'}
    ${''}        | ${'#ffffff'}
    ${12345}     | ${'#ffffff'}
    ${-12345}    | ${'#ffffff'}
    ${Infinity}  | ${'#ffffff'}
    ${-Infinity} | ${'#ffffff'}
    ${NaN}       | ${'#ffffff'}
    ${{}}        | ${'#ffffff'}
    ${[]}        | ${'#ffffff'}
    ${'plop'}    | ${'#ffffff'}
  `(`With "$arg" returns "$expected"`, ({ arg, expected }) => expect(colorToHex(arg)).toBe(expected))
})

describe('colorToHex with valid cases', () => {
  test.each`
    arg              | expected
    ${'BlueViolet'}  | ${'#8a2be2'}
    ${'blueviolet'}  | ${'#8a2be2'}
    ${'AliceBlue'}   | ${'#f0f8ff'}
    ${'YellowGreen'} | ${'#9acd32'}
  `(`With "$arg" returns "$expected"`, ({ arg, expected }) => expect(colorToHex(arg)).toBe(expected))
})

describe('colorToHsl with invalid cases', () => {
  test.each`
    arg          | expected
    ${null}      | ${'hsl(0, 0%, 100%)'}
    ${false}     | ${'hsl(0, 0%, 100%)'}
    ${undefined} | ${'hsl(0, 0%, 100%)'}
    ${'string'}  | ${'hsl(0, 0%, 100%)'}
    ${''}        | ${'hsl(0, 0%, 100%)'}
    ${12345}     | ${'hsl(0, 0%, 100%)'}
    ${-12345}    | ${'hsl(0, 0%, 100%)'}
    ${Infinity}  | ${'hsl(0, 0%, 100%)'}
    ${-Infinity} | ${'hsl(0, 0%, 100%)'}
    ${NaN}       | ${'hsl(0, 0%, 100%)'}
    ${{}}        | ${'hsl(0, 0%, 100%)'}
    ${[]}        | ${'hsl(0, 0%, 100%)'}
    ${'plop'}    | ${'hsl(0, 0%, 100%)'}
  `(`With "$arg" returns "$expected"`, ({ arg, expected }) => expect(colorToHsl(arg)).toBe(expected))
})

describe('colorToHsl with valid cases', () => {
  test.each`
    arg              | expected
    ${'BlueViolet'}  | ${'hsl(271, 76%, 53%)'}
    ${'blueviolet'}  | ${'hsl(271, 76%, 53%)'}
    ${'AliceBlue'}   | ${'hsl(208, 100%, 97%)'}
    ${'YellowGreen'} | ${'hsl(80, 60%, 50%)'}
  `(`With "$arg" returns "$expected"`, ({ arg, expected }) => expect(colorToHsl(arg)).toBe(expected))
})

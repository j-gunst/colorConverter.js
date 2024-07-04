import { hexToRgb, hexToHsl } from '../src/index'

describe('hexToRgb with invalid cases', () => {
  test.each`
    arg                    | expected
    ${null}                | ${'rgb(255, 255, 255)'}
    ${false}               | ${'rgb(255, 255, 255)'}
    ${undefined}           | ${'rgb(255, 255, 255)'}
    ${'string'}            | ${'rgb(255, 255, 255)'}
    ${''}                  | ${'rgb(255, 255, 255)'}
    ${12345}               | ${'rgb(255, 255, 255)'}
    ${-12345}              | ${'rgb(255, 255, 255)'}
    ${Infinity}            | ${'rgb(255, 255, 255)'}
    ${-Infinity}           | ${'rgb(255, 255, 255)'}
    ${NaN}                 | ${'rgb(255, 255, 255)'}
    ${{}}                  | ${'rgb(255, 255, 255)'}
    ${[]}                  | ${'rgb(255, 255, 255)'}
    ${'0a141e'}            | ${'rgb(255, 255, 255)'}
    ${'#2f79c48021321654'} | ${'rgb(255, 255, 255)'}
  `(`With $arg returns $expected`, ({ arg, expected }) => expect(hexToRgb(arg)).toBe(expected))
})

describe('hexToRgb with valid cases', () => {
  test.each`
    arg            | expected                            | percent
    ${'#32281e'}   | ${'rgb(50, 40, 30)'}                | ${false}
    ${'#32281e'}   | ${'rgb(19.6%, 15.7%, 11.8%)'}       | ${true}
    ${'#80664d'}   | ${'rgb(128, 102, 77)'}              | ${false}
    ${'#80664d'}   | ${'rgb(50.2%, 40.0%, 30.2%)'}       | ${true}
    ${'#80331a80'} | ${'rgba(128, 51, 26, 0.5)'}         | ${false}
    ${'#80331a80'} | ${'rgba(50.2%, 20.0%, 10.2%, 50%)'} | ${true}
  `(`With $arg returns $expected`, ({ arg, expected, percent }) => expect(hexToRgb(arg, percent)).toBe(expected))
})

describe('hexToHsl with invalid cases', () => {
  test.each`
    arg                    | expected
    ${null}                | ${'hsl(0, 0%, 100%)'}
    ${false}               | ${'hsl(0, 0%, 100%)'}
    ${undefined}           | ${'hsl(0, 0%, 100%)'}
    ${'string'}            | ${'hsl(0, 0%, 100%)'}
    ${''}                  | ${'hsl(0, 0%, 100%)'}
    ${12345}               | ${'hsl(0, 0%, 100%)'}
    ${-12345}              | ${'hsl(0, 0%, 100%)'}
    ${Infinity}            | ${'hsl(0, 0%, 100%)'}
    ${-Infinity}           | ${'hsl(0, 0%, 100%)'}
    ${NaN}                 | ${'hsl(0, 0%, 100%)'}
    ${{}}                  | ${'hsl(0, 0%, 100%)'}
    ${[]}                  | ${'hsl(0, 0%, 100%)'}
    ${'0a141e'}            | ${'hsl(0, 0%, 100%)'}
    ${'#2f79c48021321654'} | ${'hsl(0, 0%, 100%)'}
  `(`With $arg returns $expected`, ({ arg, expected }) => expect(hexToHsl(arg)).toBe(expected))
})

describe('hexToHsl with valid cases', () => {
  test.each`
    arg            | expected
    ${'#32281e'}   | ${'hsl(30, 25%, 16%)'}
    ${'#80664d'}   | ${'hsl(29, 25%, 40%)'}
    ${'#80331a80'} | ${'hsla(15, 66%, 30%, 50%)'}
  `(`With $arg returns $expected`, ({ arg, expected }) => expect(hexToHsl(arg)).toBe(expected))
})

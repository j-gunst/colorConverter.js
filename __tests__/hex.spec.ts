import { hexToRgb, hexToHsl } from '../src/index'
import { RGB_DEFAULT_STRING, HSL_DEFAULT_STRING } from '../src/utils/constants'

describe('hexTo(Rgb|Hsl) with invalid cases', () => {
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
    ${'0a141e'}
    ${'#2f79c48021321654'}
  `(`With $arg`, ({ arg }) => {
    expect(hexToRgb(arg)).toBe(RGB_DEFAULT_STRING)
    expect(hexToHsl(arg)).toBe(HSL_DEFAULT_STRING)
  })
})

describe('hexToRgb', () => {
  test.each`
    arg            | expected                            | percent
    ${'#86d'}      | ${'rgb(53.3%, 40.0%, 86.7%)'}       | ${true}
    ${'#86da'}     | ${'rgba(53.3%, 40.0%, 86.7%, 70%)'} | ${true}
    ${'#8866dd'}   | ${'rgb(53.3%, 40.0%, 86.7%)'}       | ${true}
    ${'#8866ddaa'} | ${'rgba(53.3%, 40.0%, 86.7%, 70%)'} | ${true}
    ${'#32281e'}   | ${'rgb(50, 40, 30)'}                | ${false}
    ${'#32281e'}   | ${'rgb(19.6%, 15.7%, 11.8%)'}       | ${true}
    ${'#80664d'}   | ${'rgb(128, 102, 77)'}              | ${false}
    ${'#80664d'}   | ${'rgb(50.2%, 40.0%, 30.2%)'}       | ${true}
    ${'#80331a80'} | ${'rgba(128, 51, 26, 0.5)'}         | ${false}
    ${'#80331a80'} | ${'rgba(50.2%, 20.0%, 10.2%, 50%)'} | ${true}
  `(`With $arg returns $expected`, ({ arg, expected, percent }) => expect(hexToRgb(arg, percent)).toBe(expected))
})

describe('hexToHsl', () => {
  test.each`
    arg            | expected
    ${'#32281e'}   | ${'hsl(30, 25%, 16%)'}
    ${'#80664d'}   | ${'hsl(29, 25%, 40%)'}
    ${'#80331a80'} | ${'hsla(15, 66%, 30%, 50%)'}
  `(`With $arg returns $expected`, ({ arg, expected }) => expect(hexToHsl(arg)).toBe(expected))
})

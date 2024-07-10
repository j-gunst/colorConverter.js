import { hslToRgb, hslToHex } from '../src/index'
import { RGB_DEFAULT_STRING, HEX_DEFAULT_STRING } from '../src/utils/constants'

describe('hslTo(Rgb|Hex) with invalid cases', () => {
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
    ${'hsl(120,-1,25%)'}
    ${'hsl()'}
  `(`With "$arg"`, ({ arg }) => {
    expect(hslToRgb(arg)).toBe(RGB_DEFAULT_STRING)
    expect(hslToHex(arg)).toBe(HEX_DEFAULT_STRING)
  })
})

describe('hslToRgb', () => {
  test.each`
    arg                         | expected                       | percent
    ${'hsl(0,10%,33%)'}         | ${'rgb(93,76,76)'}             | ${false}
    ${"hsl('0',10%,33%)"}       | ${'rgb(93,76,76)'}             | ${false}
    ${'hsl(0,100%,50%)'}        | ${'rgb(255,0,0)'}              | ${false}
    ${'hsl(240,100%,50%)'}      | ${'rgb(0,0,255)'}              | ${false}
    ${'hsl(0,100%,50%)'}        | ${'rgb(255,0,0)'}              | ${false}
    ${'hsl(120,100%,50%)'}      | ${'rgb(0,255,0)'}              | ${false}
    ${'hsla(120,100%,25%,0.3)'} | ${'rgba(0,128,0,0.3)'}         | ${false}
    ${'hsl(120,25%)'}           | ${'rgb(12,13,12)'}             | ${false}
    ${'hsla(120,100%,25%,0.3)'} | ${'rgba(0,128,0,0.3)'}         | ${false}
    ${'hsla(120,100%,25%,0.3)'} | ${'rgba(0.0%,50.2%,0.0%,30%)'} | ${true}
  `(`With "$arg" returns "$expected"`, ({ arg, expected, percent }) => expect(hslToRgb(arg, percent)).toBe(expected))
})

describe('hslToHex', () => {
  test.each`
    arg                         | expected
    ${'hsl(0,10%,33%)'}         | ${'#5d4c4c'}
    ${"hsl('0',10%,33%)"}       | ${'#5d4c4c'}
    ${'hsl(0,100%,50%)'}        | ${'#ff0000'}
    ${'hsl(240,100%,50%)'}      | ${'#0000ff'}
    ${'hsl(0,100%,50%)'}        | ${'#ff0000'}
    ${'hsl(120,100%,50%)'}      | ${'#00ff00'}
    ${'hsla(120,100%,25%,0.3)'} | ${'#0080004d'}
    ${'hsl(120,25%)'}           | ${'#0c0d0c'}
    ${'hsla(120,100%,25%,0.3)'} | ${'#0080004d'}
  `(`With "$arg" returns "$expected"`, ({ arg, expected }) => expect(hslToHex(arg)).toBe(expected))
})

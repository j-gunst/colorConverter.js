import { hslToRgb, hslToHex } from '../src/index'

describe('hslToRgb with invalid cases', () => {
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
    ${'hsl(120, -1, 25%)'} | ${'rgb(255, 255, 255)'}
    ${'hsl()'}             | ${'rgb(255, 255, 255)'}
  `(`With "$arg" returns "$expected"`, ({ arg, expected }) => expect(hslToRgb(arg)).toBe(expected))
})

describe('hslToRgb with valid cases', () => {
  test.each`
    arg                            | expected
    ${'hsl(0, 10%, 33%)'}          | ${'rgb(93, 76, 76)'}
    ${"hsl('0', 10%, 33%)"}        | ${'rgb(93, 76, 76)'}
    ${'hsl(0, 100%, 50%)'}         | ${'rgb(255, 0, 0)'}
    ${'hsl(240, 100%, 50%)'}       | ${'rgb(0, 0, 255)'}
    ${'hsl(0, 100%, 50%)'}         | ${'rgb(255, 0, 0)'}
    ${'hsl(120, 100%, 50%)'}       | ${'rgb(0, 255, 0)'}
    ${'hsla(120, 100%, 25%, 0.3)'} | ${'rgba(0, 128, 0, 0.3)'}
    ${'hsl(120, 25%)'}             | ${'rgb(12, 13, 12)'}
    ${'hsla(120, 100%, 25%, 0.3)'} | ${'rgba(0, 128, 0, 0.3)'}
  `(`With "$arg" returns "$expected"`, ({ arg, expected }) => expect(hslToRgb(arg)).toBe(expected))
})

describe('hslToHex with invalid cases', () => {
  test.each`
    arg                    | expected
    ${null}                | ${'#ffffff'}
    ${false}               | ${'#ffffff'}
    ${undefined}           | ${'#ffffff'}
    ${'string'}            | ${'#ffffff'}
    ${''}                  | ${'#ffffff'}
    ${12345}               | ${'#ffffff'}
    ${-12345}              | ${'#ffffff'}
    ${Infinity}            | ${'#ffffff'}
    ${-Infinity}           | ${'#ffffff'}
    ${NaN}                 | ${'#ffffff'}
    ${{}}                  | ${'#ffffff'}
    ${[]}                  | ${'#ffffff'}
    ${'hsl(120, -1, 25%)'} | ${'#ffffff'}
    ${'hsl()'}             | ${'#ffffff'}
  `(`With "$arg" returns "$expected"`, ({ arg, expected }) => expect(hslToHex(arg)).toBe(expected))
})

describe('hslToHex with valid cases', () => {
  test.each`
    arg                            | expected
    ${'hsl(0, 10%, 33%)'}          | ${'#5d4c4c'}
    ${"hsl('0', 10%, 33%)"}        | ${'#5d4c4c'}
    ${'hsl(0, 100%, 50%)'}         | ${'#ff0000'}
    ${'hsl(240, 100%, 50%)'}       | ${'#0000ff'}
    ${'hsl(0, 100%, 50%)'}         | ${'#ff0000'}
    ${'hsl(120, 100%, 50%)'}       | ${'#00ff00'}
    ${'hsla(120, 100%, 25%, 0.3)'} | ${'#0080004d'}
    ${'hsl(120, 25%)'}             | ${'#0c0d0c'}
    ${'hsla(120, 100%, 25%, 0.3)'} | ${'#0080004d'}
  `(`With "$arg" returns "$expected"`, ({ arg, expected }) => expect(hslToHex(arg)).toBe(expected))
})

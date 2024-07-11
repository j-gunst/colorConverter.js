import {
  convertRgbToHex,
  convertRgbToHls,
  convertHexToRgb,
  convertHexToHls,
  convertHslToHex,
  convertHslToRgb,
  convertcolorToRgb,
  convertcolorToHex,
  convertcolorToHsl
} from '../src/utils/converters'

import { RGB_DEFAULT_VALUES, HEX_DEFAULT_VALUES, HSL_DEFAULT_VALUES } from '../src/utils/constants'

describe('Converters with invalid cases', () => {
  test.each`
    arg
    ${null}
    ${false}
    ${undefined}
    ${12345}
    ${-12345}
    ${Infinity}
    ${-Infinity}
    ${NaN}
    ${{}}
    ${[]}
    ${'string'}
    ${''}
    ${'#2f79c48021321654'}
  `(`With $arg`, ({ arg }) => {
    // ==== RGB(A) ====
    expect(convertRgbToHex(arg)).toEqual(HEX_DEFAULT_VALUES)
    expect(convertRgbToHls(arg)).toEqual(HSL_DEFAULT_VALUES)

    // ==== HEX(A) ====
    expect(convertHexToRgb(arg)).toEqual(RGB_DEFAULT_VALUES)
    expect(convertHexToHls(arg)).toEqual(HSL_DEFAULT_VALUES)

    // ==== HSL(A) ====
    expect(convertHslToHex(arg)).toEqual(HEX_DEFAULT_VALUES)
    expect(convertHslToRgb(arg)).toEqual(RGB_DEFAULT_VALUES)

    // ==== Named Color ====
    expect(convertcolorToRgb(arg)).toEqual(RGB_DEFAULT_VALUES)
    expect(convertcolorToHex(arg)).toEqual(HEX_DEFAULT_VALUES)
    expect(convertcolorToHsl(arg)).toEqual(HSL_DEFAULT_VALUES)
  })
})

// ==== RGB(A) ====

describe('convertRgbToHex', () => {
  test.each`
    arg                                 | expected
    ${'rgb(19.6%, 15.7%, 11.8%)'}       | ${{ red: 'ff', green: 'ff', blue: 'ff' }}
    ${'rgb(128, 102, 77)'}              | ${{ red: '80', green: '66', blue: '4d' }}
    ${'rgb(50.2%, 40.0%, 30.2%)'}       | ${{ red: 'ff', green: 'ff', blue: 'ff' }}
    ${'rgba(50.2%, 20.0%, 10.2%, 50%)'} | ${{ red: 'ff', green: 'ff', blue: 'ff' }}
    ${'rgb(50, 40, 30)'}                | ${{ red: '32', green: '28', blue: '1e' }}
    ${'rgba(128, 51, 26, 0.5)'}         | ${{ red: '80', green: '33', blue: '1a', alpha: '80' }}
    ${{ r: '50', g: '40', b: '30' }}    | ${{ red: '32', green: '28', blue: '1e' }}
    ${'rgb(50, 40, 30)'}                | ${{ red: '32', green: '28', blue: '1e' }}
  `(`With $arg returns $expected`, ({ arg, expected }) => expect(convertRgbToHex(arg)).toEqual(expected))
})

describe('convertRgbToHls', () => {
  test.each`
    arg                                | expected
    ${'rgb(0, 0, 0)'}                  | ${{ hue: '0', saturation: '0', lightness: '0' }}
    ${'rgb(255, 255, 255)'}            | ${{ hue: '0', saturation: '0', lightness: '100' }}
    ${'rgb(255, 0, 0)'}                | ${{ hue: '0', saturation: '100', lightness: '50' }}
    ${'rgb(0, 255, 0)'}                | ${{ hue: '120', saturation: '100', lightness: '50' }}
    ${'rgb(0, 0, 255)'}                | ${{ hue: '240', saturation: '100', lightness: '50' }}
    ${'rgb(95, 158, 160)'}             | ${{ hue: '182', saturation: '25', lightness: '50' }}
    ${'rgb(95, 250, 160)'}             | ${{ hue: '145', saturation: '94', lightness: '68' }}
    ${'rgb(50%, 40%, 30%)'}            | ${{ hue: '29', saturation: '25', lightness: '40' }}
    ${'rgb(95, 158, 160, 0.5)'}        | ${{ hue: '182', saturation: '25', lightness: '50', alpha: '50' }}
    ${'rgba(50%, 40%, 30%, 10%)'}      | ${{ hue: '29', saturation: '25', lightness: '40', alpha: '10' }}
    ${{ r: '95', g: '158', b: '160' }} | ${{ hue: '182', saturation: '25', lightness: '50' }}
  `(`With $arg returns $expected`, ({ arg, expected }) => expect(convertRgbToHls(arg)).toEqual(expected))
})

// ==== HEX(A) ====

describe('convertHexToRgb', () => {
  test.each`
    arg                                       | expected
    ${'0a141e'}                               | ${{ red: '10', green: '20', blue: '30' }}
    ${'#32281e'}                              | ${{ red: '50', green: '40', blue: '30' }}
    ${'#80664d'}                              | ${{ red: '128', green: '102', blue: '77' }}
    ${'#32281eaa'}                            | ${{ red: '50', green: '40', blue: '30', alpha: '0.7' }}
    ${'#80331a80'}                            | ${{ red: '128', green: '51', blue: '26', alpha: '0.5' }}
    ${{ r: '0a', g: '14', b: '1e' }}          | ${{ red: '10', green: '20', blue: '30' }}
    ${{ r: 'f', g: 'f', b: '0' }}             | ${{ red: '255', green: '255', blue: '0' }}
    ${{ r: 'ff', g: 'ff', b: '00' }}          | ${{ red: '255', green: '255', blue: '0' }}
    ${{ r: 'f', g: 'f', b: '0', a: 'a' }}     | ${{ red: '255', green: '255', blue: '0', alpha: '0.7' }}
    ${{ r: 'ff', g: 'ff', b: '00', a: 'aa' }} | ${{ red: '255', green: '255', blue: '0', alpha: '0.7' }}
    ${{ foo: '0a', bar: '14', plop: '1e' }}   | ${{ red: '255', green: '255', blue: '255' }}
  `(`With $arg returns $expected`, ({ arg, expected }) => expect(convertHexToRgb(arg)).toEqual(expected))
})

describe('convertHexToHls', () => {
  test.each`
    arg                              | expected
    ${{ r: '0a', g: '14', b: '1e' }} | ${{ hue: '210', saturation: '50', lightness: '8' }}
    ${'#32281e'}                     | ${{ hue: '30', saturation: '25', lightness: '16' }}
    ${'#80664d'}                     | ${{ hue: '29', saturation: '25', lightness: '40' }}
    ${'#32281eaa'}                   | ${{ hue: '30', saturation: '25', lightness: '16', alpha: '70' }}
    ${'#80331a80'}                   | ${{ hue: '15', saturation: '66', lightness: '30', alpha: '50' }}
  `(`With $arg returns $expected`, ({ arg, expected }) => expect(convertHexToHls(arg)).toEqual(expected))
})

// ==== HSL(A) ====

describe('convertHslToHex', () => {
  test.each`
    arg                               | expected
    ${'hsl(0, 10%, 33%)'}             | ${{ red: '5d', blue: '4c', green: '4c' }}
    ${'hsl(120, 25%)'}                | ${{ red: '0c', blue: '0c', green: '0d' }}
    ${'hsla(120, 100%, 25%, 0.3)'}    | ${{ red: '00', blue: '00', green: '80', alpha: '4d' }}
    ${'hsla(120, 100%, 25%, 0.8)'}    | ${{ red: '00', blue: '00', green: '80', alpha: 'cc' }}
    ${{ h: '0', s: '10%', l: '33%' }} | ${{ red: '5d', blue: '4c', green: '4c' }}
  `(`With $arg returns $expected`, ({ arg, expected }) => expect(convertHslToHex(arg)).toEqual(expected))
})

describe('convertHslToRgb', () => {
  test.each`
    arg                            | expected
    ${'hsl(30deg, 10%, 33%)'}      | ${{ red: '93', green: '84', blue: '76' }}
    ${'hsl(0.5deg, 10%, 33%)'}     | ${{ red: '93', green: '76', blue: '76' }}
    ${'hsl(30rad, 10%, 33%)'}      | ${{ red: '87', green: '76', blue: '93' }}
    ${'hsl(30turn, 10%, 33%)'}     | ${{ red: '76', green: '76', blue: '76' }}
    ${'hsl(0, 10%, 33%)'}          | ${{ red: '93', green: '76', blue: '76' }}
    ${'hsl(120, 25%)'}             | ${{ red: '12', green: '13', blue: '12' }}
    ${'hsla(120, 100%, 25%, 0.3)'} | ${{ red: '0', green: '128', blue: '0', alpha: '0.3' }}
    ${'hsla(120, 100%, 25%, 0.8)'} | ${{ red: '0', green: '128', blue: '0', alpha: '0.8' }}
  `(`With $arg returns $expected`, ({ arg, expected }) => expect(convertHslToRgb(arg)).toEqual(expected))
})

// ==== Named Color ====

describe('convertcolorToRgb', () => {
  test.each`
    arg            | expected
    ${'plop'}      | ${{ red: '255', green: '255', blue: '255' }}
    ${'AliceBlue'} | ${{ red: '240', green: '248', blue: '255' }}
    ${'BurlyWood'} | ${{ red: '222', green: '184', blue: '135' }}
    ${'burlywood'} | ${{ red: '222', green: '184', blue: '135' }}
  `(`With $arg returns $expected`, ({ arg, expected }) => expect(convertcolorToRgb(arg)).toEqual(expected))
})

describe('convertcolorToHex', () => {
  test.each`
    arg            | expected
    ${'plop'}      | ${{ red: 'ff', green: 'ff', blue: 'ff' }}
    ${'AliceBlue'} | ${{ red: 'f0', green: 'f8', blue: 'ff' }}
    ${'BurlyWood'} | ${{ red: 'de', green: 'b8', blue: '87' }}
    ${'burlywood'} | ${{ red: 'de', green: 'b8', blue: '87' }}
  `(`With $arg returns $expected`, ({ arg, expected }) => expect(convertcolorToHex(arg)).toEqual(expected))
})

describe('convertcolorToHsl', () => {
  test.each`
    arg            | expected
    ${'plop'}      | ${{ hue: '0', saturation: '0', lightness: '100' }}
    ${'AliceBlue'} | ${{ hue: '208', saturation: '100', lightness: '97' }}
    ${'BurlyWood'} | ${{ hue: '34', saturation: '57', lightness: '70' }}
    ${'burlywood'} | ${{ hue: '34', saturation: '57', lightness: '70' }}
  `(`With $arg returns $expected`, ({ arg, expected }) => expect(convertcolorToHsl(arg)).toEqual(expected))
})

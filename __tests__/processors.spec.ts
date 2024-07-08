import { processRgb, processRgbAlpha, processRgbToHex, processHsl, processHslAlpha, processRgbToHls } from '../src/utils/processors'

// ==== RGB(A) to HEX(A) ====

describe('processRgb', () => {
  test.each`
    arg      | expected
    ${'250'} | ${'fa'}
    ${'128'} | ${'80'}
    ${128}   | ${'80'}
  `(`With $arg returns $expected`, ({ arg, expected }) => expect(processRgb(arg)).toEqual(expected))
})

describe('processRgbAlpha', () => {
  test.each`
    arg       | expected
    ${0.5}    | ${'80'}
    ${'50%'}  | ${'80'}
    ${'20/2'} | ${'1a'}
  `(`With $arg returns $expected`, ({ arg, expected }) => expect(processRgbAlpha(arg)).toEqual(expected))
})

describe('processRgbToHex', () => {
  test.each`
    arg                          | expected
    ${'rgb(95, 158, 160)'}       | ${{ red: '5f', green: '9e', blue: 'a0' }}
    ${'rgb(250, 128, 10)'}       | ${{ red: 'fa', green: '80', blue: '0a' }}
    ${'rgba(250, 128, 10, 10%)'} | ${{ red: 'fa', green: '80', blue: '0a', alpha: '1a' }}
  `(`With $arg returns $expected`, ({ arg, expected }) => expect(processRgbToHex(arg)).toEqual(expected))
})

// ==== RGB(A) to HSL(A) ====

describe('processHsl', () => {
  test.each`
    arg      | expected
    ${'250'} | ${'0.9803921568627451'}
    ${250}   | ${'0.9803921568627451'}
  `(`With $arg returns $expected`, ({ arg, expected }) => expect(processHsl(arg)).toEqual(expected))
})

describe('processHslAlpha', () => {
  test.each`
    arg      | expected
    ${0.5}   | ${'50'}
    ${'0.3'} | ${'30'}
  `(`With $arg returns $expected`, ({ arg, expected }) => expect(processHslAlpha(arg)).toEqual(expected))
})

describe('processRgbToHls', () => {
  test.each`
    arg                     | expected
    ${'rgb(250, 250, 250)'} | ${{ red: '0.9803921568627451', blue: '0.9803921568627451', green: '0.9803921568627451' }}
    ${'rgb(95, 158, 160)'}  | ${{ red: '0.37254901960784315', blue: '0.6274509803921569', green: '0.6196078431372549' }}
  `(`With $arg returns $expected`, ({ arg, expected }) => expect(processRgbToHls(arg)).toEqual(expected))
})

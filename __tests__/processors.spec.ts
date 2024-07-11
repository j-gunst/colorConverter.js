import { processRgb, processRgbAlpha, processRgbToHex, processRgbToHls } from '../src/utils/processors'

describe('processRgb', () => {
  test.each`
    arg      | expected                | type
    ${'250'} | ${'fa'}                 | ${'hex'}
    ${'128'} | ${'80'}                 | ${'hex'}
    ${128}   | ${'80'}                 | ${'hex'}
    ${'250'} | ${'0.9803921568627451'} | ${'hsl'}
    ${250}   | ${'0.9803921568627451'} | ${'hsl'}
    ${600}   | ${'1'}                  | ${'hsl'}
  `(`With $arg returns $expected`, ({ arg, type, expected }) => expect(processRgb(arg, type)).toEqual(expected))
})

describe('processRgbAlpha', () => {
  test.each`
    arg       | expected | type
    ${0.5}    | ${'80'}  | ${'hex'}
    ${'50%'}  | ${'80'}  | ${'hex'}
    ${'20/2'} | ${'1a'}  | ${'hex'}
    ${0.5}    | ${'50'}  | ${'hsl'}
    ${'0.3'}  | ${'30'}  | ${'hsl'}
  `(`With $arg returns $expected`, ({ arg, type, expected }) => expect(processRgbAlpha(arg, type)).toEqual(expected))
})

// ==== RGB(A) to HEX(A) ====

describe('processRgbToHex', () => {
  test.each`
    arg                          | expected
    ${'rgb(95, 158, 160)'}       | ${{ red: '5f', green: '9e', blue: 'a0' }}
    ${'rgb(250, 128, 10)'}       | ${{ red: 'fa', green: '80', blue: '0a' }}
    ${'rgba(250, 128, 10, 10%)'} | ${{ red: 'fa', green: '80', blue: '0a', alpha: '1a' }}
  `(`With $arg returns $expected`, ({ arg, expected }) => expect(processRgbToHex(arg)).toEqual(expected))
})

// ==== RGB(A) to HSL(A) ====

describe('processRgbToHls', () => {
  test.each`
    arg                     | expected
    ${'rgb(250, 250, 250)'} | ${{ red: '0.9803921568627451', blue: '0.9803921568627451', green: '0.9803921568627451' }}
    ${'rgb(95, 158, 160)'}  | ${{ red: '0.37254901960784315', blue: '0.6274509803921569', green: '0.6196078431372549' }}
  `(`With $arg returns $expected`, ({ arg, expected }) => expect(processRgbToHls(arg)).toEqual(expected))
})

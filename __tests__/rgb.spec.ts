import { rgbToHex, rgbToHsl } from '../src/index'
import { HEX_DEFAULT_STRING, HSL_DEFAULT_STRING } from '../src/utils/constants'

describe('rgbTo(hex|hsl) with invalid cases', () => {
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
    ${'rgba(10, 20, 30, 1000%)'}
    ${'rgba(50%, 20%, 10%, 0.5%)'}
  `(`With "$arg"`, ({ arg }) => {
    expect(rgbToHex(arg)).toBe(HEX_DEFAULT_STRING)
    expect(rgbToHsl(arg)).toBe(HSL_DEFAULT_STRING)
  })
})

describe('rgbToHex', () => {
  test.each`
    arg                                    | expected
    ${'rgb(50 40 30)'}                     | ${'#32281e'}
    ${'rgb(50,40,30)'}                     | ${'#32281e'}
    ${'rgb(50, 40, 30)'}                   | ${'#32281e'}
    ${'rgb(50 , 40 , 30)'}                 | ${'#32281e'}
    ${'rgb(50% 40% 30%)'}                  | ${'#80664d'}
    ${'rgb(50%,40%,30%)'}                  | ${'#80664d'}
    ${'rgb(50%, 40%, 30%)'}                | ${'#80664d'}
    ${'rgb(50% , 40% , 30%)'}              | ${'#80664d'}
    ${'rgba(50% 20% 10% 0.5)'}             | ${'#80331a80'}
    ${'rgba(50%,20%,10%,0.5)'}             | ${'#80331a80'}
    ${'rgba(50%, 20%, 10%, 0.5)'}          | ${'#80331a80'}
    ${'rgba(50% , 20% , 10% , 0.5)'}       | ${'#80331a80'}
    ${'rgba(50% 20% 10% 50%)'}             | ${'#80331a80'}
    ${'rgba(50%,20%,10%,50%)'}             | ${'#80331a80'}
    ${'rgba(50%, 20%, 10%, 50%)'}          | ${'#80331a80'}
    ${'rgba(50% , 20% , 10% , 50%)'}       | ${'#80331a80'}
    ${'rgba(50% 20% 10% / 50%)'}           | ${'#80331a80'}
    ${'rgba(50%,20%,10%/50%)'}             | ${'#80331a80'}
    ${'rgba(50%, 20%, 10% / 50%)'}         | ${'#80331a80'}
    ${'rgba(50% , 20% , 10% / 50%)'}       | ${'#80331a80'}
    ${'rgba(50% 20% 10% / 0.5)'}           | ${'#80331a80'}
    ${'rgba(50%, 20%, 10% / 0.5)'}         | ${'#80331a80'}
    ${'rgba(50%, 20%, 10%, 100/2)'}        | ${'#80331a80'}
    ${'rgba(50%, 20%, 10%, 100 / 2)'}      | ${'#80331a80'}
    ${{ r: 50, g: 40, b: 30 }}             | ${'#32281e'}
    ${{ r: '50', g: '40', b: '30' }}       | ${'#32281e'}
    ${{ r: '50%', g: '40', b: '30' }}      | ${'#32281e'}
    ${{ r: '50%', g: '40%', b: '30' }}     | ${'#32281e'}
    ${{ r: '50%', g: '40%', b: '30%' }}    | ${'#32281e'}
    ${{ r: 240, g: 248, b: 255 }}          | ${'#f0f8ff'}
    ${{ r: 250, g: 235, b: 215 }}          | ${'#faebd7'}
    ${{ r: '250', g: '235', b: '215' }}    | ${'#faebd7'}
    ${{ r: '250%', g: '235', b: '215' }}   | ${'#faebd7'}
    ${{ r: '250%', g: '235%', b: '215' }}  | ${'#faebd7'}
    ${{ r: '250%', g: '235%', b: '215%' }} | ${'#faebd7'}
  `(`With "$arg" returns "$expected"`, ({ arg, expected }) => expect(rgbToHex(arg)).toBe(expected))
})

describe('rgbToHsl', () => {
  test.each`
    arg                               | expected
    ${'rgb(50 40 30)'}                | ${'hsl(30,25%,16%)'}
    ${'rgb(50,40,30)'}                | ${'hsl(30,25%,16%)'}
    ${'rgb(50, 40, 30)'}              | ${'hsl(30,25%,16%)'}
    ${'rgb(50 , 40 , 30)'}            | ${'hsl(30,25%,16%)'}
    ${'rgb(50% 40% 30%)'}             | ${'hsl(29,25%,40%)'}
    ${'rgb(50%,40%,30%)'}             | ${'hsl(29,25%,40%)'}
    ${'rgb(50%, 40%, 30%)'}           | ${'hsl(29,25%,40%)'}
    ${'rgb(50% , 40% , 30%)'}         | ${'hsl(29,25%,40%)'}
    ${'rgba(50% 20% 10% 0.5)'}        | ${'hsla(15,66%,30%,50%)'}
    ${'rgba(50%,20%,10%,0.5)'}        | ${'hsla(15,66%,30%,50%)'}
    ${'rgba(50%, 20%, 10%, 0.5)'}     | ${'hsla(15,66%,30%,50%)'}
    ${'rgba(50% , 20% , 10% , 0.5)'}  | ${'hsla(15,66%,30%,50%)'}
    ${'rgba(50% 20% 10% 50%)'}        | ${'hsla(15,66%,30%,50%)'}
    ${'rgba(50%,20%,10%,50%)'}        | ${'hsla(15,66%,30%,50%)'}
    ${'rgba(50%, 20%, 10%, 50%)'}     | ${'hsla(15,66%,30%,50%)'}
    ${'rgba(50% , 20% , 10% , 50%)'}  | ${'hsla(15,66%,30%,50%)'}
    ${'rgba(50% 20% 10% / 50%)'}      | ${'hsla(15,66%,30%,50%)'}
    ${'rgba(50%,20%,10%/50%)'}        | ${'hsla(15,66%,30%,50%)'}
    ${'rgba(50%, 20%, 10% / 50%)'}    | ${'hsla(15,66%,30%,50%)'}
    ${'rgba(50% , 20% , 10% / 50%)'}  | ${'hsla(15,66%,30%,50%)'}
    ${'rgba(50% 20% 10% / 0.5)'}      | ${'hsla(15,66%,30%,50%)'}
    ${'rgba(50%, 20%, 10%, 100/2)'}   | ${'hsla(15,66%,30%,50%)'}
    ${'rgba(50%, 20%, 10%, 100 / 2)'} | ${'hsla(15,66%,30%,50%)'}
    ${{ r: '50', g: 40, b: 30 }}      | ${'hsl(30,25%,16%)'}
  `(`With "$arg" returns $expected`, ({ arg, expected }) => expect(rgbToHsl(arg)).toBe(expected))
})

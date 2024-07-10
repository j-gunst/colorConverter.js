import {
  isString,
  isRgbColor,
  isHexColor,
  isHslColor,
  isNamedColor,
  extractRgbValues,
  extractHexValues,
  extractHslValues,
  hexToString,
  rgbToString,
  hslToString,
  getNamedColorInfos
} from '../src/utils/utils'

describe('isRgbColor', () => {
  test.each`
    arg                | isstring | isrgbcolor
    ${false}           | ${false} | ${false}
    ${undefined}       | ${false} | ${false}
    ${12345}           | ${false} | ${false}
    ${-12345}          | ${false} | ${false}
    ${Infinity}        | ${false} | ${false}
    ${-Infinity}       | ${false} | ${false}
    ${NaN}             | ${false} | ${false}
    ${[]}              | ${false} | ${false}
    ${['x']}           | ${false} | ${false}
    ${{}}              | ${false} | ${false}
    ${{ x: 'x' }}      | ${false} | ${false}
    ${null}            | ${false} | ${false}
    ${'string'}        | ${true}  | ${false}
    ${''}              | ${true}  | ${false}
    ${'rgb(50 40 30)'} | ${true}  | ${true}
  `(`With "$arg"`, ({ arg, isstring, isrgbcolor }) => {
    expect(isString(arg)).toBe(isstring)
    expect(isRgbColor(arg)).toBe(isrgbcolor)
  })
})

describe('isRgbColor', () => {
  test.each`
    arg
    ${'rgb(50 40 30)'}
    ${'rgb(50,40,30)'}
    ${'rgb(50, 40, 30)'}
    ${'rgb(50 , 40 , 30)'}
    ${'rgb(50% 40% 30%)'}
    ${'rgb(50%,40%,30%)'}
    ${'rgb(50%, 40%, 30%)'}
    ${'rgb(50% , 40% , 30%)'}
    ${'rgba(50% 20% 10% 0.5)'}
    ${'rgba(50%,20%,10%,0.5)'}
    ${'rgba(50%, 20%, 10%, 0.5)'}
    ${'rgba(50% , 20% , 10% , 0.5)'}
    ${'rgba(50% 20% 10% 50%)'}
    ${'rgba(50%,20%,10%,50%)'}
    ${'rgba(50%, 20%, 10%, 50%)'}
    ${'rgba(50% , 20% , 10% , 50%)'}
    ${'rgba(50% 20% 10% / 50%)'}
    ${'rgba(50%,20%,10%/50%)'}
    ${'rgba(50%, 20%, 10% / 50%)'}
    ${'rgba(50% , 20% , 10% / 50%)'}
    ${'rgba(50% 20% 10% / 0.5)'}
    ${'rgba(50%, 20%, 10% / 0.5)'}
    ${'rgba(50%, 20%, 10%, 100/2)'}
    ${'rgba(50%, 20%, 10%, 100 / 2)'}
  `(`With "$arg"`, ({ arg }) => {
    expect(isRgbColor(arg)).toBe(true)
  })
})

describe('isHexColor', () => {
  test.each`
    arg
    ${'#32281e'}
    ${'#32281e'}
    ${'#80664d'}
    ${'#80664d'}
    ${'#80331a80'}
    ${'#80331a80'}
  `(`With "$arg"`, ({ arg }) => {
    expect(isHexColor(arg)).toBe(true)
  })
})

describe('isHslColor', () => {
  test.each`
    arg
    ${'hsl(0, 10%, 33%)'}
    ${"hsl('0', 10%, 33%)"}
    ${'hsl(0, 100%, 50%)'}
    ${'hsl(240, 100%, 50%)'}
    ${'hsl(0, 100%, 50%)'}
    ${'hsl(120, 100%, 50%)'}
    ${'hsla(120, 100%, 25%, 0.3)'}
    ${'hsl(120, 25%)'}
    ${'hsla(120, 100%, 25%, 0.3)'}
  `(`With "$arg"`, ({ arg }) => {
    expect(isHslColor(arg)).toBe(true)
  })
})

describe('isNamedColor', () => {
  test.each`
    arg
    ${'BlueViolet'}
    ${'blueviolet'}
    ${'AliceBlue'}
    ${'YellowGreen'}
  `(`With "$arg"`, ({ arg }) => {
    expect(isNamedColor(arg)).toBe(true)
  })
})

describe('extractRgbValues', () => {
  test.each`
    arg                               | expected
    ${'rgb(50 40 30)'}                | ${{ red: '50', green: '40', blue: '30', alpha: undefined }}
    ${'rgb(50,40,30)'}                | ${{ red: '50', green: '40', blue: '30', alpha: undefined }}
    ${'rgb(50, 40, 30)'}              | ${{ red: '50', green: '40', blue: '30', alpha: undefined }}
    ${'rgb(50 , 40 , 30)'}            | ${{ red: '50', green: '40', blue: '30', alpha: undefined }}
    ${'rgb(50% 40% 30%)'}             | ${{ red: '50%', green: '40%', blue: '30%', alpha: undefined }}
    ${'rgb(50%,40%,30%)'}             | ${{ red: '50%', green: '40%', blue: '30%', alpha: undefined }}
    ${'rgb(50%, 40%, 30%)'}           | ${{ red: '50%', green: '40%', blue: '30%', alpha: undefined }}
    ${'rgb(50% , 40% , 30%)'}         | ${{ red: '50%', green: '40%', blue: '30%', alpha: undefined }}
    ${'rgba(50% 20% 10% 0.5)'}        | ${{ red: '50%', green: '20%', blue: '10%', alpha: '0.5' }}
    ${'rgba(50%,20%,10%,0.5)'}        | ${{ red: '50%', green: '20%', blue: '10%', alpha: '0.5' }}
    ${'rgba(50%, 20%, 10%, 0.5)'}     | ${{ red: '50%', green: '20%', blue: '10%', alpha: '0.5' }}
    ${'rgba(50% , 20% , 10% , 0.5)'}  | ${{ red: '50%', green: '20%', blue: '10%', alpha: '0.5' }}
    ${'rgba(50% 20% 10% 50%)'}        | ${{ red: '50%', green: '20%', blue: '10%', alpha: '50%' }}
    ${'rgba(50%,20%,10%,50%)'}        | ${{ red: '50%', green: '20%', blue: '10%', alpha: '50%' }}
    ${'rgba(50%, 20%, 10%, 50%)'}     | ${{ red: '50%', green: '20%', blue: '10%', alpha: '50%' }}
    ${'rgba(50% , 20% , 10% , 50%)'}  | ${{ red: '50%', green: '20%', blue: '10%', alpha: '50%' }}
    ${'rgba(50% 20% 10% / 50%)'}      | ${{ red: '50%', green: '20%', blue: '10%', alpha: '50%' }}
    ${'rgba(50%,20%,10%/50%)'}        | ${{ red: '50%', green: '20%', blue: '10%', alpha: '50%' }}
    ${'rgba(50%, 20%, 10% / 50%)'}    | ${{ red: '50%', green: '20%', blue: '10%', alpha: '50%' }}
    ${'rgba(50% , 20% , 10% / 50%)'}  | ${{ red: '50%', green: '20%', blue: '10%', alpha: '50%' }}
    ${'rgba(50% 20% 10% / 0.5)'}      | ${{ red: '50%', green: '20%', blue: '10%', alpha: '0.5' }}
    ${'rgba(50%, 20%, 10% / 0.5)'}    | ${{ red: '50%', green: '20%', blue: '10%', alpha: '0.5' }}
    ${'rgba(50%, 20%, 10%, 100/2)'}   | ${{ red: '50%', green: '20%', blue: '10%', alpha: '100/2' }}
    ${'rgba(50%, 20%, 10%, 100 / 2)'} | ${{ red: '50%', green: '20%', blue: '10%', alpha: '100 / 2' }}
  `(`With "$arg" returns "$expected"`, ({ arg, expected }) => {
    expect(extractRgbValues(arg)).toEqual(expected)
  })
})

describe('extractHexValues', () => {
  test.each`
    arg            | expected
    ${'#32281e'}   | ${{ red: '32', green: '28', blue: '1e', alpha: undefined }}
    ${'#80664d'}   | ${{ red: '80', green: '66', blue: '4d', alpha: undefined }}
    ${'#80331a80'} | ${{ red: '80', green: '33', blue: '1a', alpha: '80' }}
  `(`With "$arg" returns "$expected"`, ({ arg, expected }) => {
    expect(extractHexValues(arg)).toEqual(expected)
  })
})

describe('extractHslValues', () => {
  test.each`
    arg                            | expected
    ${'hsl(0, 10%, 33%)'}          | ${{ hue: '0', saturation: '10', lightness: '33', alpha: undefined }}
    ${"hsl('0', 10%, 33%)"}        | ${{ hue: '0', saturation: '10', lightness: '33', alpha: undefined }}
    ${'hsl(0, 100%, 50%)'}         | ${{ hue: '0', saturation: '100', lightness: '50', alpha: undefined }}
    ${'hsla(120, 100%, 25%, 0.3)'} | ${{ hue: '120', saturation: '100', lightness: '25', alpha: '0.3' }}
    ${'hsl(120, 25%)'}             | ${{ hue: '120', saturation: '2', lightness: '5', alpha: undefined }}
    ${'hsla(120, 100%, 25%, 0.3)'} | ${{ hue: '120', saturation: '100', lightness: '25', alpha: '0.3' }}
  `(`With "$arg" returns "$expected"`, ({ arg, expected }) => {
    expect(extractHslValues(arg)).toEqual(expected)
  })
})

describe('hexToString', () => {
  test.each`
    arg                                                         | expected
    ${{ red: '32', green: '28', blue: '1e', alpha: undefined }} | ${'#32281e'}
    ${{ red: '80', green: '66', blue: '4d', alpha: undefined }} | ${'#80664d'}
    ${{ red: '80', green: '33', blue: '1a', alpha: '80' }}      | ${'#80331a80'}
  `(`With "$arg" returns "$expected"`, ({ arg, expected }) => {
    expect(hexToString(arg)).toEqual(expected)
  })
})

describe('rgbToString', () => {
  test.each`
    arg                                                            | expected
    ${{ red: '50', green: '40', blue: '30', alpha: undefined }}    | ${'rgb(50,40,30)'}
    ${{ red: '50%', green: '40%', blue: '30%', alpha: undefined }} | ${'rgb(50%,40%,30%)'}
    ${{ red: '50%', green: '20%', blue: '10%', alpha: '0.5' }}     | ${'rgba(50%,20%,10%,0.5)'}
    ${{ red: '50%', green: '20%', blue: '10%', alpha: '50%' }}     | ${'rgba(50%,20%,10%,50%)'}
    ${{ red: '50%', green: '20%', blue: '10%', alpha: '100/2' }}   | ${'rgba(50%,20%,10%,100/2)'}
    ${{ red: '50%', green: '20%', blue: '10%', alpha: '100 / 2' }} | ${'rgba(50%,20%,10%,100 / 2)'}
  `(`With "$arg" returns "$expected"`, ({ arg, expected }) => {
    expect(rgbToString(arg)).toEqual(expected)
  })
})

describe('hslToString', () => {
  test.each`
    arg                                                                   | expected
    ${{ hue: '0', saturation: '10', lightness: '33', alpha: undefined }}  | ${'hsl(0,10%,33%)'}
    ${{ hue: '0', saturation: '100', lightness: '50', alpha: undefined }} | ${'hsl(0,100%,50%)'}
    ${{ hue: '120', saturation: '100', lightness: '25', alpha: '0.3' }}   | ${'hsla(120,100%,25%,0.3%)'}
    ${{ hue: '120', saturation: '2', lightness: '5', alpha: undefined }}  | ${'hsl(120,2%,5%)'}
  `(`With "$arg" returns "$expected"`, ({ arg, expected }) => {
    expect(hslToString(arg)).toEqual(expected)
  })
})

describe('getNamedColorInfos', () => {
  test.each`
    arg             | expected
    ${'BlueViolet'} | ${{ name: 'BlueViolet', hex: '#8a2be2', hsl: { hue: 271, lightness: 53, saturation: 76 }, rgb: { blue: 226, green: 43, red: 138 } }}
    ${'blueviolet'} | ${{ name: 'BlueViolet', hex: '#8a2be2', hsl: { hue: 271, lightness: 53, saturation: 76 }, rgb: { blue: 226, green: 43, red: 138 } }}
    ${'AliceBlue'}  | ${{ name: 'AliceBlue', hex: '#f0f8ff', hsl: { hue: 208, saturation: 100, lightness: 97 }, rgb: { red: 240, green: 248, blue: 255 } }}
  `(`With "$arg" returns "$expected"`, ({ arg, expected }) => {
    expect(getNamedColorInfos(arg)).toEqual(expected)
  })
})

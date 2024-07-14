# color-converter.js

Some utilities to convert any CSS color from RGB, HEX and HSL to RGB, HEX and HSL.

> [!NOTE]
> This package is for didactic purpose but feel free to use it in your project!

![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/nwl-x/colorConverter.js/release.yml)
[![codecov](https://codecov.io/github/nwl-x/colorConverter.js/graph/badge.svg?token=90G08PPK2H)](https://codecov.io/github/nwl-x/colorConverter.js)
![GitHub top language](https://img.shields.io/github/languages/top/nwl-x/colorConverter.js?logo=typescript)
![GitHub License](https://img.shields.io/github/license/nwl-x/colorConverter.js)
![NPM Downloads](https://img.shields.io/npm/dw/%40nawael%2Fcolor-converter.js?logo=npm)
![NPM Version](https://img.shields.io/npm/v/%40nawael%2Fcolor-converter.js)
![npm bundle size](https://img.shields.io/bundlephobia/min/%40nawael%2Fcolor-converter.js)

![Banner](https://raw.githubusercontent.com/nwl-x/colorConverter.js/main/banner.webp)

## Installation

### With [pnpm](https://pnpm.io/fr/)

```bash
pnpm install @nawael/color-converter.js --save
```

### With [npm](https://www.npmjs.com/)

```bash
npm install @nawael/color-converter.js --save
```

### With [yarn](https://yarnpkg.com/)

```bash
yarn add @nawael/color-converter.js --save
```

## Integration

### For [CommonJS](https://nodejs.org/docs/latest/api/modules.html#modules-commonjs-modules)

```js
const { rgbToHex, ...} = require('@nawael/color-converter.js')
```

### For [ESM](https://nodejs.org/api/esm.html#esm_ecmascript_modules)

```js
import { rgbToHex, ... } from '@nawael/color-converter.js'
```

## Usage examples

<details>
<summary>RGB(A) conversion</summary>

```javascript
import { rgbToHex, rgbToHsl } from '@nawael/color-converter.js'

// ==== Convert RGB color to HEX ====

// with string parameter...
rgbToHex('rgb(50, 40, 30)') // returns #32281e
// ...or with object parameter
rgbToHex({ r: 50, g: 40, b: 30 }) // returns #32281e too!

// with alpha channel...
rgbToHex('rgba(50, 40, 30, 0.5)') // returns #32281e80
// ...or
rgbToHex({ r: 50, g: 40, b: 30, a: 0.5 }) // returns #32281e80 too!

// ==== Convert RGB color to HSL ====

// with string parameter...
rgbToHsl('rgb(50, 40, 30)') // returns hsl(30,25%,16%)
// ...or with object parameter
rgbToHsl({ r: 50, g: 40, b: 30 }) // returns hsl(30,25%,16%)

// with alpha channel...
rgbToHsl('rgba(50, 40, 30, 0.5)') // returns hsla(30,25%,16%,50%)
// ...or
rgbToHsl({ r: 50, g: 40, b: 30, a: 0.5 }) // returns hsla(30,25%,16%,50%)
```

</details>

<details>
<summary>HEX(A) conversion</summary>

```javascript
import { hexToRgb, hexToHsl } from '@nawael/color-converter.js'

// ==== Convert HEX color to RGB ====

// Hex color can be in short or long format
// 3 digits: #rgb => #rrggb
// 4 digits: #rgba => #rrggbbaa
// 6 digits: #rrggbb
// 8 digits: #rrggbbaa

hexToHsl
// with string parameter...
hexToRgb('#86d') // returns rgb(136,102,221)
hexToRgb('#86da') // returns rgba(136,102,221,0.7)
hexToRgb('#8866dd') // returns rgb(136,102,221)
hexToRgb('#8866ddaa') // returns rgba(136,102,221,0.7)

// nota bene: hashtag is not required
hexToRgb('8866dd') // works too!

// ...or with object parameter
hexToRgb({ r: '8', g: '6', b: 'd' })
hexToRgb({ r: '8', g: '6', b: 'd', a: 'a' })
hexToRgb({ r: '88', g: '66', b: 'dd' })
hexToRgb({ r: '88', g: '66', b: 'dd', a: 'aa' })

// ==== Convert HEX color to HSL ====

hexToHsl('#8866dd') // returns hsl(257,64%,63%)
hexToHsl('#8866ddaa') // returns hsla(257,64%,63%,0.7)

// and so on...
```

</details>

<details>
<summary>HSL(A) conversion</summary>

```javascript
import { hslToRgb, hslToHex } from '@nawael/color-converter.js'

// ==== Convert HSL color to RGB ====

// with string parameter...
hslToRgb('hsl(0, 10%, 33%)') // returns rgb(93,76,76)

// ...or with object parameter
hslToRgb({ h: 0, s: 10, l: 33 }) // returns rgb(93,76,76)

// ==== Convert HSL color to RGB with percentage ====

// with string parameter...
hslToRgb('hsl(0, 10%, 33%)', true) // returns rgb(36.5%,29.8%,29.8%)

// ...or with object parameter
hslToRgb({ h: 0, s: 10, l: 33 }, true) // returns rgb(36.5%,29.8%,29.8%)

// ==== Convert HSL color to HEX ====

// with string parameter...
hslToHex('hsl(0, 10%, 33%)') // returns #5d4c4c

// ...or with object parameter
hslToHex({ h: 0, s: 10, l: 33 }) // returns #5d4c4c
```

</details>

<details>
<summary>Named color conversion</summary>

```javascript
import { colorToRgb, colorToHex, colorToHsl } from '@nawael/color-converter.js'

// Convert Named color to RGB
colorToRgb('CornflowerBlue') // returns rgb(100,149,237)

// Convert Named color to HEX
colorToHex('CornflowerBlue') // returns #6495ed

// Convert Named color to HSL
colorToHsl('CornflowerBlue') // returns hsl(219,79%,66%)
```

</details>

## Available APIs

| RGB color | HEX color | HSL color | Named color |
| --------- | --------- | --------- | ----------- |
| rgbToHex  | hexToRgb  | hslToRgb  | colorToRgb  |
| rgbToHsl  | hexToHsl  | hslToHex  | colorToHex  |
|           |           |           | colorToHsl  |

## Availables APIs parameter

#### Apis parameters can be a string like:

| RBG color                  | HEX color     | HSL color                    | CSS color name                              |
| -------------------------- | ------------- | ---------------------------- | ------------------------------------------- |
| `'rgb(5, 4, 3)'`           | `'#rgb'`      | `'hsl(5, 4%, 3%)'`           | [Any valid CSS color name](NAMED_COLORS.md) |
| `'rgb(5% 4% 3%)'`          | `'#rgba'`     | `'hsla(5, 4%, 3%, 0.3)'`     |                                             |
| `'rgb(5 4 3)'`             | `'#rrggbb'`   | `'hsla(5, 4%, 3%, .3)'`      |                                             |
| `'rgba(5%, 4%, 3% / 50%)'` | `'#rrggbbaa'` | `'hsla(5deg, 4%, 3%, 0.3)'`  |                                             |
| `'rgba(5%, 4%, 3%, 50%)'`  |               | `'hsla(5rad, 4%, 3%, 0.3)'`  |                                             |
| `'rgba(5%, 4%, 3%, 0.5)'`  |               | `'hsla(5turn, 4%, 3%, 0.3)'` |                                             |
| `'rgba(5% 4% 3% / 0.5)'`   |               |                              |                                             |

#### Or an object like:

| RBG color                    | HEX color                    | HSL color                    |
| ---------------------------- | ---------------------------- | ---------------------------- |
| `{r: 5, g: 4, b: 3}`         | `{r: 5, g: 4, b: 3}`         | `{h: 5, s: 4, l: 3}`         |
| `{r: 5, g: 4, b: 3, a: 0.5}` | `{r: 5, g: 4, b: 3, a: 0.5}` | `{h: 5, s: 4, l: 3, a: 0.5}` |

> [!NOTE]
> All exotic color CSS parameter are supported
>
> - rgba(50% 20% 10% 0.5)
> - rgba(50% 20% 10% 50%)
> - rgba(50%,20%,10%/50%)
> - rgba(50%, 20%, 10%, 100/2)
> - hsl(120, 25%)

> [!TIP]
> Conversion to HEX, RGB and HSL are compatible with [TailwindCSS](https://tailwindcss.com/docs/text-color#arbitrary-values)
>
> Hex is 6/8 characters, RGB and HSL has no spaces
>
> ```jsx
> <section className={`text-[${colorToHsl('BurlyWood')}]`}>...</section>
> ```

> [!IMPORTANT]
> All invalides color CSS parameter will return white color per default
>
> - #ffffff
> - rgb(255,255,255)
> - hsl(0,0%,100%)

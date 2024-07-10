# color-converter.js

Some utilities to convert any CSS color to RGB, HEX and HSL.

> This package is for didactic purpose but feel free to use it in your project.

![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/nwl-x/colorConverter.js/release.yml)
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

### Turn RGB color to HEX

```js
rgbToHex('rgb(255, 0, 0)') // returns #ff0000
```

### Turn HSL color to RGB

```js
hslToRgb('hsl(0, 0, 0') // returns rgb(255,0,0)
```

### Turn Named color to HSL

```js
colorToHsl('CornflowerBlue') // returns hsl(219,79%,66%)
```

and so on...

## Available APIs

| RGB color | HEX color | HSL color | Named color |
| --------- | --------- | --------- | ----------- |
| rgbToHex  | hexToRgb  | hslToRgb  | colorToRgb  |
| rgbToHsl  | hexToHsl  | hslToHex  | colorToHex  |
|           |           |           | colorToHsl  |

## Availables APIs parameter

| RBG color syntax          | HEX color syntax | HSL color syntax            | CSS color name                              |
| ------------------------- | ---------------- | --------------------------- | ------------------------------------------- |
| rgb(50, 40, 30)           | #fa1             | hsl(50, 40%, 30%)           | [Any valid CSS color name](NAMED_COLORS.md) |
| rgb(50% 40% 30%)          | #fa18            | hsla(50, 40%, 30%, 0.3)     |                                             |
| rgb(50 40 30)             | #ffaa11          | hsla(50, 40%, 30%, .3)      |                                             |
| rgba(50%, 40%, 30% / 50%) | #ffaa1188        | hsla(50deg, 40%, 30%, 0.3)  |                                             |
| rgba(50%, 40%, 30%, 50%)  |                  | hsla(50rad, 40%, 30%, 0.3)  |                                             |
| rgba(50%, 40%, 30%, 0.5)  |                  | hsla(50turn, 40%, 30%, 0.3) |                                             |
| rgba(50% 40% 30% / 0.5)   |                  |                             |                                             |

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

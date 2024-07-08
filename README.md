# color-converter.js

Some utilities to convert any CSS color to RGB, HEX and HSL

![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/nwl-x/colorConverter.js/release.yml)
![GitHub top language](https://img.shields.io/github/languages/top/nwl-x/colorConverter.js?logo=typescript)
![GitHub License](https://img.shields.io/github/license/nwl-x/colorConverter.js)
![NPM Downloads](https://img.shields.io/npm/dw/%40nawael%2Fcolor-converter.js?logo=npm)
![NPM Version](https://img.shields.io/npm/v/%40nawael%2Fcolor-converter.js)
![npm bundle size](https://img.shields.io/bundlephobia/min/%40nawael%2Fcolor-converter.js)

![Banner](https://raw.githubusercontent.com/nwl-x/colorConverter.js/main/banner.webp)

## Installation

#### With [npm](https://www.npmjs.com/)

```bash
npm install @nawael/color-converter.js --save
```

#### With [yarn](https://yarnpkg.com/)

```bash
yarn add @nawael/color-converter.js --save
```

## Integration

#### For [CommonJS](https://nodejs.org/docs/latest/api/modules.html#modules-commonjs-modules)

```js
const { rgbToHex, ...} = require('@nawael/color-converter.js')
```

#### For [ESM](https://nodejs.org/api/esm.html#esm_ecmascript_modules)

```js
import { rgbToHex, ... } from '@nawael/color-converter.js'
```

## Usage examples

#### Turn RGB color to HEX

```js
rgbToHex('rgb(255, 0, 0)') // returns #ff0000
```

#### Turn HSL color to RGB

```js
hslToRgb('hsl(0, 0, 0') // returns rgb(255, 0, 0)
```

#### Turn Named color to HSL

```js
colorToRgb('CornflowerBlue') // returns hsl(219, 79%, 66%)
```

and so on...

## Available APIs

| RGB color         | Description              | HEX color         | Description              | HSL color         | Description              | APIs         | Description        |
| ----------------- | ------------------------ | ----------------- | ------------------------ | ----------------- | ------------------------ | ------------ | ------------------ |
| rgbToHex()        | RGB color to HEX         | hexToRgb()        | HEX color to RGB         | hslToRgb()        | HSl color to RGB         | colorToRgb() | Named color to rgb |
| rgbToHsl()        | RGB color to HSL         | hexToHsl()        | HEX color to HSL         | hslToHex()        | HSl color to HEX         | colorToHex() | Named color to hex |
| rgbToNamedColor() | RGB color to Named color | hexToNamedColor() | HEX color to Named color | hslToNamedColor() | HSl color to Named color | colorToHsl() | Named color to hsl |

#### 👍 Available color CSS parameter

| RBG color syntax          | HEX color syntax | HSL color syntax            | CSS color name                                                                                                  |
| ------------------------- | ---------------- | --------------------------- | --------------------------------------------------------------------------------------------------------------- |
| rgb(50, 40, 30)           | #ff0000          | hsl('0', 10%, 33%)          | [Any valid CSS color name](https://raw.githubusercontent.com/nwl-x/colorConverter.js/main/src/namedColors.json) |
| rgb(50% , 40% , 30%)      | #ff000080        | hsla('120', 100%, 25%, 0.3) |                                                                                                                 |
| rgba(50%, 20%, 10%, 0.5)  |                  |                             |                                                                                                                 |
| rgba(50%, 20%, 10%, 50%)  |                  |                             |                                                                                                                 |
| rgba(50%, 20%, 10% / 50%) |                  |                             |                                                                                                                 |

#### 👎 unavailable color CSS parameter but still works

| RBG color syntax             | HEX color syntax | HSL color syntax          | CSS color name |
| ---------------------------- | ---------------- | ------------------------- | -------------- |
| rgb(50 40 30)                | #ff0000          | hsl(0, 10%, 33%)          | cornflowerblue |
| rgb(50,40,30)                | #ff000080        | hsla(120, 100%, 25%, 0.3) |                |
| rgb(50 , 40 , 30)            |                  | hsl(120, 25%)             |                |
| rgb(50% 40% 30%)             |                  |                           |                |
| rgb(50%,40%,30%)             |                  |                           |                |
| rgb(50%, 40%, 30%)           |                  |                           |                |
| rgba(50% 20% 10% 0.5)        |                  |                           |                |
| rgba(50%,20%,10%,0.5)        |                  |                           |                |
| rgba(50% , 20% , 10% , 0.5)  |                  |                           |                |
| rgba(50% 20% 10% 50%)        |                  |                           |                |
| rgba(50%,20%,10%,50%)        |                  |                           |                |
| rgba(50% , 20% , 10% , 50%)  |                  |                           |                |
| rgba(50% 20% 10% / 50%)      |                  |                           |                |
| rgba(50%,20%,10%/50%)        |                  |                           |                |
| rgba(50% , 20% , 10% / 50%)  |                  |                           |                |
| rgba(50% 20% 10% / 0.5)      |                  |                           |                |
| rgba(50%, 20%, 10%, 100/2)   |                  |                           |                |
| rgba(50%, 20%, 10%, 100 / 2) |                  |                           |                |

#### 📢 All malformed color CSS parameter will return white color per default

- #ffffff
- rgb(255, 255, 255)
- hsl(0, 0%, 100%)

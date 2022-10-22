# Svelte Typescript Chrome Extension Boilerplate

> Boilerplate for Chrome Extension Svelte Typescript project

## Features

-   [Svelte](https://svelte.dev/)
-   [TypeScript](https://www.typescriptlang.org/)
-   [rollup.js](https://rollupjs.org/guide/en/)
-   [rollup-plugin-chrome-extension](https://www.extend-chrome.dev/rollup-plugin)
-   [Chrome Extensions Manifest V3](https://developer.chrome.com/docs/extensions/mv3/intro/)

## Development

```bash
# install dependencies
npm i

# build files to `/dist` directory
# automatically reload extension when it detects changes
npm run dev
```

## Build

```bash
# build files to `/dist` directory
$ npm run build
```

## Load unpacked extensions

[Getting Started Tutorial](https://developer.chrome.com/docs/extensions/mv3/getstarted/)

1. Open the Extension Management page by navigating to `chrome://extensions`.
2. Enable Developer Mode by clicking the toggle switch next to `Developer mode`.
3. Click the `LOAD UNPACKED` button and select the `/dist` directory.

![Example](https://wd.imgix.net/image/BhuKGJaIeLNPW9ehns59NfwqKxF2/vOu7iPbaapkALed96rzN.png?auto=format&w=571)

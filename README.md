<!--
Get your module up and running quickly.

Find and replace all on all files (CMD+SHIFT+F):
- Name: Nuxt Logs
- Package name: nuxt-logs
- Description: My new Nuxt module
-->

# Nuxt Logs

> [!CAUTION]
> Module is in early experimental stage, breaking changes will occur and it is not ready for production.

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

## Progress

- [ ] File path link to log call
- [ ] Display SSR logs in Nuxt DevTools
- [ ] Client-side logger.
- [ ] Fancy Rich JSON rendering in Nuxt DevTools
- [ ] Omitting a list of specified log levels on production build.

> [!NOTE]
> _Open for more suggestions on new features and appreciate any help on optimization/better methods of executing a feature_

- [✨ &nbsp;Release Notes](/CHANGELOG.md)

## Features

- Using `consola` logger, sends logged messages back to Nuxt DevTools

![logs](https://i.imgur.com/1yva1pZ.gif)

## Quick Setup

1. Add `nuxt-logs` dependency to your project

```bash
# Using pnpm
pnpm add -D nuxt-logs

# Using yarn
yarn add --dev nuxt-logs

# Using npm
npm install --save-dev nuxt-logs
```

2. Add `nuxt-logs` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: [
    'nuxt-logs'
  ]
})
```

That's it! You can now use My Module in your Nuxt app ✨

## Development

```bash
# Install dependencies
npm install

# Generate type stubs
npm run dev:prepare

# Develop with playground, with devtools client ui
npm run dev

# Develop with playground, with bundled client ui
npm run play:prod

# Run ESLint
npm run lint

# Run Vitest
npm run test
npm run test:watch

# Release new version
npm run release
```

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/nuxt-logs/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/nuxt-logs
[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-logs.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npm.chart.dev/nuxt-logs
[license-src]: https://img.shields.io/npm/l/nuxt-logs.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/nuxt-logs
[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com

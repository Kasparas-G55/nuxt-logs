import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

export default createConfigForNuxt({
  features: {
    tooling: true,
    stylistic: true,
  },
  dirs: {
    root: [
      '',
      'playground',
      'client',
    ],
  },
})
  .override('nuxt/vue/rules', {
    rules: {
      'vue/multi-word-component-names': ['error', {
        ignores: ['index'],
      }],
    },
  })

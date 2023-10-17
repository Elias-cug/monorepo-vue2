const { defineConfig } = require("eslint-define-config")

module.exports = defineConfig({
  rules: {
    "vue/no-multiple-template-root": "off",
    "vue/multi-word-component-names": "off",
    "vue/singleline-html-element-content-newline": "off",
    "space-before-function-paren": "off",
    "comma-dangle": "off",
    curly: "off"
  },
  ignorePatterns: [
    "**/*.json",
    "dist",
    "node_modules",
    ".turbo",
    ".nuxt",
    "public",
    ".output",
    "!.storybook"
  ]
})

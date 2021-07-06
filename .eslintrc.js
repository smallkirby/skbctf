module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    '@nuxtjs/eslint-config-typescript',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
  ],
  parserOptions: {
    include: ['functions/.eslintrc.js'],
  },
  plugins: [],
  // add your custom rules here
  rules: {
    semi: ['always', 2]
  },
}

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'standard',
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:vue/base',
    'plugin:vue/vue3-strongly-recommended',
    'plugin:vue/vue3-recommended',
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['vue'],
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    'space-before-function-paren': ['error', 'never'],
    'vue/no-unused-vars': 'error',
    'vue/max-attributes-per-line': [
      'error',
      { singleline: { max: 3 }, multiline: { max: 3 } },
    ],
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
    'vue/html-closing-bracket-newline': [
      'error',
      { singleline: 'never', multiline: 'never' },
    ],
    'vue/html-self-closing': [
      'error',
      {
        html: { void: 'always', normal: 'always', component: 'always' },
        svg: 'always',
      },
    ],
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off',

    // multiline: 'never',
  },
}

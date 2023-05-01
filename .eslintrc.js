/** @format */

module.exports = {
   env: {
      browser: true,
      es2021: true,
   },
   extends: ['eslint:recommended', 'plugin:react/recommended'],
   overrides: [],
   parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
   },
   plugins: ['react'],
   rules: {
      'no-undef': 1,
      'no-unused-vars': 1,
      'react/no-unused-prop-types': 1,
      'react/no-unused-class-component-methods': 1,
      'promise/always-return': 0,
      'react/prop-types': 1,
      'no-console': 1,
   },
};

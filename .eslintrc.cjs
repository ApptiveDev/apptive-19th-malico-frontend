module.exports = {
  root: true,
  env: {browser: true, es2020: true},
  extends: [
    'google',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'build/', '*.config.js', 'node_modules/', '*.config.ts'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      {allowConstantExport: true},
    ],
    'indent': ['error', 2, {"SwitchCase": 1}],
    'linebreak-style': 0
  },
};

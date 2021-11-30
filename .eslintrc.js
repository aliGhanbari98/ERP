module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'linebreak-style': 0,
    'prettier/prettier': 'error',
    'react/prop-types': 0,
    'react/no-array-index-key': 0,
    'react/jsx-props-no-spreading': 0,
    'react/jsx-curly-newline': 0,
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-underscore-dangle': 0,
    'no-unused-vars': 'warn',
    'react/jsx-wrap-multilines': 0,
    'jsx-a11y/click-events-have-key-events': 0,
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['src', './src'],
          ['assets', './assets'],
          ['base', './src/base'],
          ['configs', './src/configs'],
          ['containers', './src/containers'],
          ['helpers', './src/helpers'],
          ['pages', './src/pages'],
          ['stores', './src/stores'],
          ['queries', './src/queries'],
          ['redux', './src/redux'],
        ],
        extensions: ['.js', '.jsx', '.scss', '.css'],
      },
    },
  },
}

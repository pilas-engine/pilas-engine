module.exports = {
  plugins: [
    'ember'
  ],
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended'
  ],
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: "module"
  },
  env: {
    browser: true
  },
  globals: {
    requireNode: true,
    ts: true,
    js_beautify: true,
    esperar: true,
    pulsar: true,
    autoComplete: true,
    ga: true,
    esperarElemento: true
  },
  rules: {
    "no-console": 0
  }
};

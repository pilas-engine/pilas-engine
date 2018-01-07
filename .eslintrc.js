module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: "module"
  },
  extends: "eslint:recommended",
  env: {
    browser: true
  },
  globals: {
    requireNode: true,
    ts: true,
    js_beautify: true
  },
  rules: {
    "no-console": 0
  }
};

module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: "module"
  },
  plugins: ["ember"],
  extends: ["eslint:recommended", "plugin:ember/recommended"],
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
  },
  overrides: [
    // node files
    {
      files: ["ember-cli-build.js", "testem.js", "config/**/*.js", "lib/*/index.js"],
      parserOptions: {
        sourceType: "script",
        ecmaVersion: 2015
      },
      env: {
        browser: false,
        node: true
      }
    }
  ]
};

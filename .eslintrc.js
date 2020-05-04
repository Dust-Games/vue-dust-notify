module.exports = {
  root: true,
  env: { node: true },
  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    "@vue/prettier",
    "@vue/typescript",
    "@vue/prettier/@typescript-eslint"
  ],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "comma-dangle": ["error", "never"]
      // "eol-last": ["error", "never"]
  },
  parserOptions: {
    parser: "@typescript-eslint/parser"
  }
};
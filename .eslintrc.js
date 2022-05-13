module.exports = {
  "env": {
    "browser": true
  },
  "extends": "plugin:vue/vue3-essential",
  "parserOptions": {
    "ecmaVersion": 2021,
    "parser": "@typescript-eslint/parser",
    "sourceType": "module"
  },
  "plugins": [
    "vue",
    "@typescript-eslint"
  ],
  "rules": {"vue/no-multiple-template-root": "off" },
  "overrides": [
    {
      files: ['src/views/**/*.vue'],
      rules: {
        'vue/multi-word-component-names': 0,
      },
    },
  ]
}
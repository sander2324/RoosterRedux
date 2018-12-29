module.exports = {
  "extends": [
    "airbnb-base",
    'plugin:vue/recommended',
  ],
  "parserOptions": {
    "parser": "babel-eslint"
  },
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "rules": {
    "no-console": "off",
    // We want to be able to modify the state from our mutations.
    "no-param-reassign": ["error", { "props": true, "ignorePropertyModificationsFor": ["state"] }],
  },
};

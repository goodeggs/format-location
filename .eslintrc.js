module.exports = {
  root: true,
  parserOptions: {
    project: ['./tsconfig.json'],
  },
  extends: ['plugin:goodeggs/recommended'],
  env: {
    node: true,
  },
  rules: {'import/no-commonjs': 'off'},
};

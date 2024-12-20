module.exports = {
  extends: ['expo', 'prettier'],
  plugins: ['prettier'],
  ignorePatterns: ['/dist/*', 'scripts/*'],
  rules: {
    'prettier/prettier': 'error',
  },
};

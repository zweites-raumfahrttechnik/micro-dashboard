module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recommended-vue',
    'stylelint-config-prettier',
  ],
  overrides: [
    {
      files: ['**/*.less'],
      customSyntax: 'postcss-less',
    },
  ],
};

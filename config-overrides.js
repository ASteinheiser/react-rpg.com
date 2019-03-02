const { override, useEslintRc } = require('customize-cra');

module.exports = override(
  useEslintRc('.eslintrc.yml')
);
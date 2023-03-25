// cucumber.js
require('ts-node').register();

let common = [
  'test/integration/features/**/*.feature',                // Specify our feature files
  '--require test/integration/step_definitions/**/*.ts',
  '--format progress-bar',                // Load custom formatter
  '--publish-quiet'
].join(' ');

module.exports = {
  default: common
};

const { createConfig } = require('@grande-armee/pocket-style-guide/eslint');

module.exports = createConfig(['@src', '@http', '@shared', '@integration']);

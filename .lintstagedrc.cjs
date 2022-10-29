module.exports = {
  './src/**/*.ts': 'npm run lint:fix',
  '*': ['npm run lint:ec', 'npm run format:fix']
};

const fs = require('fs');
const tsJest = require('ts-jest').default;
const getCacheKey = require('./get_cache_key');
const THIS_FILE = fs.readFileSync(__filename);
const jestTransformer = tsJest.createTransformer();
const addCreateElementImport = src => `import React from 'react'; ${src}`;
module.exports = {
  process(src, filename, options) {
    return jestTransformer.process(filename.indexOf('__tests__') > -1 ? src : addCreateElementImport(src), filename, options);
  },
  getCacheKey(fileData, filePath, transformOptions) {
    return getCacheKey(fileData, filePath, transformOptions.configString, THIS_FILE);
  }
};
/**
* DevExtreme (cjs/renovation/test_utils/transformers/get_cache_key.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var crypto = require('crypto');
module.exports = function (fileData, filePath, configStr, transformerFileSrc) {
  return crypto.createHash('md5').update(transformerFileSrc).update('\0', 'utf8').update(fileData).update('\0', 'utf8').update(filePath).update('\0', 'utf8').update(configStr).digest('hex');
};

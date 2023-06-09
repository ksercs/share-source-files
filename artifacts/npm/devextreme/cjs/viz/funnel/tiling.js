/**
* DevExtreme (cjs/viz/funnel/tiling.js)
* Version: 23.1.1
* Build date: Mon May 15 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.addAlgorithm = addAlgorithm;
exports.getAlgorithm = getAlgorithm;
var _utils = require("../core/utils");
var algorithms = {};
var defaultAlgorithm;
function getAlgorithm(name) {
  return algorithms[(0, _utils.normalizeEnum)(name)] || defaultAlgorithm;
}
function addAlgorithm(name, callback, setDefault) {
  algorithms[name] = callback;
  if (setDefault) {
    defaultAlgorithm = algorithms[name];
  }
}

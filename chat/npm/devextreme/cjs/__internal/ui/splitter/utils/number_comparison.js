/**
* DevExtreme (cjs/__internal/ui/splitter/utils/number_comparison.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PRECISION = void 0;
exports.compareNumbersWithPrecision = compareNumbersWithPrecision;
var _utils = require("../../../../common/core/localization/utils");
const PRECISION = exports.PRECISION = 10;
function compareNumbersWithPrecision(actual, expected) {
  let precision = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : PRECISION;
  const delta = parseFloat((0, _utils.toFixed)(actual, precision)) - parseFloat((0, _utils.toFixed)(expected, precision));
  if (delta === 0) {
    return 0;
  }
  return delta > 0 ? 1 : -1;
}

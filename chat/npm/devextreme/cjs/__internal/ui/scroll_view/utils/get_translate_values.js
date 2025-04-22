/**
* DevExtreme (cjs/__internal/ui/scroll_view/utils/get_translate_values.js)
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
exports.getTranslateValues = getTranslateValues;
var _get_element_style = require("./get_element_style");
function getTranslateValues(el) {
  const matrix = (0, _get_element_style.getElementTransform)(el);
  const regex = /matrix.*\((.+)\)/;
  const matrixValues = regex.exec(matrix);
  if (matrixValues) {
    const result = matrixValues[1].split(', ');
    return {
      left: Number(result[4]),
      top: Number(result[5])
    };
  }
  return {
    left: 0,
    top: 0
  };
}

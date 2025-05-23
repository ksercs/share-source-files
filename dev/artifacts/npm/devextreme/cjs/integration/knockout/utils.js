/**
* DevExtreme (cjs/integration/knockout/utils.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.getClosestNodeWithKoCreation = exports.getClosestNodeWithContext = void 0;
var _knockout = _interopRequireDefault(require("knockout"));
var _renderer = _interopRequireDefault(require("../../core/renderer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// eslint-disable-next-line no-restricted-imports

var getClosestNodeWithContext = function getClosestNodeWithContext(node) {
  var context = _knockout.default.contextFor(node);
  if (!context && node.parentNode) {
    return getClosestNodeWithContext(node.parentNode);
  }
  return node;
};
exports.getClosestNodeWithContext = getClosestNodeWithContext;
var getClosestNodeWithKoCreation = function getClosestNodeWithKoCreation(node) {
  var $el = (0, _renderer.default)(node);
  var data = $el.data();
  var hasFlag = data && data['dxKoCreation'];
  if (hasFlag) {
    return node;
  }
  if (node.parentNode) {
    return getClosestNodeWithKoCreation(node.parentNode);
  }
  return null;
};
exports.getClosestNodeWithKoCreation = getClosestNodeWithKoCreation;

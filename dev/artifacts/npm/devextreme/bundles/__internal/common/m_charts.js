/**
* DevExtreme (bundles/__internal/common/m_charts.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerPattern = exports.registerGradient = exports.default = void 0;
var _utils = require("../../viz/core/utils");
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var graphicObjects = {};
var registerPattern = function registerPattern(options) {
  var id = (0, _utils.getNextDefsSvgId)();
  graphicObjects[id] = _extends({
    type: 'pattern'
  }, options);
  return id;
};
exports.registerPattern = registerPattern;
var registerGradient = function registerGradient(type, options) {
  var id = (0, _utils.getNextDefsSvgId)();
  graphicObjects[id] = _extends({
    type
  }, options);
  return id;
};
exports.registerGradient = registerGradient;
var getGraphicObjects = function getGraphicObjects() {
  return graphicObjects;
};
var _default = {
  getGraphicObjects
};
exports.default = _default;

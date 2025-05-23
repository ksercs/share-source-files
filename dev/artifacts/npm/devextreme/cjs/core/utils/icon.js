/**
* DevExtreme (cjs/core/utils/icon.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.getImageSourceType = exports.getImageContainer = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var ICON_CLASS = 'dx-icon';
var SVG_ICON_CLASS = 'dx-svg-icon';
var getImageSourceType = function getImageSourceType(source) {
  if (!source || typeof source !== 'string') {
    return false;
  }
  if (/^\s*<svg[^>]*>(.|\r?\n)*?<\/svg>\s*$/i.test(source)) {
    return 'svg';
  }
  if (/data:.*base64|\.|[^<\s]\/{1,1}/.test(source)) {
    return 'image';
  }
  if (/^[\w-_]+$/.test(source)) {
    return 'dxIcon';
  }
  if (/^\s?([\w-_]\s?)+$/.test(source)) {
    return 'fontIcon';
  }
  return false;
};
exports.getImageSourceType = getImageSourceType;
var getImageContainer = function getImageContainer(source) {
  switch (getImageSourceType(source)) {
    case 'image':
      return (0, _renderer.default)('<img>').attr('src', source).addClass(ICON_CLASS);
    case 'fontIcon':
      return (0, _renderer.default)('<i>').addClass("".concat(ICON_CLASS, " ").concat(source));
    case 'dxIcon':
      return (0, _renderer.default)('<i>').addClass("".concat(ICON_CLASS, " ").concat(ICON_CLASS, "-").concat(source));
    case 'svg':
      return (0, _renderer.default)('<i>').addClass("".concat(ICON_CLASS, " ").concat(SVG_ICON_CLASS)).append(source);
    default:
      return null;
  }
};
exports.getImageContainer = getImageContainer;

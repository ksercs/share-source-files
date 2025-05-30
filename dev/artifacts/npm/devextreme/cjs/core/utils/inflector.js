/**
* DevExtreme (cjs/core/utils/inflector.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.underscore = exports.titleize = exports.humanize = exports.dasherize = exports.captionize = exports.camelize = void 0;
var _iterator = require("./iterator");
var _normalize = function _normalize(text) {
  if (text === undefined || text === null) {
    return '';
  }
  return String(text);
};
var _upperCaseFirst = function _upperCaseFirst(text) {
  return _normalize(text).charAt(0).toUpperCase() + text.substr(1);
};
var _chop = function _chop(text) {
  return _normalize(text).replace(/([a-z\d])([A-Z])/g, '$1 $2').split(/[\s_-]+/);
};
var dasherize = function dasherize(text) {
  return (0, _iterator.map)(_chop(text), function (p) {
    return p.toLowerCase();
  }).join('-');
};
exports.dasherize = dasherize;
var underscore = function underscore(text) {
  return dasherize(text).replace(/-/g, '_');
};
exports.underscore = underscore;
var camelize = function camelize(text, upperFirst) {
  return (0, _iterator.map)(_chop(text), function (p, i) {
    p = p.toLowerCase();
    if (upperFirst || i > 0) {
      p = _upperCaseFirst(p);
    }
    return p;
  }).join('');
};
exports.camelize = camelize;
var humanize = function humanize(text) {
  return _upperCaseFirst(dasherize(text).replace(/-/g, ' '));
};
exports.humanize = humanize;
var titleize = function titleize(text) {
  return (0, _iterator.map)(_chop(text), function (p) {
    return _upperCaseFirst(p.toLowerCase());
  }).join(' ');
};
exports.titleize = titleize;
var DIGIT_CHARS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
var captionize = function captionize(name) {
  var captionList = [];
  var i;
  var char;
  var isPrevCharNewWord = false;
  var isNewWord = false;
  for (i = 0; i < name.length; i++) {
    char = name.charAt(i);
    isNewWord = char === char.toUpperCase() && char !== '-' && char !== ')' && char !== '/' || char in DIGIT_CHARS;
    if (char === '_' || char === '.') {
      char = ' ';
      isNewWord = true;
    } else if (i === 0) {
      char = char.toUpperCase();
      isNewWord = true;
    } else if (!isPrevCharNewWord && isNewWord) {
      if (captionList.length > 0) {
        captionList.push(' ');
      }
    }
    captionList.push(char);
    isPrevCharNewWord = isNewWord;
  }
  return captionList.join('');
};
exports.captionize = captionize;

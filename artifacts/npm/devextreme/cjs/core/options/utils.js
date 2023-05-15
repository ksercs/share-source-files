/**
* DevExtreme (cjs/core/options/utils.js)
* Version: 23.1.1
* Build date: Mon May 15 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.normalizeOptions = exports.getParentName = exports.getNestedOptionValue = exports.getFieldName = exports.deviceMatch = exports.createDefaultOptionRules = exports.convertRulesToOptions = void 0;
var _devices = _interopRequireDefault(require("../devices"));
var _type = require("../utils/type");
var _common = require("../utils/common");
var _extend = require("../utils/extend");
var _data = require("../utils/data");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var cachedGetters = {};
var convertRulesToOptions = function convertRulesToOptions(rules) {
  var currentDevice = _devices.default.current();
  return rules.reduce(function (options, _ref) {
    var device = _ref.device,
      ruleOptions = _ref.options;
    var deviceFilter = device || {};
    var match = (0, _type.isFunction)(deviceFilter) ? deviceFilter(currentDevice) : deviceMatch(currentDevice, deviceFilter);
    if (match) {
      (0, _extend.extend)(true, options, ruleOptions);
    }
    return options;
  }, {});
};
exports.convertRulesToOptions = convertRulesToOptions;
var normalizeOptions = function normalizeOptions(options, value) {
  return typeof options !== 'string' ? options : _defineProperty({}, options, value);
};
exports.normalizeOptions = normalizeOptions;
var deviceMatch = function deviceMatch(device, filter) {
  return (0, _type.isEmptyObject)(filter) || (0, _common.findBestMatches)(device, [filter]).length > 0;
};
exports.deviceMatch = deviceMatch;
var getFieldName = function getFieldName(fullName) {
  return fullName.substr(fullName.lastIndexOf('.') + 1);
};
exports.getFieldName = getFieldName;
var getParentName = function getParentName(fullName) {
  return fullName.substr(0, fullName.lastIndexOf('.'));
};
exports.getParentName = getParentName;
var getNestedOptionValue = function getNestedOptionValue(optionsObject, name) {
  cachedGetters[name] = cachedGetters[name] || (0, _data.compileGetter)(name);
  return cachedGetters[name](optionsObject, {
    functionsAsIs: true
  });
};
exports.getNestedOptionValue = getNestedOptionValue;
var createDefaultOptionRules = function createDefaultOptionRules() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return options;
};
exports.createDefaultOptionRules = createDefaultOptionRules;

"use strict";

exports.default = void 0;
var _dependency_injector = _interopRequireDefault(require("../core/utils/dependency_injector"));
var _extend = require("../core/utils/extend");
var _string = require("../core/utils/string");
var _inflector = require("../core/utils/inflector");
var _core = _interopRequireDefault(require("./core"));
var _default_messages = require("./default_messages");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var baseDictionary = (0, _extend.extend)(true, {}, _default_messages.defaultMessages);
var getDataByLocale = function getDataByLocale(localeData, locale) {
  var _Object$entries$find;
  return localeData[locale] || (locale === null || locale === void 0 ? void 0 : locale.toLowerCase) && ((_Object$entries$find = Object.entries(localeData).find(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 1),
      key = _ref2[0];
    return key.toLowerCase() === locale.toLowerCase();
  })) === null || _Object$entries$find === void 0 ? void 0 : _Object$entries$find[1]) || {};
};
var newMessages = {};
var messageLocalization = (0, _dependency_injector.default)({
  engine: function engine() {
    return 'base';
  },
  _dictionary: baseDictionary,
  load: function load(messages) {
    (0, _extend.extend)(true, this._dictionary, messages);
  },
  _localizablePrefix: '@',
  setup: function setup(localizablePrefix) {
    this._localizablePrefix = localizablePrefix;
  },
  localizeString: function localizeString(text) {
    var that = this;
    var regex = new RegExp('(^|[^a-zA-Z_0-9' + that._localizablePrefix + '-]+)(' + that._localizablePrefix + '{1,2})([a-zA-Z_0-9-]+)', 'g');
    var escapeString = that._localizablePrefix + that._localizablePrefix;
    return text.replace(regex, function (str, prefix, escape, localizationKey) {
      var defaultResult = that._localizablePrefix + localizationKey;
      var result;
      if (escape !== escapeString) {
        result = that.format(localizationKey);
      }
      if (!result) {
        newMessages[localizationKey] = (0, _inflector.humanize)(localizationKey);
      }
      return prefix + (result || defaultResult);
    });
  },
  getMessagesByLocales: function getMessagesByLocales() {
    return this._dictionary;
  },
  getDictionary: function getDictionary(onlyNew) {
    if (onlyNew) {
      return newMessages;
    }
    return (0, _extend.extend)({}, newMessages, this.getMessagesByLocales()[_core.default.locale()]);
  },
  getFormatter: function getFormatter(key) {
    return this._getFormatterBase(key) || this._getFormatterBase(key, 'en');
  },
  _getFormatterBase: function _getFormatterBase(key, locale) {
    var _this = this;
    var message = _core.default.getValueByClosestLocale(function (locale) {
      return getDataByLocale(_this._dictionary, locale)[key];
    });
    if (message) {
      return function () {
        var args = arguments.length === 1 && Array.isArray(arguments[0]) ? arguments[0].slice(0) : Array.prototype.slice.call(arguments, 0);
        args.unshift(message);
        return _string.format.apply(this, args);
      };
    }
  },
  format: function format(key) {
    var formatter = this.getFormatter(key);
    var values = Array.prototype.slice.call(arguments, 1);
    return formatter && formatter.apply(this, values) || '';
  }
});
var _default = messageLocalization;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
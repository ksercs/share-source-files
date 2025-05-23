import dependencyInjector from '../core/utils/dependency_injector';
import { extend } from '../core/utils/extend';
import { format as stringFormat } from '../core/utils/string';
import { humanize } from '../core/utils/inflector';
import coreLocalization from './core';
import { defaultMessages } from './default_messages';
var baseDictionary = extend(true, {}, defaultMessages);
var getDataByLocale = (localeData, locale) => {
  var _Object$entries$find;
  return localeData[locale] || (locale === null || locale === void 0 ? void 0 : locale.toLowerCase) && ((_Object$entries$find = Object.entries(localeData).find(_ref => {
    var [key] = _ref;
    return key.toLowerCase() === locale.toLowerCase();
  })) === null || _Object$entries$find === void 0 ? void 0 : _Object$entries$find[1]) || {};
};
var newMessages = {};
var messageLocalization = dependencyInjector({
  engine: function engine() {
    return 'base';
  },
  _dictionary: baseDictionary,
  load: function load(messages) {
    extend(true, this._dictionary, messages);
  },
  _localizablePrefix: '@',
  setup: function setup(localizablePrefix) {
    this._localizablePrefix = localizablePrefix;
  },
  localizeString: function localizeString(text) {
    var that = this;
    var regex = new RegExp('(^|[^a-zA-Z_0-9' + that._localizablePrefix + '-]+)(' + that._localizablePrefix + '{1,2})([a-zA-Z_0-9-]+)', 'g');
    var escapeString = that._localizablePrefix + that._localizablePrefix;
    return text.replace(regex, (str, prefix, escape, localizationKey) => {
      var defaultResult = that._localizablePrefix + localizationKey;
      var result;
      if (escape !== escapeString) {
        result = that.format(localizationKey);
      }
      if (!result) {
        newMessages[localizationKey] = humanize(localizationKey);
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
    return extend({}, newMessages, this.getMessagesByLocales()[coreLocalization.locale()]);
  },
  getFormatter: function getFormatter(key) {
    return this._getFormatterBase(key) || this._getFormatterBase(key, 'en');
  },
  _getFormatterBase: function _getFormatterBase(key, locale) {
    var message = coreLocalization.getValueByClosestLocale(locale => getDataByLocale(this._dictionary, locale)[key]);
    if (message) {
      return function () {
        var args = arguments.length === 1 && Array.isArray(arguments[0]) ? arguments[0].slice(0) : Array.prototype.slice.call(arguments, 0);
        args.unshift(message);
        return stringFormat.apply(this, args);
      };
    }
  },
  format: function format(key) {
    var formatter = this.getFormatter(key);
    var values = Array.prototype.slice.call(arguments, 1);
    return formatter && formatter.apply(this, values) || '';
  }
});
export default messageLocalization;
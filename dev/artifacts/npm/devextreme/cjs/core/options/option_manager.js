/**
* DevExtreme (cjs/core/options/option_manager.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.OptionManager = void 0;
var _data = require("../utils/data");
var _common = require("../utils/common");
var _comparator = require("../utils/comparator");
var _extend = require("../utils/extend");
var _type = require("../utils/type");
var _utils = require("./utils");
var cachedGetters = {};
var cachedSetters = {};
var OptionManager = /*#__PURE__*/function () {
  function OptionManager(options, optionsByReference) {
    this._options = options;
    this._optionsByReference = optionsByReference;
    this._changingCallback;
    this._changedCallback;
    this._namePreparedCallbacks;
  }
  var _proto = OptionManager.prototype;
  _proto._setByReference = function _setByReference(options, rulesOptions) {
    (0, _extend.extend)(true, options, rulesOptions);
    for (var fieldName in this._optionsByReference) {
      if (Object.prototype.hasOwnProperty.call(rulesOptions, fieldName)) {
        options[fieldName] = rulesOptions[fieldName];
      }
    }
  };
  _proto._setPreparedValue = function _setPreparedValue(name, value, merge, silent) {
    var previousValue = this.get(this._options, name, false);
    if (!(0, _comparator.equals)(previousValue, value)) {
      var path = (0, _data.getPathParts)(name);
      !silent && this._changingCallback(name, previousValue, value);
      cachedSetters[name] = cachedSetters[name] || (0, _data.compileSetter)(name);
      cachedSetters[name](this._options, value, {
        functionsAsIs: true,
        merge: (0, _type.isDefined)(merge) ? merge : !this._optionsByReference[name],
        unwrapObservables: path.length > 1 && !!this._optionsByReference[path[0]]
      });
      !silent && this._changedCallback(name, value, previousValue);
    }
  };
  _proto._prepareRelevantNames = function _prepareRelevantNames(options, name, value, silent) {
    if ((0, _type.isPlainObject)(value)) {
      for (var valueName in value) {
        this._prepareRelevantNames(options, "".concat(name, ".").concat(valueName), value[valueName]);
      }
    }
    this._namePreparedCallbacks(options, name, value, silent);
  };
  _proto.get = function get() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._options;
    var name = arguments.length > 1 ? arguments[1] : undefined;
    var unwrapObservables = arguments.length > 2 ? arguments[2] : undefined;
    cachedGetters[name] = cachedGetters[name] || (0, _data.compileGetter)(name);
    return cachedGetters[name](options, {
      functionsAsIs: true,
      unwrapObservables
    });
  };
  _proto.set = function set(options, value, merge, silent) {
    options = (0, _utils.normalizeOptions)(options, value);
    for (var name in options) {
      this._prepareRelevantNames(options, name, options[name], silent);
    }
    for (var _name in options) {
      this._setPreparedValue(_name, options[_name], merge, silent);
    }
  };
  _proto.onRelevantNamesPrepared = function onRelevantNamesPrepared(callBack) {
    this._namePreparedCallbacks = callBack;
  };
  _proto.onChanging = function onChanging(callBack) {
    this._changingCallback = callBack;
  };
  _proto.onChanged = function onChanged(callBack) {
    this._changedCallback = callBack;
  };
  _proto.dispose = function dispose() {
    this._changingCallback = _common.noop;
    this._changedCallback = _common.noop;
  };
  return OptionManager;
}();
exports.OptionManager = OptionManager;

!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/core/options/index.js"], ["../utils/type","../utils/common","./option_manager","../utils/data","./utils","../utils/extend"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/core/options/index.js", ["../utils/type", "../utils/common", "./option_manager", "../utils/data", "./utils", "../utils/extend"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.Options = void 0;
  var _type = $__require("../utils/type");
  var _common = $__require("../utils/common");
  var _option_manager = $__require("./option_manager");
  var _data = $__require("../utils/data");
  var _utils = $__require("./utils");
  var _extend = $__require("../utils/extend");
  function _typeof(obj) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }
  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }return target;
    };return _extends.apply(this, arguments);
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");return _typeof(key) === "symbol" ? key : String(key);
  }
  function _toPrimitive(input, hint) {
    if (_typeof(input) !== "object" || input === null) return input;var prim = input[Symbol.toPrimitive];if (prim !== undefined) {
      var res = prim.call(input, hint || "default");if (_typeof(res) !== "object") return res;throw new TypeError("@@toPrimitive must return a primitive value.");
    }return (hint === "string" ? String : Number)(input);
  }
  var Options = /*#__PURE__*/function () {
    function Options(options, defaultOptions, optionsByReference, deprecatedOptions) {
      var _this = this;
      this._deprecatedCallback;
      this._startChangeCallback;
      this._endChangeCallback;
      this._default = defaultOptions;
      this._deprecated = deprecatedOptions;
      this._deprecatedNames = [];
      this._initDeprecatedNames();
      this._optionManager = new _option_manager.OptionManager(options, optionsByReference);
      this._optionManager.onRelevantNamesPrepared(function (options, name, value, silent) {
        return _this._setRelevantNames(options, name, value, silent);
      });
      this._cachedOptions = {};
      this._rules = [];
    }
    var _proto = Options.prototype;
    _proto._initDeprecatedNames = function _initDeprecatedNames() {
      for (var optionName in this._deprecated) {
        this._deprecatedNames.push(optionName);
      }
    };
    _proto._getByRules = function _getByRules(rules) {
      rules = Array.isArray(rules) ? this._rules.concat(rules) : this._rules;
      return (0, _utils.convertRulesToOptions)(rules);
    };
    _proto._notifyDeprecated = function _notifyDeprecated(option) {
      var info = this._deprecated[option];
      if (info) {
        this._deprecatedCallback(option, info);
      }
    };
    _proto._setRelevantNames = function _setRelevantNames(options, name, value, silent) {
      if (name) {
        var normalizedName = this._normalizeName(name, silent);
        if (normalizedName && normalizedName !== name) {
          this._setField(options, normalizedName, value);
          this._clearField(options, name);
        }
      }
    };
    _proto._setField = function _setField(options, fullName, value) {
      var fieldName = '';
      var fieldObject = null;
      do {
        fieldName = fieldName ? ".".concat(fieldName) : '';
        fieldName = (0, _utils.getFieldName)(fullName) + fieldName;
        fullName = (0, _utils.getParentName)(fullName);
        fieldObject = fullName ? this._optionManager.get(options, fullName, false) : options;
      } while (!fieldObject);
      fieldObject[fieldName] = value;
    };
    _proto._clearField = function _clearField(options, name) {
      delete options[name];
      var previousFieldName = (0, _utils.getParentName)(name);
      var fieldObject = previousFieldName ? this._optionManager.get(options, previousFieldName, false) : options;
      if (fieldObject) {
        delete fieldObject[(0, _utils.getFieldName)(name)];
      }
    };
    _proto._normalizeName = function _normalizeName(name, silent) {
      if (this._deprecatedNames.length && name) {
        for (var i = 0; i < this._deprecatedNames.length; i++) {
          if (this._deprecatedNames[i] === name) {
            var deprecate = this._deprecated[name];
            if (deprecate) {
              !silent && this._notifyDeprecated(name);
              return deprecate.alias || name;
            }
          }
        }
      }
      return name;
    };
    _proto.addRules = function addRules(rules) {
      this._rules = rules.concat(this._rules);
    };
    _proto.applyRules = function applyRules(rules) {
      var options = this._getByRules(rules);
      this.silent(options);
    };
    _proto.dispose = function dispose() {
      this._deprecatedCallback = _common.noop;
      this._startChangeCallback = _common.noop;
      this._endChangeCallback = _common.noop;
      this._optionManager.dispose();
    };
    _proto.onChanging = function onChanging(callBack) {
      this._optionManager.onChanging(callBack);
    };
    _proto.onChanged = function onChanged(callBack) {
      this._optionManager.onChanged(callBack);
    };
    _proto.onDeprecated = function onDeprecated(callBack) {
      this._deprecatedCallback = callBack;
    };
    _proto.onStartChange = function onStartChange(callBack) {
      this._startChangeCallback = callBack;
    };
    _proto.onEndChange = function onEndChange(callBack) {
      this._endChangeCallback = callBack;
    };
    _proto.isInitial = function isInitial(name) {
      var value = this.silent(name);
      var initialValue = this.initial(name);
      var areFunctions = (0, _type.isFunction)(value) && (0, _type.isFunction)(initialValue);
      return areFunctions ? value.toString() === initialValue.toString() : (0, _common.equalByValue)(value, initialValue);
    };
    _proto.initial = function initial(name) {
      return (0, _utils.getNestedOptionValue)(this._initial, name);
    };
    _proto.option = function option(options, value) {
      var isGetter = arguments.length < 2 && (0, _type.type)(options) !== 'object';
      if (isGetter) {
        return this._optionManager.get(undefined, this._normalizeName(options));
      } else {
        this._startChangeCallback();
        try {
          this._optionManager.set(options, value);
        } finally {
          this._endChangeCallback();
        }
      }
    };
    _proto.silent = function silent(options, value) {
      var isGetter = arguments.length < 2 && (0, _type.type)(options) !== 'object';
      if (isGetter) {
        return this._optionManager.get(undefined, options, undefined, true);
      } else {
        this._optionManager.set(options, value, undefined, true);
      }
    };
    _proto.reset = function reset(name) {
      var _this2 = this;
      if (name) {
        var fullPath = (0, _data.getPathParts)(name);
        var value = fullPath.reduce(function (value, field) {
          return value ? value[field] : _this2.initial(field);
        }, null);
        var defaultValue = (0, _type.isObject)(value) ? _extends({}, value) : value;
        this._optionManager.set(name, defaultValue, false);
      }
    };
    _proto.getAliasesByName = function getAliasesByName(name) {
      var _this3 = this;
      return Object.keys(this._deprecated).filter(function (aliasName) {
        return name === _this3._deprecated[aliasName].alias;
      });
    };
    _proto.isDeprecated = function isDeprecated(name) {
      return Object.prototype.hasOwnProperty.call(this._deprecated, name);
    };
    _proto.cache = function cache(name, options) {
      var isGetter = arguments.length < 2;
      if (isGetter) {
        return this._cachedOptions[name];
      } else {
        this._cachedOptions[name] = (0, _extend.extend)(this._cachedOptions[name], options);
      }
    };
    _createClass(Options, [{
      key: "_initial",
      get: function get() {
        if (!this._initialOptions) {
          var rulesOptions = this._getByRules(this.silent('defaultOptionsRules'));
          this._initialOptions = this._default;
          this._optionManager._setByReference(this._initialOptions, rulesOptions);
        }
        return this._initialOptions;
      },
      set: function set(value) {
        this._initialOptions = value;
      }
    }]);
    return Options;
  }();
  exports.Options = Options;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../utils/type","../utils/common","./option_manager","../utils/data","./utils","../utils/extend"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../utils/type"), require("../utils/common"), require("./option_manager"), require("../utils/data"), require("./utils"), require("../utils/extend"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=index.js.map
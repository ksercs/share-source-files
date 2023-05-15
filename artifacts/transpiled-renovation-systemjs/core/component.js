!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/core/component.js"], ["./config","./utils/extend","./options/index","./options/utils","./class","./action","./errors","./utils/callbacks","./events_strategy","./utils/public_component","./postponed_operations","./utils/type","./utils/common","./utils/data"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/core/component.js", ["./config", "./utils/extend", "./options/index", "./options/utils", "./class", "./action", "./errors", "./utils/callbacks", "./events_strategy", "./utils/public_component", "./postponed_operations", "./utils/type", "./utils/common", "./utils/data"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.Component = void 0;
  var _config = _interopRequireDefault($__require("./config"));
  var _extend = $__require("./utils/extend");
  var _index = $__require("./options/index");
  var _utils = $__require("./options/utils");
  var _class = _interopRequireDefault($__require("./class"));
  var _action = _interopRequireDefault($__require("./action"));
  var _errors = _interopRequireDefault($__require("./errors"));
  var _callbacks = _interopRequireDefault($__require("./utils/callbacks"));
  var _events_strategy = $__require("./events_strategy");
  var _public_component = $__require("./utils/public_component");
  var _postponed_operations = $__require("./postponed_operations");
  var _type = $__require("./utils/type");
  var _common = $__require("./utils/common");
  var _data = $__require("./utils/data");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var getEventName = function getEventName(actionName) {
    return actionName.charAt(2).toLowerCase() + actionName.substr(3);
  };
  var isInnerOption = function isInnerOption(optionName) {
    return optionName.indexOf('_', 0) === 0;
  };
  var Component = _class.default.inherit({
    _setDeprecatedOptions: function _setDeprecatedOptions() {
      this._deprecatedOptions = {};
    },
    _getDeprecatedOptions: function _getDeprecatedOptions() {
      return this._deprecatedOptions;
    },
    _getDefaultOptions: function _getDefaultOptions() {
      return {
        onInitialized: null,
        onOptionChanged: null,
        onDisposing: null,
        defaultOptionsRules: null
      };
    },
    _defaultOptionsRules: function _defaultOptionsRules() {
      return [];
    },
    _setOptionsByDevice: function _setOptionsByDevice(rules) {
      this._options.applyRules(rules);
    },
    _convertRulesToOptions: function _convertRulesToOptions(rules) {
      return (0, _utils.convertRulesToOptions)(rules);
    },
    _isInitialOptionValue: function _isInitialOptionValue(name) {
      return this._options.isInitial(name);
    },
    _setOptionsByReference: function _setOptionsByReference() {
      this._optionsByReference = {};
    },
    _getOptionsByReference: function _getOptionsByReference() {
      return this._optionsByReference;
    },
    /**
    * @name Component.ctor
    * @publicName ctor(options)
    * @param1 options:ComponentOptions|undefined
    * @hidden
    */
    ctor: function ctor() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var _optionChangedCallbacks = options._optionChangedCallbacks,
          _disposingCallbacks = options._disposingCallbacks;
      this.NAME = (0, _public_component.name)(this.constructor);
      this._eventsStrategy = _events_strategy.EventsStrategy.create(this, options.eventsStrategy);
      this._updateLockCount = 0;
      this._optionChangedCallbacks = _optionChangedCallbacks || (0, _callbacks.default)();
      this._disposingCallbacks = _disposingCallbacks || (0, _callbacks.default)();
      this.postponedOperations = new _postponed_operations.PostponedOperations();
      this._createOptions(options);
    },
    _createOptions: function _createOptions(options) {
      var _this = this;
      this.beginUpdate();
      try {
        this._setOptionsByReference();
        this._setDeprecatedOptions();
        this._options = new _index.Options(this._getDefaultOptions(), this._getDefaultOptions(), this._getOptionsByReference(), this._getDeprecatedOptions());
        this._options.onChanging(function (name, previousValue, value) {
          return _this._initialized && _this._optionChanging(name, previousValue, value);
        });
        this._options.onDeprecated(function (option, info) {
          return _this._logDeprecatedOptionWarning(option, info);
        });
        this._options.onChanged(function (name, value, previousValue) {
          return _this._notifyOptionChanged(name, value, previousValue);
        });
        this._options.onStartChange(function () {
          return _this.beginUpdate();
        });
        this._options.onEndChange(function () {
          return _this.endUpdate();
        });
        this._options.addRules(this._defaultOptionsRules());
        if (options && options.onInitializing) {
          options.onInitializing.apply(this, [options]);
        }
        this._setOptionsByDevice(options.defaultOptionsRules);
        this._initOptions(options);
      } finally {
        this.endUpdate();
      }
    },
    _initOptions: function _initOptions(options) {
      this.option(options);
    },
    _init: function _init() {
      var _this2 = this;
      this._createOptionChangedAction();
      this.on('disposing', function (args) {
        _this2._disposingCallbacks.fireWith(_this2, [args]);
      });
    },
    _logDeprecatedOptionWarning: function _logDeprecatedOptionWarning(option, info) {
      var message = info.message || "Use the '".concat(info.alias, "' option instead");
      _errors.default.log('W0001', this.NAME, option, info.since, message);
    },
    _logDeprecatedComponentWarning: function _logDeprecatedComponentWarning(since, alias) {
      _errors.default.log('W0000', this.NAME, since, "Use the '".concat(alias, "' widget instead"));
    },
    _createOptionChangedAction: function _createOptionChangedAction() {
      this._optionChangedAction = this._createActionByOption('onOptionChanged', {
        excludeValidators: ['disabled', 'readOnly']
      });
    },
    _createDisposingAction: function _createDisposingAction() {
      this._disposingAction = this._createActionByOption('onDisposing', {
        excludeValidators: ['disabled', 'readOnly']
      });
    },
    _optionChanged: function _optionChanged(args) {
      switch (args.name) {
        case 'onDisposing':
        case 'onInitialized':
          break;
        case 'onOptionChanged':
          this._createOptionChangedAction();
          break;
        case 'defaultOptionsRules':
          break;
      }
    },
    _dispose: function _dispose() {
      this._optionChangedCallbacks.empty();
      this._createDisposingAction();
      this._disposingAction();
      this._eventsStrategy.dispose();
      this._options.dispose();
      this._disposed = true;
    },
    _lockUpdate: function _lockUpdate() {
      this._updateLockCount++;
    },
    _unlockUpdate: function _unlockUpdate() {
      this._updateLockCount = Math.max(this._updateLockCount - 1, 0);
    },
    // TODO: remake as getter after ES6 refactor
    _isUpdateAllowed: function _isUpdateAllowed() {
      return this._updateLockCount === 0;
    },
    // TODO: remake as getter after ES6 refactor
    _isInitializingRequired: function _isInitializingRequired() {
      return !this._initializing && !this._initialized;
    },
    isInitialized: function isInitialized() {
      return this._initialized;
    },
    _commitUpdate: function _commitUpdate() {
      this.postponedOperations.callPostponedOperations();
      this._isInitializingRequired() && this._initializeComponent();
    },
    _initializeComponent: function _initializeComponent() {
      this._initializing = true;
      try {
        this._init();
      } finally {
        this._initializing = false;
        this._lockUpdate();
        this._createActionByOption('onInitialized', {
          excludeValidators: ['disabled', 'readOnly']
        })();
        this._unlockUpdate();
        this._initialized = true;
      }
    },
    instance: function instance() {
      return this;
    },
    beginUpdate: function beginUpdate() {
      this._lockUpdate();
    },
    endUpdate: function endUpdate() {
      this._unlockUpdate();
      this._isUpdateAllowed() && this._commitUpdate();
    },
    _optionChanging: _common.noop,
    _notifyOptionChanged: function _notifyOptionChanged(option, value, previousValue) {
      if (this._initialized) {
        var optionNames = [option].concat(this._options.getAliasesByName(option));
        for (var i = 0; i < optionNames.length; i++) {
          var name = optionNames[i];
          var args = {
            name: (0, _data.getPathParts)(name)[0],
            fullName: name,
            value: value,
            previousValue: previousValue
          };
          if (!isInnerOption(name)) {
            this._optionChangedCallbacks.fireWith(this, [(0, _extend.extend)(this._defaultActionArgs(), args)]);
            this._optionChangedAction((0, _extend.extend)({}, args));
          }
          if (!this._disposed && this._cancelOptionChange !== name) {
            this._optionChanged(args);
          }
        }
      }
    },
    initialOption: function initialOption(name) {
      return this._options.initial(name);
    },
    _defaultActionConfig: function _defaultActionConfig() {
      return {
        context: this,
        component: this
      };
    },
    _defaultActionArgs: function _defaultActionArgs() {
      return {
        component: this
      };
    },
    _createAction: function _createAction(actionSource, config) {
      var _this3 = this;
      var action;
      return function (e) {
        if (!(0, _type.isDefined)(e)) {
          e = {};
        }
        if (!(0, _type.isPlainObject)(e)) {
          e = {
            actionValue: e
          };
        }
        action = action || new _action.default(actionSource, (0, _extend.extend)(config, _this3._defaultActionConfig()));
        return action.execute.call(action, (0, _extend.extend)(e, _this3._defaultActionArgs()));
      };
    },
    _createActionByOption: function _createActionByOption(optionName, config) {
      var _this4 = this;
      var action;
      var eventName;
      var actionFunc;
      var result = function result() {
        if (!eventName) {
          config = config || {};
          if (typeof optionName !== 'string') {
            throw _errors.default.Error('E0008');
          }
          if (optionName.indexOf('on') === 0) {
            eventName = getEventName(optionName);
          }
          ///#DEBUG
          if (optionName.indexOf('on') !== 0) {
            throw Error("The '".concat(optionName, "' option name should start with 'on' prefix"));
          }
          ///#ENDDEBUG

          actionFunc = _this4.option(optionName);
        }
        if (!action && !actionFunc && !config.beforeExecute && !config.afterExecute && !_this4._eventsStrategy.hasEvent(eventName)) {
          return;
        }
        if (!action) {
          var beforeExecute = config.beforeExecute;
          config.beforeExecute = function () {
            for (var _len2 = arguments.length, props = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
              props[_key2] = arguments[_key2];
            }
            beforeExecute && beforeExecute.apply(_this4, props);
            _this4._eventsStrategy.fireEvent(eventName, props[0].args);
          };
          action = _this4._createAction(actionFunc, config);
        }
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        if ((0, _config.default)().wrapActionsBeforeExecute) {
          var beforeActionExecute = _this4.option('beforeActionExecute') || _common.noop;
          var wrappedAction = beforeActionExecute(_this4, action, config) || action;
          return wrappedAction.apply(_this4, args);
        }
        return action.apply(_this4, args);
      };
      if ((0, _config.default)().wrapActionsBeforeExecute) {
        return result;
      }
      var onActionCreated = this.option('onActionCreated') || _common.noop;
      return onActionCreated(this, result, config) || result;
    },
    on: function on(eventName, eventHandler) {
      this._eventsStrategy.on(eventName, eventHandler);
      return this;
    },
    off: function off(eventName, eventHandler) {
      this._eventsStrategy.off(eventName, eventHandler);
      return this;
    },
    hasActionSubscription: function hasActionSubscription(actionName) {
      return !!this._options.silent(actionName) || this._eventsStrategy.hasEvent(getEventName(actionName));
    },
    isOptionDeprecated: function isOptionDeprecated(name) {
      return this._options.isDeprecated(name);
    },
    _setOptionWithoutOptionChange: function _setOptionWithoutOptionChange(name, value) {
      this._cancelOptionChange = name;
      this.option(name, value);
      this._cancelOptionChange = false;
    },
    _getOptionValue: function _getOptionValue(name, context) {
      var value = this.option(name);
      if ((0, _type.isFunction)(value)) {
        return value.bind(context)();
      }
      return value;
    },
    option: function option() {
      var _this$_options;
      return (_this$_options = this._options).option.apply(_this$_options, arguments);
    },
    resetOption: function resetOption(name) {
      this.beginUpdate();
      this._options.reset(name);
      this.endUpdate();
    }
  });
  exports.Component = Component;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["./config","./utils/extend","./options/index","./options/utils","./class","./action","./errors","./utils/callbacks","./events_strategy","./utils/public_component","./postponed_operations","./utils/type","./utils/common","./utils/data"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("./config"), require("./utils/extend"), require("./options/index"), require("./options/utils"), require("./class"), require("./action"), require("./errors"), require("./utils/callbacks"), require("./events_strategy"), require("./utils/public_component"), require("./postponed_operations"), require("./utils/type"), require("./utils/common"), require("./utils/data"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=component.js.map
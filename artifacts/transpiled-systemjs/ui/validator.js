!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/validator.js"], ["../core/element_data","../core/utils/callbacks","./widget/ui.errors","../core/dom_component","../core/utils/extend","../core/utils/iterator","./validation_engine","./validation/default_adapter","../core/component_registrator","../core/utils/deferred","../core/guid"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/validator.js", ["../core/element_data", "../core/utils/callbacks", "./widget/ui.errors", "../core/dom_component", "../core/utils/extend", "../core/utils/iterator", "./validation_engine", "./validation/default_adapter", "../core/component_registrator", "../core/utils/deferred", "../core/guid"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _element_data = $__require("../core/element_data");
  var _callbacks = _interopRequireDefault($__require("../core/utils/callbacks"));
  var _ui = _interopRequireDefault($__require("./widget/ui.errors"));
  var _dom_component = _interopRequireDefault($__require("../core/dom_component"));
  var _extend = $__require("../core/utils/extend");
  var _iterator = $__require("../core/utils/iterator");
  var _validation_engine = _interopRequireDefault($__require("./validation_engine"));
  var _default_adapter = _interopRequireDefault($__require("./validation/default_adapter"));
  var _component_registrator = _interopRequireDefault($__require("../core/component_registrator"));
  var _deferred = $__require("../core/utils/deferred");
  var _guid = _interopRequireDefault($__require("../core/guid"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var VALIDATOR_CLASS = 'dx-validator';
  var VALIDATION_STATUS_VALID = 'valid';
  var VALIDATION_STATUS_INVALID = 'invalid';
  var VALIDATION_STATUS_PENDING = 'pending';
  var Validator = _dom_component.default.inherit({
    _initOptions: function _initOptions(options) {
      this.callBase.apply(this, arguments);
      this.option(_validation_engine.default.initValidationOptions(options));
    },
    _getDefaultOptions: function _getDefaultOptions() {
      return (0, _extend.extend)(this.callBase(), {
        validationRules: []
        /**
        * @name dxValidatorOptions.rtlEnabled
        * @hidden
        */

        /**
        * @name dxValidator.beginUpdate
        * @publicName beginUpdate()
        * @hidden
        */
        /**
        * @name dxValidator.defaultOptions
        * @publicName defaultOptions(rule)
        * @hidden
        */
        /**
        * @name dxValidator.endUpdate
        * @publicName endUpdate()
        * @hidden
        */
      });
    },
    _init: function _init() {
      this.callBase();
      this._initGroupRegistration();
      this.focused = (0, _callbacks.default)();
      this._initAdapter();
      this._validationInfo = {
        result: null,
        deferred: null,
        skipValidation: false
      };
    },
    _initGroupRegistration: function _initGroupRegistration() {
      var group = this._findGroup();
      if (!this._groupWasInit) {
        this.on('disposing', function (args) {
          _validation_engine.default.removeRegisteredValidator(args.component._validationGroup, args.component);
        });
      }
      if (!this._groupWasInit || this._validationGroup !== group) {
        _validation_engine.default.removeRegisteredValidator(this._validationGroup, this);
        this._groupWasInit = true;
        this._validationGroup = group;
        _validation_engine.default.registerValidatorInGroup(group, this);
      }
    },
    _setOptionsByReference: function _setOptionsByReference() {
      this.callBase();
      (0, _extend.extend)(this._optionsByReference, {
        validationGroup: true
      });
    },
    _getEditor: function _getEditor() {
      var element = this.$element()[0];
      return (0, _element_data.data)(element, 'dx-validation-target');
    },
    _initAdapter: function _initAdapter() {
      var _this = this;
      var dxStandardEditor = this._getEditor();
      var adapter = this.option('adapter');
      if (!adapter) {
        if (dxStandardEditor) {
          adapter = new _default_adapter.default(dxStandardEditor, this);
          adapter.validationRequestsCallbacks.push(function (args) {
            if (_this._validationInfo.skipValidation) {
              return;
            }
            _this.validate(args);
          });
          this.option('adapter', adapter);
          return;
        }
        throw _ui.default.Error('E0120');
      }
      var callbacks = adapter.validationRequestsCallbacks;
      if (callbacks) {
        callbacks.push(function (args) {
          _this.validate(args);
        });
      }
    },
    _toggleRTLDirection: function _toggleRTLDirection(isRtl) {
      var _this$option$editor$o, _this$option, _this$option$editor;
      var rtlEnabled = (_this$option$editor$o = (_this$option = this.option('adapter')) === null || _this$option === void 0 ? void 0 : (_this$option$editor = _this$option.editor) === null || _this$option$editor === void 0 ? void 0 : _this$option$editor.option('rtlEnabled')) !== null && _this$option$editor$o !== void 0 ? _this$option$editor$o : isRtl;
      this.callBase(rtlEnabled);
    },
    _initMarkup: function _initMarkup() {
      this.$element().addClass(VALIDATOR_CLASS);
      this.callBase();
    },
    _render: function _render() {
      this.callBase();
      this._toggleAccessibilityAttributes();
    },
    _toggleAccessibilityAttributes: function _toggleAccessibilityAttributes() {
      var dxStandardEditor = this._getEditor();
      if (dxStandardEditor) {
        var rules = this.option('validationRules') || [];
        var isRequired = rules.some(function (_ref) {
          var type = _ref.type;
          return type === 'required';
        }) || null;
        if (dxStandardEditor.isInitialized()) {
          dxStandardEditor.setAria('required', isRequired);
        }
        dxStandardEditor.option('_onMarkupRendered', function () {
          dxStandardEditor.setAria('required', isRequired);
        });
      }
    },
    _visibilityChanged: function _visibilityChanged(visible) {
      if (visible) {
        this._initGroupRegistration();
      }
    },
    _optionChanged: function _optionChanged(args) {
      switch (args.name) {
        case 'validationGroup':
          this._initGroupRegistration();
          return;
        case 'validationRules':
          this._resetValidationRules();
          this._toggleAccessibilityAttributes();
          this.option('isValid') !== undefined && this.validate();
          return;
        case 'adapter':
          this._initAdapter();
          break;
        case 'isValid':
        case 'validationStatus':
          this.option(_validation_engine.default.synchronizeValidationOptions(args, this.option()));
          break;
        default:
          this.callBase(args);
      }
    },
    _getValidationRules: function _getValidationRules() {
      var _this2 = this;
      if (!this._validationRules) {
        this._validationRules = (0, _iterator.map)(this.option('validationRules'), function (rule, index) {
          return (0, _extend.extend)({}, rule, {
            validator: _this2,
            index: index
          });
        });
      }
      return this._validationRules;
    },
    _findGroup: function _findGroup() {
      var $element = this.$element();
      return this.option('validationGroup') || _validation_engine.default.findGroup($element, this._modelByElement($element));
    },
    _resetValidationRules: function _resetValidationRules() {
      delete this._validationRules;
    },
    validate: function validate(args) {
      var _this3 = this;
      var adapter = this.option('adapter');
      var name = this.option('name');
      var bypass = adapter.bypass && adapter.bypass();
      var value = args && args.value !== undefined ? args.value : adapter.getValue();
      var currentError = adapter.getCurrentValidationError && adapter.getCurrentValidationError();
      var rules = this._getValidationRules();
      var currentResult = this._validationInfo && this._validationInfo.result;
      if (currentResult && currentResult.status === VALIDATION_STATUS_PENDING && currentResult.value === value) {
        return (0, _extend.extend)({}, currentResult);
      }
      var result;
      if (bypass) {
        result = {
          isValid: true,
          status: VALIDATION_STATUS_VALID
        };
      } else if (currentError && currentError.editorSpecific) {
        currentError.validator = this;
        result = {
          isValid: false,
          status: VALIDATION_STATUS_INVALID,
          brokenRule: currentError,
          brokenRules: [currentError]
        };
      } else {
        result = _validation_engine.default.validate(value, rules, name);
      }
      result.id = new _guid.default().toString();
      this._applyValidationResult(result, adapter);
      result.complete && result.complete.then(function (res) {
        if (res.id === _this3._validationInfo.result.id) {
          _this3._applyValidationResult(res, adapter);
        }
      });
      return (0, _extend.extend)({}, this._validationInfo.result);
    },
    reset: function reset() {
      var adapter = this.option('adapter');
      var result = {
        id: null,
        isValid: true,
        brokenRule: null,
        brokenRules: null,
        pendingRules: null,
        status: VALIDATION_STATUS_VALID,
        complete: null
      };
      this._validationInfo.skipValidation = true;
      adapter.reset();
      this._validationInfo.skipValidation = false;
      this._resetValidationRules();
      this._applyValidationResult(result, adapter);
    },
    _updateValidationResult: function _updateValidationResult(result) {
      if (!this._validationInfo.result || this._validationInfo.result.id !== result.id) {
        var complete = this._validationInfo.deferred && this._validationInfo.result.complete;
        this._validationInfo.result = (0, _extend.extend)({}, result, {
          complete: complete
        });
      } else {
        for (var prop in result) {
          if (prop !== 'id' && prop !== 'complete') {
            this._validationInfo.result[prop] = result[prop];
          }
        }
      }
    },
    _applyValidationResult: function _applyValidationResult(result, adapter) {
      var validatedAction = this._createActionByOption('onValidated', {
        excludeValidators: ['readOnly']
      });
      result.validator = this;
      this._updateValidationResult(result);
      adapter.applyValidationResults && adapter.applyValidationResults(this._validationInfo.result);
      this.option({
        validationStatus: this._validationInfo.result.status
      });
      if (this._validationInfo.result.status === VALIDATION_STATUS_PENDING) {
        if (!this._validationInfo.deferred) {
          this._validationInfo.deferred = new _deferred.Deferred();
          this._validationInfo.result.complete = this._validationInfo.deferred.promise();
        }
        this._eventsStrategy.fireEvent('validating', [this._validationInfo.result]);
        return;
      }
      if (this._validationInfo.result.status !== VALIDATION_STATUS_PENDING) {
        validatedAction(result);
        if (this._validationInfo.deferred) {
          this._validationInfo.deferred.resolve(result);
          this._validationInfo.deferred = null;
        }
      }
    },
    focus: function focus() {
      var adapter = this.option('adapter');
      adapter && adapter.focus && adapter.focus();
    },
    _useTemplates: function _useTemplates() {
      return false;
    }
  });
  (0, _component_registrator.default)('dxValidator', Validator);
  var _default = Validator;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../core/element_data","../core/utils/callbacks","./widget/ui.errors","../core/dom_component","../core/utils/extend","../core/utils/iterator","./validation_engine","./validation/default_adapter","../core/component_registrator","../core/utils/deferred","../core/guid"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../core/element_data"), require("../core/utils/callbacks"), require("./widget/ui.errors"), require("../core/dom_component"), require("../core/utils/extend"), require("../core/utils/iterator"), require("./validation_engine"), require("./validation/default_adapter"), require("../core/component_registrator"), require("../core/utils/deferred"), require("../core/guid"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=validator.js.map
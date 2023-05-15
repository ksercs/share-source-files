!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/renovation/component_wrapper/editors/editor.js"], ["../../../core/utils/type","../common/component","../../../ui/validation_engine","../../../core/utils/extend","../../../core/renderer","../../../core/element_data","../../../core/utils/callbacks","../../../ui/editor/editor","../../utils/dom"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/renovation/component_wrapper/editors/editor.js", ["../../../core/utils/type", "../common/component", "../../../ui/validation_engine", "../../../core/utils/extend", "../../../core/renderer", "../../../core/element_data", "../../../core/utils/callbacks", "../../../ui/editor/editor", "../../utils/dom"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _type = $__require("../../../core/utils/type");
  var _component = _interopRequireDefault($__require("../common/component"));
  var _validation_engine = _interopRequireDefault($__require("../../../ui/validation_engine"));
  var _extend = $__require("../../../core/utils/extend");
  var _renderer = _interopRequireDefault($__require("../../../core/renderer"));
  var _element_data = $__require("../../../core/element_data");
  var _callbacks = _interopRequireDefault($__require("../../../core/utils/callbacks"));
  var _editor = _interopRequireDefault($__require("../../../ui/editor/editor"));
  var _dom = $__require("../../utils/dom");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);subClass.prototype.constructor = subClass;_setPrototypeOf(subClass, superClass);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;return o;
    };return _setPrototypeOf(o, p);
  }
  var INVALID_MESSAGE_AUTO = 'dx-invalid-message-auto';
  var VALIDATION_TARGET = 'dx-validation-target';
  var Editor = /*#__PURE__*/function (_Component) {
    _inheritsLoose(Editor, _Component);
    function Editor() {
      return _Component.apply(this, arguments) || this;
    }
    var _proto = Editor.prototype;
    _proto.getProps = function getProps() {
      var _this = this;
      var props = _Component.prototype.getProps.call(this);
      props.onFocusIn = function () {
        var isValidationMessageShownOnFocus = _this.option('validationMessageMode') === 'auto';
        if (isValidationMessageShownOnFocus) {
          var $validationMessageWrapper = (0, _renderer.default)((0, _dom.querySelectorInSameDocument)(_this.element(), '.dx-invalid-message.dx-overlay-wrapper'));
          $validationMessageWrapper === null || $validationMessageWrapper === void 0 ? void 0 : $validationMessageWrapper.removeClass(INVALID_MESSAGE_AUTO);
          var timeToWaitBeforeShow = 150;
          if (_this.showValidationMessageTimeout) {
            clearTimeout(_this.showValidationMessageTimeout);
          }
          _this.showValidationMessageTimeout = setTimeout(function () {
            $validationMessageWrapper === null || $validationMessageWrapper === void 0 ? void 0 : $validationMessageWrapper.addClass(INVALID_MESSAGE_AUTO);
          }, timeToWaitBeforeShow);
        }
      };
      props.saveValueChangeEvent = function (e) {
        _this._valueChangeEventInstance = e;
      };
      return props;
    };
    _proto._createElement = function _createElement(element) {
      _Component.prototype._createElement.call(this, element);
      this.showValidationMessageTimeout = undefined;
      this.validationRequest = (0, _callbacks.default)();
      (0, _element_data.data)(this.$element()[0], VALIDATION_TARGET, this);
    };
    _proto._render = function _render() {
      var _this$option;
      (_this$option = this.option('_onMarkupRendered')) === null || _this$option === void 0 ? void 0 : _this$option();
    };
    _proto._initializeComponent = function _initializeComponent() {
      _Component.prototype._initializeComponent.call(this);
      this._valueChangeAction = this._createActionByOption('onValueChanged', {
        excludeValidators: ['disabled', 'readOnly']
      });
    };
    _proto._initOptions = function _initOptions(options) {
      _Component.prototype._initOptions.call(this, options);
      this.option(_validation_engine.default.initValidationOptions(options));
    };
    _proto._getDefaultOptions = function _getDefaultOptions() {
      return (0, _extend.extend)(_Component.prototype._getDefaultOptions.call(this), {
        validationMessageOffset: {
          h: 0,
          v: 0
        },
        validationTooltipOptions: {}
      });
    };
    _proto._bindInnerWidgetOptions = function _bindInnerWidgetOptions(innerWidget, optionsContainer) {
      var _this2 = this;
      var innerWidgetOptions = (0, _extend.extend)({}, innerWidget.option());
      var syncOptions = function syncOptions() {
        return _this2._silent(optionsContainer, innerWidgetOptions);
      };
      syncOptions();
      innerWidget.on('optionChanged', syncOptions);
    };
    _proto._raiseValidation = function _raiseValidation(value, previousValue) {
      var areValuesEmpty = !(0, _type.isDefined)(value) && !(0, _type.isDefined)(previousValue);
      if (value !== previousValue && !areValuesEmpty) {
        this.validationRequest.fire({
          value: value,
          editor: this
        });
      }
    };
    _proto._raiseValueChangeAction = function _raiseValueChangeAction(value, previousValue) {
      var _this$_valueChangeAct;
      (_this$_valueChangeAct = this._valueChangeAction) === null || _this$_valueChangeAct === void 0 ? void 0 : _this$_valueChangeAct.call(this, {
        element: this.$element(),
        previousValue: previousValue,
        value: value,
        event: this._valueChangeEventInstance
      });
      this._valueChangeEventInstance = undefined;
    };
    _proto._optionChanged = function _optionChanged(option) {
      var name = option.name,
          previousValue = option.previousValue,
          value = option.value;
      if (name && this._getActionConfigs()[name] !== undefined) {
        this._addAction(name);
      }
      switch (name) {
        case 'value':
          this._raiseValidation(value, previousValue);
          this._raiseValueChangeAction(value, previousValue);
          break;
        case 'onValueChanged':
          this._valueChangeAction = this._createActionByOption('onValueChanged', {
            excludeValidators: ['disabled', 'readOnly']
          });
          break;
        case 'isValid':
        case 'validationError':
        case 'validationErrors':
        case 'validationStatus':
          this.option(_validation_engine.default.synchronizeValidationOptions(option, this.option()));
          break;
        default:
          break;
      }
      _Component.prototype._optionChanged.call(this, option);
    };
    _proto.reset = function reset() {
      var _this$_getDefaultOpti = this._getDefaultOptions(),
          value = _this$_getDefaultOpti.value;
      this.option({
        value: value
      });
    };
    _proto._dispose = function _dispose() {
      _Component.prototype._dispose.call(this);
      (0, _element_data.data)(this.element(), VALIDATION_TARGET, null);
      if (this.showValidationMessageTimeout) {
        clearTimeout(this.showValidationMessageTimeout);
      }
    };
    return Editor;
  }(_component.default);
  exports.default = Editor;
  var prevIsEditor = _editor.default.isEditor;
  var newIsEditor = function newIsEditor(instance) {
    return prevIsEditor(instance) || instance instanceof Editor;
  };
  Editor.isEditor = newIsEditor;
  _editor.default.isEditor = newIsEditor;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../core/utils/type","../common/component","../../../ui/validation_engine","../../../core/utils/extend","../../../core/renderer","../../../core/element_data","../../../core/utils/callbacks","../../../ui/editor/editor","../../utils/dom"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../core/utils/type"), require("../common/component"), require("../../../ui/validation_engine"), require("../../../core/utils/extend"), require("../../../core/renderer"), require("../../../core/element_data"), require("../../../core/utils/callbacks"), require("../../../ui/editor/editor"), require("../../utils/dom"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=editor.js.map
!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/editor/editor.js"], ["../../core/renderer","../../core/element_data","../../core/utils/callbacks","../../core/utils/window","../../events/utils/index","../../core/utils/extend","../widget/ui.widget","../validation_engine","../../events/core/events_engine","../validation_message","../../core/guid","../../core/utils/common","../../core/utils/dom"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/editor/editor.js", ["../../core/renderer", "../../core/element_data", "../../core/utils/callbacks", "../../core/utils/window", "../../events/utils/index", "../../core/utils/extend", "../widget/ui.widget", "../validation_engine", "../../events/core/events_engine", "../validation_message", "../../core/guid", "../../core/utils/common", "../../core/utils/dom"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _element_data = $__require("../../core/element_data");
  var _callbacks = _interopRequireDefault($__require("../../core/utils/callbacks"));
  var _window = $__require("../../core/utils/window");
  var _index = $__require("../../events/utils/index");
  var _extend = $__require("../../core/utils/extend");
  var _ui = _interopRequireDefault($__require("../widget/ui.widget"));
  var _validation_engine = _interopRequireDefault($__require("../validation_engine"));
  var _events_engine = _interopRequireDefault($__require("../../events/core/events_engine"));
  var _validation_message = _interopRequireDefault($__require("../validation_message"));
  var _guid = _interopRequireDefault($__require("../../core/guid"));
  var _common = $__require("../../core/utils/common");
  var _dom = $__require("../../core/utils/dom");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var INVALID_MESSAGE_AUTO = 'dx-invalid-message-auto';
  var READONLY_STATE_CLASS = 'dx-state-readonly';
  var INVALID_CLASS = 'dx-invalid';
  var DX_INVALID_BADGE_CLASS = 'dx-show-invalid-badge';
  var VALIDATION_TARGET = 'dx-validation-target';
  var VALIDATION_STATUS_VALID = 'valid';
  var VALIDATION_STATUS_INVALID = 'invalid';
  var READONLY_NAMESPACE = 'editorReadOnly';
  var ALLOWED_STYLING_MODES = ['outlined', 'filled', 'underlined'];
  var VALIDATION_MESSAGE_KEYS_MAP = {
    validationMessageMode: 'mode',
    validationMessagePosition: 'positionSide',
    validationMessageOffset: 'offset',
    validationBoundary: 'boundary'
  };
  var Editor = _ui.default.inherit({
    ctor: function ctor() {
      this.showValidationMessageTimeout = null;
      this.validationRequest = (0, _callbacks.default)();
      this.callBase.apply(this, arguments);
    },
    _createElement: function _createElement(element) {
      this.callBase(element);
      var $element = this.$element();
      if ($element) {
        (0, _element_data.data)($element[0], VALIDATION_TARGET, this);
      }
    },
    _initOptions: function _initOptions(options) {
      this.callBase.apply(this, arguments);
      this.option(_validation_engine.default.initValidationOptions(options));
    },
    _init: function _init() {
      this.callBase();
      this._options.cache('validationTooltipOptions', this.option('validationTooltipOptions'));
      var $element = this.$element();
      $element.addClass(DX_INVALID_BADGE_CLASS);
    },
    _getDefaultOptions: function _getDefaultOptions() {
      return (0, _extend.extend)(this.callBase(), {
        value: null,
        /**
        * @name EditorOptions.name
        * @type string
        * @default ""
        * @hidden
        */
        name: '',
        onValueChanged: null,
        readOnly: false,
        isValid: true,
        validationError: null,
        validationErrors: null,
        validationStatus: VALIDATION_STATUS_VALID,
        validationMessageMode: 'auto',
        validationMessagePosition: 'bottom',
        validationBoundary: undefined,
        validationMessageOffset: {
          h: 0,
          v: 0
        },
        validationTooltipOptions: {},
        _showValidationMessage: true
      });
    },
    _attachKeyboardEvents: function _attachKeyboardEvents() {
      if (!this.option('readOnly')) {
        this.callBase();
      }
    },
    _setOptionsByReference: function _setOptionsByReference() {
      this.callBase();
      (0, _extend.extend)(this._optionsByReference, {
        validationError: true
      });
    },
    _createValueChangeAction: function _createValueChangeAction() {
      this._valueChangeAction = this._createActionByOption('onValueChanged', {
        excludeValidators: ['disabled', 'readOnly']
      });
    },
    _suppressValueChangeAction: function _suppressValueChangeAction() {
      this._valueChangeActionSuppressed = true;
    },
    _resumeValueChangeAction: function _resumeValueChangeAction() {
      this._valueChangeActionSuppressed = false;
    },
    _initMarkup: function _initMarkup() {
      var _this$option;
      this._toggleReadOnlyState();
      this._setSubmitElementName(this.option('name'));
      this.callBase();
      this._renderValidationState();
      (_this$option = this.option('_onMarkupRendered')) === null || _this$option === void 0 ? void 0 : _this$option();
    },
    _raiseValueChangeAction: function _raiseValueChangeAction(value, previousValue) {
      if (!this._valueChangeAction) {
        this._createValueChangeAction();
      }
      this._valueChangeAction(this._valueChangeArgs(value, previousValue));
    },
    _valueChangeArgs: function _valueChangeArgs(value, previousValue) {
      return {
        value: value,
        previousValue: previousValue,
        event: this._valueChangeEventInstance
      };
    },
    _saveValueChangeEvent: function _saveValueChangeEvent(e) {
      this._valueChangeEventInstance = e;
    },
    _focusInHandler: function _focusInHandler(e) {
      var isValidationMessageShownOnFocus = this.option('validationMessageMode') === 'auto';

      // NOTE: The click should be processed before the validation message is shown because
      // it can change the editor's value
      if (this._canValueBeChangedByClick() && isValidationMessageShownOnFocus) {
        var _this$_validationMess;
        // NOTE: Prevent the validation message from showing
        var $validationMessageWrapper = (_this$_validationMess = this._validationMessage) === null || _this$_validationMess === void 0 ? void 0 : _this$_validationMess.$wrapper();
        $validationMessageWrapper === null || $validationMessageWrapper === void 0 ? void 0 : $validationMessageWrapper.removeClass(INVALID_MESSAGE_AUTO);
        clearTimeout(this.showValidationMessageTimeout);

        // NOTE: Show the validation message after a click changes the value
        this.showValidationMessageTimeout = setTimeout(function () {
          return $validationMessageWrapper === null || $validationMessageWrapper === void 0 ? void 0 : $validationMessageWrapper.addClass(INVALID_MESSAGE_AUTO);
        }, 150);
      }
      return this.callBase(e);
    },
    _canValueBeChangedByClick: function _canValueBeChangedByClick() {
      return false;
    },
    _getStylingModePrefix: function _getStylingModePrefix() {
      return 'dx-editor-';
    },
    _renderStylingMode: function _renderStylingMode() {
      var _this = this;
      var optionName = 'stylingMode';
      var optionValue = this.option(optionName);
      var prefix = this._getStylingModePrefix();
      var allowedStylingClasses = ALLOWED_STYLING_MODES.map(function (mode) {
        return prefix + mode;
      });
      allowedStylingClasses.forEach(function (className) {
        return _this.$element().removeClass(className);
      });
      var stylingModeClass = prefix + optionValue;
      if (allowedStylingClasses.indexOf(stylingModeClass) === -1) {
        var defaultOptionValue = this._getDefaultOptions()[optionName];
        var platformOptionValue = this._convertRulesToOptions(this._defaultOptionsRules())[optionName];
        stylingModeClass = prefix + (platformOptionValue || defaultOptionValue);
      }
      this.$element().addClass(stylingModeClass);
    },
    _getValidationErrors: function _getValidationErrors() {
      var validationErrors = this.option('validationErrors');
      if (!validationErrors && this.option('validationError')) {
        validationErrors = [this.option('validationError')];
      }
      return validationErrors;
    },
    _disposeValidationMessage: function _disposeValidationMessage() {
      if (this._$validationMessage) {
        this._$validationMessage.remove();
        this.setAria('describedby', null);
        this._$validationMessage = undefined;
        this._validationMessage = undefined;
      }
    },
    _toggleValidationClasses: function _toggleValidationClasses(isInvalid) {
      this.$element().toggleClass(INVALID_CLASS, isInvalid);
      this.setAria(VALIDATION_STATUS_INVALID, isInvalid || undefined);
    },
    _renderValidationState: function _renderValidationState() {
      var isValid = this.option('isValid') && this.option('validationStatus') !== VALIDATION_STATUS_INVALID;
      var validationErrors = this._getValidationErrors();
      var $element = this.$element();
      this._toggleValidationClasses(!isValid);
      if (!(0, _window.hasWindow)() || this.option('_showValidationMessage') === false) {
        return;
      }
      this._disposeValidationMessage();
      if (!isValid && validationErrors) {
        var _this$option2 = this.option(),
            validationMessageMode = _this$option2.validationMessageMode,
            validationMessageOffset = _this$option2.validationMessageOffset,
            validationBoundary = _this$option2.validationBoundary,
            rtlEnabled = _this$option2.rtlEnabled;
        this._$validationMessage = (0, _renderer.default)('<div>').appendTo($element);
        var validationMessageContentId = "dx-".concat(new _guid.default());
        this.setAria('describedby', validationMessageContentId);
        this._validationMessage = new _validation_message.default(this._$validationMessage, (0, _extend.extend)({
          validationErrors: validationErrors,
          rtlEnabled: rtlEnabled,
          target: this._getValidationMessageTarget(),
          visualContainer: $element,
          mode: validationMessageMode,
          positionSide: this._getValidationMessagePosition(),
          offset: validationMessageOffset,
          boundary: validationBoundary,
          contentId: validationMessageContentId
        }, this._options.cache('validationTooltipOptions')));
        this._bindInnerWidgetOptions(this._validationMessage, 'validationTooltipOptions');
      }
    },
    _getValidationMessagePosition: function _getValidationMessagePosition() {
      return this.option('validationMessagePosition');
    },
    _getValidationMessageTarget: function _getValidationMessageTarget() {
      return this.$element();
    },
    _toggleReadOnlyState: function _toggleReadOnlyState() {
      var readOnly = this.option('readOnly');
      this._toggleBackspaceHandler(readOnly);
      this.$element().toggleClass(READONLY_STATE_CLASS, !!readOnly);
      this.setAria('readonly', readOnly || undefined);
    },
    _toggleBackspaceHandler: function _toggleBackspaceHandler(isReadOnly) {
      var $eventTarget = this._keyboardEventBindingTarget();
      var eventName = (0, _index.addNamespace)('keydown', READONLY_NAMESPACE);
      _events_engine.default.off($eventTarget, eventName);
      if (isReadOnly) {
        _events_engine.default.on($eventTarget, eventName, function (e) {
          if ((0, _index.normalizeKeyName)(e) === 'backspace') {
            e.preventDefault();
          }
        });
      }
    },
    _dispose: function _dispose() {
      var element = this.$element()[0];
      (0, _element_data.data)(element, VALIDATION_TARGET, null);
      clearTimeout(this.showValidationMessageTimeout);
      this._disposeValidationMessage();
      this.callBase();
    },
    _setSubmitElementName: function _setSubmitElementName(name) {
      var $submitElement = this._getSubmitElement();
      if (!$submitElement) {
        return;
      }
      if (name.length > 0) {
        $submitElement.attr('name', name);
      } else {
        $submitElement.removeAttr('name');
      }
    },
    _getSubmitElement: function _getSubmitElement() {
      return null;
    },
    _setValidationMessageOption: function _setValidationMessageOption(_ref) {
      var _this$_validationMess2;
      var name = _ref.name,
          value = _ref.value;
      var optionKey = VALIDATION_MESSAGE_KEYS_MAP[name] ? VALIDATION_MESSAGE_KEYS_MAP[name] : name;
      (_this$_validationMess2 = this._validationMessage) === null || _this$_validationMess2 === void 0 ? void 0 : _this$_validationMess2.option(optionKey, value);
    },
    _hasActiveElement: _common.noop,
    _optionChanged: function _optionChanged(args) {
      var _this$_validationMess3;
      switch (args.name) {
        case 'onValueChanged':
          this._createValueChangeAction();
          break;
        case 'readOnly':
          this._toggleReadOnlyState();
          this._refreshFocusState();
          break;
        case 'value':
          if (args.value != args.previousValue) {
            // eslint-disable-line eqeqeq
            this.validationRequest.fire({
              value: args.value,
              editor: this
            });
          }
          if (!this._valueChangeActionSuppressed) {
            this._raiseValueChangeAction(args.value, args.previousValue);
            this._saveValueChangeEvent(undefined);
          }
          break;
        case 'width':
          this.callBase(args);
          (_this$_validationMess3 = this._validationMessage) === null || _this$_validationMess3 === void 0 ? void 0 : _this$_validationMess3.updateMaxWidth();
          break;
        case 'name':
          this._setSubmitElementName(args.value);
          break;
        case 'isValid':
        case 'validationError':
        case 'validationErrors':
        case 'validationStatus':
          this.option(_validation_engine.default.synchronizeValidationOptions(args, this.option()));
          this._renderValidationState();
          break;
        case 'validationBoundary':
        case 'validationMessageMode':
        case 'validationMessagePosition':
        case 'validationMessageOffset':
          this._setValidationMessageOption(args);
          break;
        case 'rtlEnabled':
          this._setValidationMessageOption(args);
          this.callBase(args);
          break;
        case 'validationTooltipOptions':
          this._innerWidgetOptionChanged(this._validationMessage, args);
          break;
        case '_showValidationMessage':
          break;
        default:
          this.callBase(args);
      }
    },
    blur: function blur() {
      if (this._hasActiveElement()) {
        (0, _dom.resetActiveElement)();
      }
    },
    reset: function reset() {
      var defaultOptions = this._getDefaultOptions();
      this.option('value', defaultOptions.value);
    }
  });
  Editor.isEditor = function (instance) {
    return instance instanceof Editor;
  };
  var _default = Editor;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/renderer","../../core/element_data","../../core/utils/callbacks","../../core/utils/window","../../events/utils/index","../../core/utils/extend","../widget/ui.widget","../validation_engine","../../events/core/events_engine","../validation_message","../../core/guid","../../core/utils/common","../../core/utils/dom"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/renderer"), require("../../core/element_data"), require("../../core/utils/callbacks"), require("../../core/utils/window"), require("../../events/utils/index"), require("../../core/utils/extend"), require("../widget/ui.widget"), require("../validation_engine"), require("../../events/core/events_engine"), require("../validation_message"), require("../../core/guid"), require("../../core/utils/common"), require("../../core/utils/dom"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=editor.js.map
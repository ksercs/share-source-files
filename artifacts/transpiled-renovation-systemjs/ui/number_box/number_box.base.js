!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/number_box/number_box.base.js"], ["../../core/renderer","../../core/dom_adapter","../../events/core/events_engine","../../core/utils/common","../../core/utils/type","../../core/utils/math","../../core/utils/extend","../../core/devices","../../core/utils/browser","../text_box/ui.text_editor","../../events/utils/index","./number_box.spins","../../localization/message","../../core/utils/deferred"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/number_box/number_box.base.js", ["../../core/renderer", "../../core/dom_adapter", "../../events/core/events_engine", "../../core/utils/common", "../../core/utils/type", "../../core/utils/math", "../../core/utils/extend", "../../core/devices", "../../core/utils/browser", "../text_box/ui.text_editor", "../../events/utils/index", "./number_box.spins", "../../localization/message", "../../core/utils/deferred"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _dom_adapter = _interopRequireDefault($__require("../../core/dom_adapter"));
  var _events_engine = _interopRequireDefault($__require("../../events/core/events_engine"));
  var _common = $__require("../../core/utils/common");
  var _type = $__require("../../core/utils/type");
  var _math = $__require("../../core/utils/math");
  var _extend = $__require("../../core/utils/extend");
  var _devices = _interopRequireDefault($__require("../../core/devices"));
  var _browser = _interopRequireDefault($__require("../../core/utils/browser"));
  var _ui = _interopRequireDefault($__require("../text_box/ui.text_editor"));
  var _index = $__require("../../events/utils/index");
  var _number_box = _interopRequireDefault($__require("./number_box.spins"));
  var _message = _interopRequireDefault($__require("../../localization/message"));
  var _deferred = $__require("../../core/utils/deferred");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var math = Math;
  var WIDGET_CLASS = 'dx-numberbox';
  var FIREFOX_CONTROL_KEYS = ['tab', 'del', 'backspace', 'leftArrow', 'rightArrow', 'home', 'end', 'enter'];
  var FORCE_VALUECHANGE_EVENT_NAMESPACE = 'NumberBoxForceValueChange';
  var NumberBoxBase = _ui.default.inherit({
    _supportedKeys: function _supportedKeys() {
      return (0, _extend.extend)(this.callBase(), {
        upArrow: function upArrow(e) {
          if (!(0, _index.isCommandKeyPressed)(e)) {
            e.preventDefault();
            e.stopPropagation();
            this._spinUpChangeHandler(e);
          }
        },
        downArrow: function downArrow(e) {
          if (!(0, _index.isCommandKeyPressed)(e)) {
            e.preventDefault();
            e.stopPropagation();
            this._spinDownChangeHandler(e);
          }
        },
        enter: function enter() {}
      });
    },
    _getDefaultOptions: function _getDefaultOptions() {
      return (0, _extend.extend)(this.callBase(), {
        value: 0,
        min: undefined,
        max: undefined,
        step: 1,
        showSpinButtons: false,
        useLargeSpinButtons: true,
        mode: 'text',
        invalidValueMessage: _message.default.format('dxNumberBox-invalidValueMessage'),
        buttons: void 0

        /**
         * @name dxNumberBoxOptions.mask
         * @hidden
         */

        /**
         * @name dxNumberBoxOptions.maskChar
         * @hidden
         */

        /**
         * @name dxNumberBoxOptions.maskRules
         * @hidden
         */

        /**
         * @name dxNumberBoxOptions.maskInvalidMessage
         * @hidden
         */

        /**
         * @name dxNumberBoxOptions.useMaskedValue
         * @hidden
         */

        /**
         * @name dxNumberBoxOptions.showMaskMode
         * @hidden
         */

        /**
         * @name dxNumberBoxOptions.spellcheck
         * @hidden
         */
      });
    },

    _useTemplates: function _useTemplates() {
      return false;
    },
    _getDefaultButtons: function _getDefaultButtons() {
      return this.callBase().concat([{
        name: 'spins',
        Ctor: _number_box.default
      }]);
    },
    _isSupportInputMode: function _isSupportInputMode() {
      var version = parseFloat(_browser.default.version);
      return _browser.default.chrome && version >= 66 || _browser.default.safari && version >= 12;
    },
    _defaultOptionsRules: function _defaultOptionsRules() {
      return this.callBase().concat([{
        device: function device() {
          return _devices.default.real().generic && !_devices.default.isSimulator();
        },
        options: {
          useLargeSpinButtons: false
        }
      }, {
        device: function () {
          return _devices.default.real().deviceType !== 'desktop' && !this._isSupportInputMode();
        }.bind(this),
        options: {
          mode: 'number'
        }
      }]);
    },
    _initMarkup: function _initMarkup() {
      this._renderSubmitElement();
      this.$element().addClass(WIDGET_CLASS);
      this.callBase();
    },
    _getDefaultAttributes: function _getDefaultAttributes() {
      var attributes = this.callBase();
      attributes['inputmode'] = 'decimal';
      return attributes;
    },
    _renderContentImpl: function _renderContentImpl() {
      this.option('isValid') && this._validateValue(this.option('value'));
      this.setAria('role', 'spinbutton');
    },
    _renderSubmitElement: function _renderSubmitElement() {
      this._$submitElement = (0, _renderer.default)('<input>').attr('type', 'hidden').appendTo(this.$element());
      this._setSubmitValue(this.option('value'));
    },
    _setSubmitValue: function _setSubmitValue(value) {
      this._getSubmitElement().val((0, _common.applyServerDecimalSeparator)(value));
    },
    _getSubmitElement: function _getSubmitElement() {
      return this._$submitElement;
    },
    _keyPressHandler: function _keyPressHandler(e) {
      this.callBase(e);
      var char = (0, _index.getChar)(e);
      var validCharRegExp = /[\d.,eE\-+]/;
      var isInputCharValid = validCharRegExp.test(char);
      if (!isInputCharValid) {
        var keyName = (0, _index.normalizeKeyName)(e);
        // NOTE: Additional check for Firefox control keys
        if ((0, _index.isCommandKeyPressed)(e) || keyName && FIREFOX_CONTROL_KEYS.includes(keyName)) {
          return;
        }
        e.preventDefault();
        return false;
      }
      this._keyPressed = true;
    },
    _onMouseWheel: function _onMouseWheel(dxEvent) {
      dxEvent.delta > 0 ? this._spinValueChange(1, dxEvent) : this._spinValueChange(-1, dxEvent);
    },
    _renderValue: function _renderValue() {
      var inputValue = this._input().val();
      var value = this.option('value');
      if (!inputValue.length || Number(inputValue) !== value) {
        this._forceValueRender();
        this._toggleEmptinessEventHandler();
      }
      var valueText = (0, _type.isDefined)(value) ? null : _message.default.format('dxNumberBox-noDataText');
      this.setAria({
        'valuenow': (0, _common.ensureDefined)(value, ''),
        'valuetext': valueText
      });
      this.option('text', this._input().val());
      this._updateButtons();
      return new _deferred.Deferred().resolve();
    },
    _forceValueRender: function _forceValueRender() {
      var value = this.option('value');
      var number = Number(value);
      var formattedValue = isNaN(number) ? '' : this._applyDisplayValueFormatter(value);
      this._renderDisplayText(formattedValue);
    },
    _applyDisplayValueFormatter: function _applyDisplayValueFormatter(value) {
      return this.option('displayValueFormatter')(value);
    },
    _renderProps: function _renderProps() {
      this._input().prop({
        'min': this.option('min'),
        'max': this.option('max'),
        'step': this.option('step')
      });
      this.setAria({
        'valuemin': (0, _common.ensureDefined)(this.option('min'), ''),
        'valuemax': (0, _common.ensureDefined)(this.option('max'), '')
      });
    },
    _spinButtonsPointerDownHandler: function _spinButtonsPointerDownHandler() {
      var $input = this._input();
      if (!this.option('useLargeSpinButtons') && _dom_adapter.default.getActiveElement() !== $input[0]) {
        _events_engine.default.trigger($input, 'focus');
      }
    },
    _spinUpChangeHandler: function _spinUpChangeHandler(e) {
      if (!this.option('readOnly')) {
        this._spinValueChange(1, e.event || e);
      }
    },
    _spinDownChangeHandler: function _spinDownChangeHandler(e) {
      if (!this.option('readOnly')) {
        this._spinValueChange(-1, e.event || e);
      }
    },
    _spinValueChange: function _spinValueChange(sign, dxEvent) {
      var step = parseFloat(this.option('step'));
      if (step === 0) {
        return;
      }
      var value = parseFloat(this._normalizeInputValue()) || 0;
      value = this._correctRounding(value, step * sign);
      var min = this.option('min');
      var max = this.option('max');
      if ((0, _type.isDefined)(min)) {
        value = Math.max(min, value);
      }
      if ((0, _type.isDefined)(max)) {
        value = Math.min(max, value);
      }
      this._saveValueChangeEvent(dxEvent);
      this.option('value', value);
    },
    _correctRounding: function _correctRounding(value, step) {
      var regex = /[,.](.*)/;
      var isFloatValue = regex.test(value);
      var isFloatStep = regex.test(step);
      if (isFloatValue || isFloatStep) {
        var valueAccuracy = isFloatValue ? regex.exec(value)[0].length : 0;
        var stepAccuracy = isFloatStep ? regex.exec(step)[0].length : 0;
        var accuracy = math.max(valueAccuracy, stepAccuracy);
        value = this._round(value + step, accuracy);
        return value;
      }
      return value + step;
    },
    _round: function _round(value, precision) {
      precision = precision || 0;
      var multiplier = Math.pow(10, precision);
      value *= multiplier;
      value = Math.round(value) / multiplier;
      return value;
    },
    _renderValueChangeEvent: function _renderValueChangeEvent() {
      this.callBase();
      var forceValueChangeEvent = (0, _index.addNamespace)('focusout', FORCE_VALUECHANGE_EVENT_NAMESPACE);
      _events_engine.default.off(this.element(), forceValueChangeEvent);
      _events_engine.default.on(this.element(), forceValueChangeEvent, this._forceRefreshInputValue.bind(this));
    },
    _forceRefreshInputValue: function _forceRefreshInputValue() {
      if (this.option('mode') === 'number') {
        return;
      }
      var $input = this._input();
      var formattedValue = this._applyDisplayValueFormatter(this.option('value'));
      $input.val(null);
      $input.val(formattedValue);
    },
    _valueChangeEventHandler: function _valueChangeEventHandler(e) {
      var $input = this._input();
      var inputValue = this._normalizeText();
      var value = this._parseValue(inputValue);
      var valueHasDigits = inputValue !== '.' && inputValue !== '-';
      if (this._isValueValid() && !this._validateValue(value)) {
        $input.val(this._applyDisplayValueFormatter(value));
        return;
      }
      if (valueHasDigits) {
        this.callBase(e, isNaN(value) ? null : value);
      }
      this._applyValueBoundaries(inputValue, value);
      this.validationRequest.fire({
        value: value,
        editor: this
      });
    },
    _applyValueBoundaries: function _applyValueBoundaries(inputValue, parsedValue) {
      var isValueIncomplete = this._isValueIncomplete(inputValue);
      var isValueCorrect = this._isValueInRange(inputValue);
      if (!isValueIncomplete && !isValueCorrect && parsedValue !== null) {
        if (Number(inputValue) !== parsedValue) {
          this._input().val(this._applyDisplayValueFormatter(parsedValue));
        }
      }
    },
    _replaceCommaWithPoint: function _replaceCommaWithPoint(value) {
      return value.replace(',', '.');
    },
    _inputIsInvalid: function _inputIsInvalid() {
      var isNumberMode = this.option('mode') === 'number';
      var validityState = this._input().get(0).validity;
      return isNumberMode && validityState && validityState.badInput;
    },
    _renderDisplayText: function _renderDisplayText(text) {
      if (this._inputIsInvalid()) {
        return;
      }
      this.callBase(text);
    },
    _isValueIncomplete: function _isValueIncomplete(value) {
      var incompleteRegex = /(^-$)|(^-?\d*\.$)|(\d+e-?$)/i;
      return incompleteRegex.test(value);
    },
    _isValueInRange: function _isValueInRange(value) {
      return (0, _math.inRange)(value, this.option('min'), this.option('max'));
    },
    _isNumber: function _isNumber(value) {
      return this._parseValue(value) !== null;
    },
    _validateValue: function _validateValue(value) {
      var inputValue = this._normalizeText();
      var isValueValid = this._isValueValid();
      var isValid = true;
      var isNumber = this._isNumber(inputValue);
      if (isNaN(Number(value))) {
        isValid = false;
      }
      if (!value && isValueValid) {
        isValid = true;
      } else if (!isNumber && !isValueValid) {
        isValid = false;
      }
      this.option({
        isValid: isValid,
        validationError: isValid ? null : {
          editorSpecific: true,
          message: this.option('invalidValueMessage')
        }
      });
      return isValid;
    },
    _normalizeInputValue: function _normalizeInputValue() {
      return this._parseValue(this._normalizeText());
    },
    _normalizeText: function _normalizeText() {
      var value = this._input().val().trim();
      return this._replaceCommaWithPoint(value);
    },
    _parseValue: function _parseValue(value) {
      var number = parseFloat(value);
      if (isNaN(number)) {
        return null;
      }
      return (0, _math.fitIntoRange)(number, this.option('min'), this.option('max'));
    },
    _clearValue: function _clearValue() {
      if (this._inputIsInvalid()) {
        this._input().val('');
        this._validateValue();
      }
      this.callBase();
    },
    reset: function reset() {
      if (this.option('value') === null) {
        this.option('text', '');
        if (this._input().length) {
          this._renderValue();
        }
      } else {
        this.option('value', null);
      }
    },
    _optionChanged: function _optionChanged(args) {
      switch (args.name) {
        case 'value':
          this._validateValue(args.value);
          this._setSubmitValue(args.value);
          this.callBase(args);
          this._resumeValueChangeAction();
          break;
        case 'step':
          this._renderProps();
          break;
        case 'min':
        case 'max':
          this._renderProps();
          this.option('value', this._parseValue(this.option('value')));
          break;
        case 'showSpinButtons':
        case 'useLargeSpinButtons':
          this._updateButtons(['spins']);
          break;
        case 'invalidValueMessage':
          break;
        default:
          this.callBase(args);
      }
    }
  });
  var _default = NumberBoxBase;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/renderer","../../core/dom_adapter","../../events/core/events_engine","../../core/utils/common","../../core/utils/type","../../core/utils/math","../../core/utils/extend","../../core/devices","../../core/utils/browser","../text_box/ui.text_editor","../../events/utils/index","./number_box.spins","../../localization/message","../../core/utils/deferred"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/renderer"), require("../../core/dom_adapter"), require("../../events/core/events_engine"), require("../../core/utils/common"), require("../../core/utils/type"), require("../../core/utils/math"), require("../../core/utils/extend"), require("../../core/devices"), require("../../core/utils/browser"), require("../text_box/ui.text_editor"), require("../../events/utils/index"), require("./number_box.spins"), require("../../localization/message"), require("../../core/utils/deferred"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=number_box.base.js.map
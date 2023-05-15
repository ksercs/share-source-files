!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/date_box/ui.date_box.mask.js"], ["../../events/utils/index","../../core/utils/type","../../core/utils/dom","../../core/utils/extend","../../core/utils/math","../../events/core/events_engine","./ui.date_box.mask.parts","../../localization/date","../../localization/ldml/date.parser","../../localization/ldml/date.format","./ui.date_box.base","../../localization/number","../../core/devices","../../core/utils/browser"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/date_box/ui.date_box.mask.js", ["../../events/utils/index", "../../core/utils/type", "../../core/utils/dom", "../../core/utils/extend", "../../core/utils/math", "../../events/core/events_engine", "./ui.date_box.mask.parts", "../../localization/date", "../../localization/ldml/date.parser", "../../localization/ldml/date.format", "./ui.date_box.base", "../../localization/number", "../../core/devices", "../../core/utils/browser"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _index = $__require("../../events/utils/index");
  var _type = $__require("../../core/utils/type");
  var _dom = $__require("../../core/utils/dom");
  var _extend = $__require("../../core/utils/extend");
  var _math = $__require("../../core/utils/math");
  var _events_engine = _interopRequireDefault($__require("../../events/core/events_engine"));
  var _uiDate_boxMask = $__require("./ui.date_box.mask.parts");
  var _date = _interopRequireDefault($__require("../../localization/date"));
  var _date2 = $__require("../../localization/ldml/date.parser");
  var _date3 = $__require("../../localization/ldml/date.format");
  var _uiDate_box = _interopRequireDefault($__require("./ui.date_box.base"));
  var _number = _interopRequireDefault($__require("../../localization/number"));
  var _devices = _interopRequireDefault($__require("../../core/devices"));
  var _browser = _interopRequireDefault($__require("../../core/utils/browser"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var MASK_EVENT_NAMESPACE = 'dateBoxMask';
  var FORWARD = 1;
  var BACKWARD = -1;
  var DateBoxMask = _uiDate_box.default.inherit({
    _supportedKeys: function _supportedKeys(e) {
      var _this = this;
      var originalHandlers = this.callBase(e);
      var callOriginalHandler = function callOriginalHandler(e) {
        var originalHandler = originalHandlers[(0, _index.normalizeKeyName)(e)];
        return originalHandler && originalHandler.apply(_this, [e]);
      };
      var applyHandler = function applyHandler(e, maskHandler) {
        if (_this._shouldUseOriginalHandler(e)) {
          return callOriginalHandler.apply(_this, [e]);
        } else {
          return maskHandler.apply(_this, [e]);
        }
      };
      return (0, _extend.extend)({}, originalHandlers, {
        del: function del(e) {
          return applyHandler(e, function (event) {
            _this._revertPart(FORWARD);
            _this._isAllSelected() || event.preventDefault();
          });
        },
        backspace: function backspace(e) {
          return applyHandler(e, function (event) {
            _this._revertPart(BACKWARD);
            _this._isAllSelected() || event.preventDefault();
          });
        },
        home: function home(e) {
          return applyHandler(e, function (event) {
            _this._selectFirstPart();
            event.preventDefault();
          });
        },
        end: function end(e) {
          return applyHandler(e, function (event) {
            _this._selectLastPart();
            event.preventDefault();
          });
        },
        escape: function escape(e) {
          return applyHandler(e, function (event) {
            _this._revertChanges(event);
          });
        },
        enter: function enter(e) {
          return applyHandler(e, function () {
            _this._enterHandler();
          });
        },
        leftArrow: function leftArrow(e) {
          return applyHandler(e, function (event) {
            _this._selectNextPart(BACKWARD);
            event.preventDefault();
          });
        },
        rightArrow: function rightArrow(e) {
          return applyHandler(e, function (event) {
            _this._selectNextPart(FORWARD);
            event.preventDefault();
          });
        },
        upArrow: function upArrow(e) {
          return applyHandler(e, function (event) {
            _this._upDownArrowHandler(FORWARD);
            event.preventDefault();
          });
        },
        downArrow: function downArrow(e) {
          return applyHandler(e, function (event) {
            _this._upDownArrowHandler(BACKWARD);
            event.preventDefault();
          });
        }
      });
    },
    _shouldUseOriginalHandler: function _shouldUseOriginalHandler(e) {
      var keysToHandleByMask = ['backspace', 'del'];
      var isNotDeletingInCalendar = this.option('opened') && e && keysToHandleByMask.indexOf((0, _index.normalizeKeyName)(e)) === -1;
      return !this._useMaskBehavior() || isNotDeletingInCalendar || e && e.altKey;
    },
    _upDownArrowHandler: function _upDownArrowHandler(step) {
      this._setNewDateIfEmpty();
      var originalValue = this._getActivePartValue(this._initialMaskValue);
      var currentValue = this._getActivePartValue();
      var delta = currentValue - originalValue;
      this._loadMaskValue(this._initialMaskValue);
      this._partIncrease(delta + step, true);
    },
    _getDefaultOptions: function _getDefaultOptions() {
      return (0, _extend.extend)(this.callBase(), {
        useMaskBehavior: false,
        emptyDateValue: new Date(2000, 0, 1, 0, 0, 0)
      });
    },
    _isSingleCharKey: function _isSingleCharKey(_ref) {
      var originalEvent = _ref.originalEvent,
          alt = _ref.alt;
      var key = originalEvent.data || originalEvent.key;
      return typeof key === 'string' && key.length === 1 && !alt && !(0, _index.isCommandKeyPressed)(originalEvent);
    },
    _isSingleDigitKey: function _isSingleDigitKey(e) {
      var _e$originalEvent;
      var data = (_e$originalEvent = e.originalEvent) === null || _e$originalEvent === void 0 ? void 0 : _e$originalEvent.data;
      return (data === null || data === void 0 ? void 0 : data.length) === 1 && parseInt(data, 10);
    },
    _useBeforeInputEvent: function _useBeforeInputEvent() {
      return _devices.default.real().android;
    },
    _keyInputHandler: function _keyInputHandler(e, key) {
      var oldInputValue = this._input().val();
      this._processInputKey(key);
      e.preventDefault();
      var isValueChanged = oldInputValue !== this._input().val();
      isValueChanged && _events_engine.default.trigger(this._input(), 'input');
    },
    _keyboardHandler: function _keyboardHandler(e) {
      var _this2 = this;
      var key = e.originalEvent.key;
      var result = this.callBase(e);
      if (!this._useMaskBehavior() || this._useBeforeInputEvent()) {
        return result;
      }
      if (_browser.default.chrome && e.key === 'Process' && e.code.indexOf('Digit') === 0) {
        key = e.code.replace('Digit', '');
        this._processInputKey(key);
        this._maskInputHandler = function () {
          _this2._renderSelectedPart();
        };
      } else if (this._isSingleCharKey(e)) {
        this._keyInputHandler(e.originalEvent, key);
      }
      return result;
    },
    _maskBeforeInputHandler: function _maskBeforeInputHandler(e) {
      var _this3 = this;
      this._maskInputHandler = null;
      var inputType = e.originalEvent.inputType;
      if (inputType === 'insertCompositionText') {
        this._maskInputHandler = function () {
          _this3._renderSelectedPart();
        };
      }
      var isBackwardDeletion = inputType === 'deleteContentBackward';
      var isForwardDeletion = inputType === 'deleteContentForward';
      if (isBackwardDeletion || isForwardDeletion) {
        var direction = isBackwardDeletion ? BACKWARD : FORWARD;
        this._maskInputHandler = function () {
          _this3._revertPart();
          _this3._selectNextPart(direction);
        };
      }
      if (!this._useMaskBehavior() || !this._isSingleCharKey(e)) {
        return;
      }
      var key = e.originalEvent.data;
      this._keyInputHandler(e, key);
      return true;
    },
    _keyPressHandler: function _keyPressHandler(e) {
      var event = e.originalEvent;
      if ((event === null || event === void 0 ? void 0 : event.inputType) === 'insertCompositionText' && this._isSingleDigitKey(e)) {
        this._processInputKey(event.data);
        this._renderDisplayText(this._getDisplayedText(this._maskValue));
        this._selectNextPart();
      }
      this.callBase(e);
      if (this._maskInputHandler) {
        this._maskInputHandler();
        this._maskInputHandler = null;
      }
    },
    _processInputKey: function _processInputKey(key) {
      if (this._isAllSelected()) {
        this._activePartIndex = 0;
      }
      this._setNewDateIfEmpty();
      if (isNaN(parseInt(key))) {
        this._searchString(key);
      } else {
        this._searchNumber(key);
      }
    },
    _isAllSelected: function _isAllSelected() {
      var caret = this._caret();
      return caret.end - caret.start === this.option('text').length;
    },
    _getFormatPattern: function _getFormatPattern() {
      if (this._formatPattern) {
        return this._formatPattern;
      }
      var format = this._strategy.getDisplayFormat(this.option('displayFormat'));
      var isLDMLPattern = (0, _type.isString)(format) && !_date.default._getPatternByFormat(format);
      if (isLDMLPattern) {
        this._formatPattern = format;
      } else {
        this._formatPattern = (0, _date3.getFormat)(function (value) {
          return _date.default.format(value, format);
        });
      }
      return this._formatPattern;
    },
    _setNewDateIfEmpty: function _setNewDateIfEmpty() {
      if (!this._maskValue) {
        var value = this.option('type') === 'time' ? new Date(null) : new Date();
        this._maskValue = value;
        this._initialMaskValue = value;
        this._renderDateParts();
      }
    },
    _partLimitsReached: function _partLimitsReached(max) {
      var maxLimitLength = String(max).length;
      var formatLength = this._getActivePartProp('pattern').length;
      var isShortFormat = formatLength === 1;
      var maxSearchLength = isShortFormat ? maxLimitLength : Math.min(formatLength, maxLimitLength);
      var isLengthExceeded = this._searchValue.length === maxSearchLength;
      var isValueOverflowed = parseInt(this._searchValue + '0') > max;
      return isLengthExceeded || isValueOverflowed;
    },
    _searchNumber: function _searchNumber(char) {
      var _this$_getActivePartL = this._getActivePartLimits(),
          max = _this$_getActivePartL.max;
      var maxLimitLength = String(max).length;
      this._searchValue = (this._searchValue + char).substr(-maxLimitLength);
      if (isNaN(this._searchValue)) {
        this._searchValue = char;
      }
      this._setActivePartValue(this._searchValue);
      if (this._partLimitsReached(max)) {
        this._selectNextPart(FORWARD);
      }
    },
    _searchString: function _searchString(char) {
      if (!isNaN(parseInt(this._getActivePartProp('text')))) {
        return;
      }
      var limits = this._getActivePartProp('limits')(this._maskValue);
      var startString = this._searchValue + char.toLowerCase();
      var endLimit = limits.max - limits.min;
      for (var i = 0; i <= endLimit; i++) {
        this._loadMaskValue(this._initialMaskValue);
        this._partIncrease(i + 1);
        if (this._getActivePartProp('text').toLowerCase().indexOf(startString) === 0) {
          this._searchValue = startString;
          return;
        }
      }
      this._setNewDateIfEmpty();
      if (this._searchValue) {
        this._clearSearchValue();
        this._searchString(char);
      }
    },
    _clearSearchValue: function _clearSearchValue() {
      this._searchValue = '';
    },
    _revertPart: function _revertPart(direction) {
      if (!this._isAllSelected()) {
        var actual = this._getActivePartValue(this.option('emptyDateValue'));
        this._setActivePartValue(actual);
        this._selectNextPart(direction);
      }
      this._clearSearchValue();
    },
    _useMaskBehavior: function _useMaskBehavior() {
      return this.option('useMaskBehavior') && this.option('mode') === 'text';
    },
    _prepareRegExpInfo: function _prepareRegExpInfo() {
      this._regExpInfo = (0, _date2.getRegExpInfo)(this._getFormatPattern(), _date.default);
      var regexp = this._regExpInfo.regexp;
      var source = regexp.source;
      var flags = regexp.flags;
      var quantifierRegexp = new RegExp(/(\{[0-9]+,?[0-9]*\})/);
      var convertedSource = source.split(quantifierRegexp).map(function (sourcePart) {
        return quantifierRegexp.test(sourcePart) ? sourcePart : _number.default.convertDigits(sourcePart, false);
      }).join('');
      this._regExpInfo.regexp = new RegExp(convertedSource, flags);
    },
    _initMaskState: function _initMaskState() {
      this._activePartIndex = 0;
      this._formatPattern = null;
      this._prepareRegExpInfo();
      this._loadMaskValue();
    },
    _renderMask: function _renderMask() {
      this.callBase();
      this._detachMaskEvents();
      this._clearMaskState();
      if (this._useMaskBehavior()) {
        this._attachMaskEvents();
        this._initMaskState();
        this._renderDateParts();
      }
    },
    _renderDateParts: function _renderDateParts() {
      if (!this._useMaskBehavior()) {
        return;
      }
      var text = this.option('text') || this._getDisplayedText(this._maskValue);
      if (text) {
        this._dateParts = (0, _uiDate_boxMask.renderDateParts)(text, this._regExpInfo);
        if (!this._input().is(':hidden')) {
          this._selectNextPart();
        }
      }
    },
    _detachMaskEvents: function _detachMaskEvents() {
      _events_engine.default.off(this._input(), '.' + MASK_EVENT_NAMESPACE);
    },
    _attachMaskEvents: function _attachMaskEvents() {
      var _this4 = this;
      _events_engine.default.on(this._input(), (0, _index.addNamespace)('dxclick', MASK_EVENT_NAMESPACE), this._maskClickHandler.bind(this));
      _events_engine.default.on(this._input(), (0, _index.addNamespace)('paste', MASK_EVENT_NAMESPACE), this._maskPasteHandler.bind(this));
      _events_engine.default.on(this._input(), (0, _index.addNamespace)('drop', MASK_EVENT_NAMESPACE), function () {
        _this4._renderSelectedPart();
      });
      _events_engine.default.on(this._input(), (0, _index.addNamespace)('compositionend', MASK_EVENT_NAMESPACE), this._maskCompositionEndHandler.bind(this));
      if (this._useBeforeInputEvent()) {
        _events_engine.default.on(this._input(), (0, _index.addNamespace)('beforeinput', MASK_EVENT_NAMESPACE), this._maskBeforeInputHandler.bind(this));
      }
    },
    _renderSelectedPart: function _renderSelectedPart() {
      this._renderDisplayText(this._getDisplayedText(this._maskValue));
      this._selectNextPart();
    },
    _selectLastPart: function _selectLastPart() {
      if (this.option('text')) {
        this._activePartIndex = this._dateParts.length;
        this._selectNextPart(BACKWARD);
      }
    },
    _selectFirstPart: function _selectFirstPart() {
      if (this.option('text')) {
        this._activePartIndex = -1;
        this._selectNextPart(FORWARD);
      }
    },
    _onMouseWheel: function _onMouseWheel(e) {
      if (this._useMaskBehavior()) {
        this._partIncrease(e.delta > 0 ? FORWARD : BACKWARD, e);
      }
    },
    _selectNextPart: function _selectNextPart() {
      var step = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      if (!this.option('text') || this._disposed) {
        return;
      }
      if (step) {
        this._initialMaskValue = new Date(this._maskValue);
      }
      var index = (0, _math.fitIntoRange)(this._activePartIndex + step, 0, this._dateParts.length - 1);
      if (this._dateParts[index].isStub) {
        var isBoundaryIndex = index === 0 && step < 0 || index === this._dateParts.length - 1 && step > 0;
        if (!isBoundaryIndex) {
          this._selectNextPart(step >= 0 ? step + 1 : step - 1);
          return;
        } else {
          index = this._activePartIndex;
        }
      }
      if (this._activePartIndex !== index) {
        this._clearSearchValue();
      }
      this._activePartIndex = index;
      this._caret(this._getActivePartProp('caret'));
    },
    _getRealLimitsPattern: function _getRealLimitsPattern() {
      if (this._getActivePartProp('pattern')[0] === 'd') {
        return 'dM';
      }
    },
    _getActivePartLimits: function _getActivePartLimits(lockOtherParts) {
      var limitFunction = this._getActivePartProp('limits');
      return limitFunction(this._maskValue, lockOtherParts && this._getRealLimitsPattern());
    },
    _getActivePartValue: function _getActivePartValue(dateValue) {
      dateValue = dateValue || this._maskValue;
      var getter = this._getActivePartProp('getter');
      return (0, _type.isFunction)(getter) ? getter(dateValue) : dateValue[getter]();
    },
    _addLeadingZeroes: function _addLeadingZeroes(value) {
      var zeroes = this._searchValue.match(/^0+/);
      var limits = this._getActivePartLimits();
      var maxLimitLength = String(limits.max).length;
      return ((zeroes && zeroes[0] || '') + String(value)).substr(-maxLimitLength);
    },
    _setActivePartValue: function _setActivePartValue(value, dateValue) {
      dateValue = dateValue || this._maskValue;
      var setter = this._getActivePartProp('setter');
      var limits = this._getActivePartLimits();
      value = (0, _math.inRange)(value, limits.min, limits.max) ? value : value % 10;
      value = this._addLeadingZeroes((0, _math.fitIntoRange)(value, limits.min, limits.max));
      (0, _type.isFunction)(setter) ? setter(dateValue, value) : dateValue[setter](value);
      this._renderDisplayText(this._getDisplayedText(dateValue));
      this._renderDateParts();
    },
    _getActivePartProp: function _getActivePartProp(property) {
      if (!this._dateParts || !this._dateParts[this._activePartIndex]) {
        return undefined;
      }
      return this._dateParts[this._activePartIndex][property];
    },
    _loadMaskValue: function _loadMaskValue() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.dateOption('value');
      this._maskValue = value && new Date(value);
      this._initialMaskValue = value && new Date(value);
    },
    _saveMaskValue: function _saveMaskValue() {
      var value = this._maskValue && new Date(this._maskValue);
      if (value && this.option('type') === 'date') {
        value.setHours(0, 0, 0, 0);
      }
      this._initialMaskValue = new Date(value);
      this.dateOption('value', value);
    },
    _revertChanges: function _revertChanges() {
      this._loadMaskValue();
      this._renderDisplayText(this._getDisplayedText(this._maskValue));
      this._renderDateParts();
    },
    _renderDisplayText: function _renderDisplayText(text) {
      this.callBase(text);
      if (this._useMaskBehavior()) {
        this.option('text', text);
      }
    },
    _partIncrease: function _partIncrease(step, lockOtherParts) {
      this._setNewDateIfEmpty();
      var _this$_getActivePartL2 = this._getActivePartLimits(lockOtherParts),
          max = _this$_getActivePartL2.max,
          min = _this$_getActivePartL2.min;
      var limitDelta = max - min;

      // take AM\PM into account
      if (limitDelta === 1) {
        limitDelta++;
      }
      var newValue = step + this._getActivePartValue();
      if (newValue > max) {
        newValue = this._applyLimits(newValue, {
          limitBase: min,
          limitClosest: max,
          limitDelta: limitDelta
        });
      } else if (newValue < min) {
        newValue = this._applyLimits(newValue, {
          limitBase: max,
          limitClosest: min,
          limitDelta: limitDelta
        });
      }
      this._setActivePartValue(newValue);
    },
    _applyLimits: function _applyLimits(newValue, _ref2) {
      var limitBase = _ref2.limitBase,
          limitClosest = _ref2.limitClosest,
          limitDelta = _ref2.limitDelta;
      var delta = (newValue - limitClosest) % limitDelta;
      return delta ? limitBase + delta - 1 * (0, _math.sign)(delta) : limitClosest;
    },
    _maskClickHandler: function _maskClickHandler() {
      this._loadMaskValue(this._maskValue);
      if (this.option('text')) {
        this._activePartIndex = (0, _uiDate_boxMask.getDatePartIndexByPosition)(this._dateParts, this._caret().start);
        if (!this._isAllSelected()) {
          if ((0, _type.isDefined)(this._activePartIndex)) {
            this._caret(this._getActivePartProp('caret'));
          } else {
            this._selectLastPart();
          }
        }
      }
    },
    _maskCompositionEndHandler: function _maskCompositionEndHandler(e) {
      var _this5 = this;
      this._input().val(this._getDisplayedText(this._maskValue));
      this._selectNextPart();
      this._maskInputHandler = function () {
        _this5._renderSelectedPart();
      };
    },
    _maskPasteHandler: function _maskPasteHandler(e) {
      var newText = this._replaceSelectedText(this.option('text'), this._caret(), (0, _dom.clipboardText)(e));
      var date = _date.default.parse(newText, this._getFormatPattern());
      if (date && this._isDateValid(date)) {
        this._maskValue = date;
        this._renderDisplayText(this._getDisplayedText(this._maskValue));
        this._renderDateParts();
        this._selectNextPart();
      }
      e.preventDefault();
    },
    _isDateValid: function _isDateValid(date) {
      return (0, _type.isDate)(date) && !isNaN(date);
    },
    _isValueDirty: function _isValueDirty() {
      var value = this.dateOption('value');
      return (this._maskValue && this._maskValue.getTime()) !== (value && value.getTime());
    },
    _fireChangeEvent: function _fireChangeEvent() {
      this._clearSearchValue();
      if (this._isValueDirty()) {
        _events_engine.default.trigger(this._input(), 'change');
      }
    },
    _enterHandler: function _enterHandler() {
      this._fireChangeEvent();
      this._selectNextPart(FORWARD);
    },
    _focusOutHandler: function _focusOutHandler(e) {
      var shouldFireChangeEvent = this._useMaskBehavior() && !e.isDefaultPrevented();
      if (shouldFireChangeEvent) {
        this._fireChangeEvent();
        this.callBase(e);
        this._selectFirstPart(e);
      } else {
        this.callBase(e);
      }
    },
    _valueChangeEventHandler: function _valueChangeEventHandler(e) {
      var text = this.option('text');
      if (this._useMaskBehavior()) {
        this._saveValueChangeEvent(e);
        if (!text) {
          this._maskValue = null;
        } else if (this._maskValue === null) {
          this._loadMaskValue(text);
        }
        this._saveMaskValue();
      } else {
        this.callBase(e);
      }
    },
    _optionChanged: function _optionChanged(args) {
      switch (args.name) {
        case 'useMaskBehavior':
          this._renderMask();
          break;
        case 'displayFormat':
        case 'mode':
          this.callBase(args);
          this._renderMask();
          break;
        case 'value':
          this._loadMaskValue();
          this.callBase(args);
          this._renderDateParts();
          break;
        case 'emptyDateValue':
          break;
        default:
          this.callBase(args);
      }
    },
    _clearMaskState: function _clearMaskState() {
      this._clearSearchValue();
      delete this._dateParts;
      delete this._activePartIndex;
      delete this._maskValue;
    },
    reset: function reset() {
      this._clearMaskState();
      this._activePartIndex = 0;
      this.callBase();
    },
    _clean: function _clean() {
      this.callBase();
      this._detachMaskEvents();
      this._clearMaskState();
    }
  });
  var _default = DateBoxMask;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../events/utils/index","../../core/utils/type","../../core/utils/dom","../../core/utils/extend","../../core/utils/math","../../events/core/events_engine","./ui.date_box.mask.parts","../../localization/date","../../localization/ldml/date.parser","../../localization/ldml/date.format","./ui.date_box.base","../../localization/number","../../core/devices","../../core/utils/browser"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../events/utils/index"), require("../../core/utils/type"), require("../../core/utils/dom"), require("../../core/utils/extend"), require("../../core/utils/math"), require("../../events/core/events_engine"), require("./ui.date_box.mask.parts"), require("../../localization/date"), require("../../localization/ldml/date.parser"), require("../../localization/ldml/date.format"), require("./ui.date_box.base"), require("../../localization/number"), require("../../core/devices"), require("../../core/utils/browser"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.date_box.mask.js.map
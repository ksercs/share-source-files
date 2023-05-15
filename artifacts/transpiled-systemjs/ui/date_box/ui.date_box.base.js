!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/date_box/ui.date_box.base.js"], ["../../core/utils/window","../../core/utils/type","../../core/utils/dom","../../core/utils/iterator","../../core/utils/extend","../../core/utils/support","../../core/devices","../../core/config","../../core/utils/date","./ui.date_utils","../../core/utils/date_serialization","../drop_down_editor/ui.drop_down_editor","../../localization/date","../../localization/message","./ui.date_box.strategy.calendar","./ui.date_box.strategy.date_view","./ui.date_box.strategy.native","./ui.date_box.strategy.calendar_with_time","./ui.date_box.strategy.list"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/date_box/ui.date_box.base.js", ["../../core/utils/window", "../../core/utils/type", "../../core/utils/dom", "../../core/utils/iterator", "../../core/utils/extend", "../../core/utils/support", "../../core/devices", "../../core/config", "../../core/utils/date", "./ui.date_utils", "../../core/utils/date_serialization", "../drop_down_editor/ui.drop_down_editor", "../../localization/date", "../../localization/message", "./ui.date_box.strategy.calendar", "./ui.date_box.strategy.date_view", "./ui.date_box.strategy.native", "./ui.date_box.strategy.calendar_with_time", "./ui.date_box.strategy.list"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _window = $__require("../../core/utils/window");
  var _type = $__require("../../core/utils/type");
  var _dom = $__require("../../core/utils/dom");
  var _iterator = $__require("../../core/utils/iterator");
  var _extend = $__require("../../core/utils/extend");
  var _support = $__require("../../core/utils/support");
  var _devices = _interopRequireDefault($__require("../../core/devices"));
  var _config = _interopRequireDefault($__require("../../core/config"));
  var _date = _interopRequireDefault($__require("../../core/utils/date"));
  var _ui = _interopRequireDefault($__require("./ui.date_utils"));
  var _date_serialization = _interopRequireDefault($__require("../../core/utils/date_serialization"));
  var _ui2 = _interopRequireDefault($__require("../drop_down_editor/ui.drop_down_editor"));
  var _date2 = _interopRequireDefault($__require("../../localization/date"));
  var _message = _interopRequireDefault($__require("../../localization/message"));
  var _uiDate_boxStrategy = _interopRequireDefault($__require("./ui.date_box.strategy.calendar"));
  var _uiDate_boxStrategy2 = _interopRequireDefault($__require("./ui.date_box.strategy.date_view"));
  var _uiDate_boxStrategy3 = _interopRequireDefault($__require("./ui.date_box.strategy.native"));
  var _uiDate_boxStrategy4 = _interopRequireDefault($__require("./ui.date_box.strategy.calendar_with_time"));
  var _uiDate_boxStrategy5 = _interopRequireDefault($__require("./ui.date_box.strategy.list"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var window = (0, _window.getWindow)();
  var DATEBOX_CLASS = 'dx-datebox';
  var DX_AUTO_WIDTH_CLASS = 'dx-auto-width';
  var DX_INVALID_BADGE_CLASS = 'dx-show-invalid-badge';
  var DX_CLEAR_BUTTON_CLASS = 'dx-clear-button-area';
  var DATEBOX_WRAPPER_CLASS = 'dx-datebox-wrapper';
  var DROPDOWNEDITOR_OVERLAY_CLASS = 'dx-dropdowneditor-overlay';
  var PICKER_TYPE = {
    calendar: 'calendar',
    rollers: 'rollers',
    list: 'list',
    native: 'native'
  };
  var TYPE = {
    date: 'date',
    datetime: 'datetime',
    time: 'time'
  };
  var STRATEGY_NAME = {
    calendar: 'Calendar',
    dateView: 'DateView',
    native: 'Native',
    calendarWithTime: 'CalendarWithTime',
    list: 'List'
  };
  var STRATEGY_CLASSES = {
    Calendar: _uiDate_boxStrategy.default,
    DateView: _uiDate_boxStrategy2.default,
    Native: _uiDate_boxStrategy3.default,
    CalendarWithTime: _uiDate_boxStrategy4.default,
    List: _uiDate_boxStrategy5.default
  };
  var DateBox = _ui2.default.inherit({
    _supportedKeys: function _supportedKeys() {
      return (0, _extend.extend)(this.callBase(), this._strategy.supportedKeys());
    },
    _renderButtonContainers: function _renderButtonContainers() {
      this.callBase.apply(this, arguments);
      this._strategy.customizeButtons();
    },
    _getDefaultOptions: function _getDefaultOptions() {
      return (0, _extend.extend)(this.callBase(), {
        type: 'date',
        showAnalogClock: true,
        value: null,
        dateSerializationFormat: undefined,
        min: undefined,
        max: undefined,
        displayFormat: null,
        interval: 30,
        disabledDates: null,
        pickerType: PICKER_TYPE['calendar'],
        invalidDateMessage: _message.default.format('dxDateBox-validation-datetime'),
        dateOutOfRangeMessage: _message.default.format('validation-range'),
        applyButtonText: _message.default.format('OK'),
        adaptivityEnabled: false,
        calendarOptions: {},
        useHiddenSubmitElement: true,
        _showValidationIcon: true
      });
    },
    _defaultOptionsRules: function _defaultOptionsRules() {
      return this.callBase().concat([{
        device: {
          platform: 'ios'
        },
        options: {
          'dropDownOptions.showTitle': true
        }
      }, {
        device: {
          platform: 'android'
        },
        options: {
          buttonsLocation: 'bottom after'
        }
      }, {
        device: function device() {
          var realDevice = _devices.default.real();
          var platform = realDevice.platform;
          return platform === 'ios' || platform === 'android';
        },
        options: {
          pickerType: PICKER_TYPE.native
        }
      }, {
        device: {
          platform: 'generic',
          deviceType: 'desktop'
        },
        options: {
          buttonsLocation: 'bottom after'
        }
      }]);
    },
    _initOptions: function _initOptions(options) {
      this._userOptions = (0, _extend.extend)({}, options);
      this.callBase(options);
      this._updatePickerOptions();
    },
    _updatePickerOptions: function _updatePickerOptions() {
      var pickerType = this.option('pickerType');
      var type = this.option('type');
      if (pickerType === PICKER_TYPE.list && (type === TYPE.datetime || type === TYPE.date)) {
        pickerType = PICKER_TYPE.calendar;
      }
      if (type === TYPE.time && pickerType === PICKER_TYPE.calendar) {
        pickerType = PICKER_TYPE.list;
      }
      this.option('showDropDownButton', _devices.default.real().platform !== 'generic' || pickerType !== PICKER_TYPE['native']);
      this._pickerType = pickerType;
    },
    _init: function _init() {
      this._initStrategy();
      this.option((0, _extend.extend)({}, this._strategy.getDefaultOptions(), this._userOptions));
      delete this._userOptions;
      this.callBase();
    },
    _toLowerCaseFirstLetter: function _toLowerCaseFirstLetter(string) {
      return string.charAt(0).toLowerCase() + string.substr(1);
    },
    _initStrategy: function _initStrategy() {
      var strategyName = this._getStrategyName(this._getFormatType());
      var strategy = STRATEGY_CLASSES[strategyName];
      if (!(this._strategy && this._strategy.NAME === strategyName)) {
        this._strategy = new strategy(this);
      }
    },
    _getFormatType: function _getFormatType() {
      var currentType = this.option('type');
      var isTime = /h|m|s/g.test(currentType);
      var isDate = /d|M|Y/g.test(currentType);
      var type = '';
      if (isDate) {
        type += TYPE.date;
      }
      if (isTime) {
        type += TYPE.time;
      }
      return type;
    },
    _getStrategyName: function _getStrategyName(type) {
      var pickerType = this._pickerType;
      if (pickerType === PICKER_TYPE.rollers) {
        return STRATEGY_NAME.dateView;
      } else if (pickerType === PICKER_TYPE.native) {
        return STRATEGY_NAME['native'];
      }
      if (type === TYPE.date) {
        return STRATEGY_NAME.calendar;
      }
      if (type === TYPE.datetime) {
        return STRATEGY_NAME.calendarWithTime;
      }
      return STRATEGY_NAME.list;
    },
    _initMarkup: function _initMarkup() {
      this.$element().addClass(DATEBOX_CLASS);
      this.callBase();
      this._refreshFormatClass();
      this._refreshPickerTypeClass();
      this._strategy.renderInputMinMax(this._input());
    },
    _render: function _render() {
      this.callBase();
      this._formatValidationIcon();
    },
    _renderDimensions: function _renderDimensions() {
      this.callBase();
      this.$element().toggleClass(DX_AUTO_WIDTH_CLASS, !this.option('width'));
      this._updatePopupWidth();
      this._updatePopupHeight();
    },
    _dimensionChanged: function _dimensionChanged() {
      this.callBase();
      this._updatePopupHeight();
    },
    _updatePopupHeight: function _updatePopupHeight() {
      if (this._popup) {
        var _this$_strategy$_upda, _this$_strategy;
        (_this$_strategy$_upda = (_this$_strategy = this._strategy)._updatePopupHeight) === null || _this$_strategy$_upda === void 0 ? void 0 : _this$_strategy$_upda.call(_this$_strategy);
      }
    },
    _refreshFormatClass: function _refreshFormatClass() {
      var $element = this.$element();
      (0, _iterator.each)(TYPE, function (_, item) {
        $element.removeClass(DATEBOX_CLASS + '-' + item);
      });
      $element.addClass(DATEBOX_CLASS + '-' + this.option('type'));
    },
    _refreshPickerTypeClass: function _refreshPickerTypeClass() {
      var $element = this.$element();
      (0, _iterator.each)(PICKER_TYPE, function (_, item) {
        $element.removeClass(DATEBOX_CLASS + '-' + item);
      });
      $element.addClass(DATEBOX_CLASS + '-' + this._pickerType);
    },
    _formatValidationIcon: function _formatValidationIcon() {
      if (!(0, _window.hasWindow)()) {
        return;
      }
      var inputElement = this._input().get(0);
      var isRtlEnabled = this.option('rtlEnabled');
      var clearButtonWidth = this._getClearButtonWidth();
      var longestElementDimensions = this._getLongestElementDimensions();
      var curWidth = parseFloat(window.getComputedStyle(inputElement).width) - clearButtonWidth;
      var shouldHideValidationIcon = longestElementDimensions.width > curWidth;
      var style = inputElement.style;
      this.$element().toggleClass(DX_INVALID_BADGE_CLASS, !shouldHideValidationIcon && this.option('_showValidationIcon'));
      if (shouldHideValidationIcon) {
        if (this._storedPadding === undefined) {
          this._storedPadding = isRtlEnabled ? longestElementDimensions.leftPadding : longestElementDimensions.rightPadding;
        }
        isRtlEnabled ? style.paddingLeft = 0 : style.paddingRight = 0;
      } else {
        isRtlEnabled ? style.paddingLeft = this._storedPadding + 'px' : style.paddingRight = this._storedPadding + 'px';
      }
    },
    _getClearButtonWidth: function _getClearButtonWidth() {
      var clearButtonWidth = 0;
      if (this._isClearButtonVisible() && this._input().val() === '') {
        var clearButtonElement = this.$element().find('.' + DX_CLEAR_BUTTON_CLASS).get(0);
        clearButtonWidth = parseFloat(window.getComputedStyle(clearButtonElement).width);
      }
      return clearButtonWidth;
    },
    _getLongestElementDimensions: function _getLongestElementDimensions() {
      var format = this._strategy.getDisplayFormat(this.option('displayFormat'));
      var longestValue = _date2.default.format(_ui.default.getLongestDate(format, _date2.default.getMonthNames(), _date2.default.getDayNames()), format);
      var $input = this._input();
      var inputElement = $input.get(0);
      var $longestValueElement = (0, _dom.createTextElementHiddenCopy)($input, longestValue);
      var isPaddingStored = this._storedPadding !== undefined;
      var storedPadding = !isPaddingStored ? 0 : this._storedPadding;
      $longestValueElement.appendTo(this.$element());
      var elementWidth = parseFloat(window.getComputedStyle($longestValueElement.get(0)).width);
      var rightPadding = parseFloat(window.getComputedStyle(inputElement).paddingRight);
      var leftPadding = parseFloat(window.getComputedStyle(inputElement).paddingLeft);
      var necessaryWidth = elementWidth + leftPadding + rightPadding + storedPadding;
      $longestValueElement.remove();
      return {
        width: necessaryWidth,
        leftPadding: leftPadding,
        rightPadding: rightPadding
      };
    },
    _getKeyboardListeners: function _getKeyboardListeners() {
      return this.callBase().concat([this._strategy && this._strategy.getKeyboardListener()]);
    },
    _renderPopup: function _renderPopup() {
      this.callBase();
      this._popup.$wrapper().addClass(DATEBOX_WRAPPER_CLASS);
      this._renderPopupWrapper();
    },
    _getPopupToolbarItems: function _getPopupToolbarItems() {
      var _this$_strategy$_getP, _this$_strategy$_getP2, _this$_strategy2;
      var defaultItems = this.callBase();
      return (_this$_strategy$_getP = (_this$_strategy$_getP2 = (_this$_strategy2 = this._strategy)._getPopupToolbarItems) === null || _this$_strategy$_getP2 === void 0 ? void 0 : _this$_strategy$_getP2.call(_this$_strategy2, defaultItems)) !== null && _this$_strategy$_getP !== void 0 ? _this$_strategy$_getP : defaultItems;
    },
    _popupConfig: function _popupConfig() {
      var popupConfig = this.callBase();
      return (0, _extend.extend)(this._strategy.popupConfig(popupConfig), {
        title: this._getPopupTitle(),
        dragEnabled: false
      });
    },
    _renderPopupWrapper: function _renderPopupWrapper() {
      if (!this._popup) {
        return;
      }
      var $element = this.$element();
      var classPostfixes = (0, _extend.extend)({}, TYPE, PICKER_TYPE);
      (0, _iterator.each)(classPostfixes, function (_, item) {
        $element.removeClass(DATEBOX_WRAPPER_CLASS + '-' + item);
      }.bind(this));
      this._popup.$wrapper().addClass(DATEBOX_WRAPPER_CLASS + '-' + this.option('type')).addClass(DATEBOX_WRAPPER_CLASS + '-' + this._pickerType).addClass(DROPDOWNEDITOR_OVERLAY_CLASS);
    },
    _renderPopupContent: function _renderPopupContent() {
      this.callBase();
      this._strategy.renderPopupContent();
    },
    _getFirstPopupElement: function _getFirstPopupElement() {
      return this._strategy.getFirstPopupElement() || this.callBase();
    },
    _getLastPopupElement: function _getLastPopupElement() {
      return this._strategy.getLastPopupElement() || this.callBase();
    },
    _popupShowingHandler: function _popupShowingHandler() {
      this.callBase();
      this._strategy.popupShowingHandler();
    },
    _popupShownHandler: function _popupShownHandler() {
      this.callBase();
      this._strategy.renderOpenedState();
    },
    _popupHiddenHandler: function _popupHiddenHandler() {
      this.callBase();
      this._strategy.renderOpenedState();
      this._strategy.popupHiddenHandler();
    },
    _visibilityChanged: function _visibilityChanged(visible) {
      if (visible) {
        this._formatValidationIcon();
      }
    },
    _clearValueHandler: function _clearValueHandler(e) {
      this.option('text', '');
      this.callBase(e);
    },
    _readOnlyPropValue: function _readOnlyPropValue() {
      if (this._pickerType === PICKER_TYPE.rollers) {
        return true;
      }
      var platform = _devices.default.real().platform;
      var isCustomValueDisabled = this._isNativeType() && (platform === 'ios' || platform === 'android');
      if (isCustomValueDisabled) {
        return this.option('readOnly');
      }
      return this.callBase();
    },
    _isClearButtonVisible: function _isClearButtonVisible() {
      return this.callBase() && !this._isNativeType();
    },
    _renderValue: function _renderValue() {
      var value = this.dateOption('value');
      this.option('text', this._getDisplayedText(value));
      this._strategy.renderValue();
      return this.callBase();
    },
    _setSubmitValue: function _setSubmitValue() {
      var value = this.dateOption('value');
      var dateSerializationFormat = this.option('dateSerializationFormat');
      var submitFormat = _ui.default.SUBMIT_FORMATS_MAP[this.option('type')];
      var submitValue = dateSerializationFormat ? _date_serialization.default.serializeDate(value, dateSerializationFormat) : _ui.default.toStandardDateFormat(value, submitFormat);
      this._getSubmitElement().val(submitValue);
    },
    _getDisplayedText: function _getDisplayedText(value) {
      var mode = this.option('mode');
      var displayedText;
      if (mode === 'text') {
        var displayFormat = this._strategy.getDisplayFormat(this.option('displayFormat'));
        displayedText = _date2.default.format(value, displayFormat);
      } else {
        var format = this._getFormatByMode(mode);
        if (format) {
          displayedText = _date2.default.format(value, format);
        } else {
          displayedText = _ui.default.toStandardDateFormat(value, mode);
        }
      }
      return displayedText;
    },
    _getFormatByMode: function _getFormatByMode(mode) {
      return (0, _support.inputType)(mode) ? null : _ui.default.FORMATS_MAP[mode];
    },
    _valueChangeEventHandler: function _valueChangeEventHandler(e) {
      var _this$option = this.option(),
          text = _this$option.text,
          type = _this$option.type,
          validationError = _this$option.validationError;
      var currentValue = this.dateOption('value');
      if (text === this._getDisplayedText(currentValue)) {
        this._recallInternalValidation(currentValue, validationError);
        return;
      }
      var parsedDate = this._getParsedDate(text);
      var value = currentValue !== null && currentValue !== void 0 ? currentValue : this._getDateByDefault();
      var newValue = _ui.default.mergeDates(value, parsedDate, type);
      var date = parsedDate && type === 'time' ? newValue : parsedDate;
      if (this._applyInternalValidation(date).isValid) {
        var displayedText = this._getDisplayedText(newValue);
        if (value && newValue && value.getTime() === newValue.getTime() && displayedText !== text) {
          this._renderValue();
        } else {
          this.dateValue(newValue, e);
        }
      }
    },
    _recallInternalValidation: function _recallInternalValidation(value, validationError) {
      if (!validationError || validationError.editorSpecific) {
        this._applyInternalValidation(value);
        this._applyCustomValidation(value);
      }
    },
    _getDateByDefault: function _getDateByDefault() {
      return this._strategy.useCurrentDateByDefault() && this._strategy.getDefaultDate();
    },
    _getParsedDate: function _getParsedDate(text) {
      var displayFormat = this._strategy.getDisplayFormat(this.option('displayFormat'));
      var parsedText = this._strategy.getParsedText(text, displayFormat);
      return parsedText !== null && parsedText !== void 0 ? parsedText : undefined;
    },
    _applyInternalValidation: function _applyInternalValidation(value) {
      var text = this.option('text');
      var hasText = !!text && value !== null;
      var isDate = !!value && (0, _type.isDate)(value) && !isNaN(value.getTime());
      var isDateInRange = isDate && _date.default.dateInRange(value, this.dateOption('min'), this.dateOption('max'), this.option('type'));
      var isValid = !hasText && !value || isDateInRange;
      var validationMessage = '';
      if (!isDate) {
        validationMessage = this.option('invalidDateMessage');
      } else if (!isDateInRange) {
        validationMessage = this.option('dateOutOfRangeMessage');
      }
      this._updateInternalValidationState(isValid, validationMessage);
      return {
        isValid: isValid,
        isDate: isDate
      };
    },
    _updateInternalValidationState: function _updateInternalValidationState(isValid, validationMessage) {
      this.option({
        isValid: isValid,
        validationError: isValid ? null : {
          editorSpecific: true,
          message: validationMessage
        }
      });
    },
    _applyCustomValidation: function _applyCustomValidation(value) {
      this.validationRequest.fire({
        editor: this,
        value: this._serializeDate(value)
      });
    },
    _isValueChanged: function _isValueChanged(newValue) {
      var oldValue = this.dateOption('value');
      var oldTime = oldValue && oldValue.getTime();
      var newTime = newValue && newValue.getTime();
      return oldTime !== newTime;
    },
    _isTextChanged: function _isTextChanged(newValue) {
      var oldText = this.option('text');
      var newText = newValue && this._getDisplayedText(newValue) || '';
      return oldText !== newText;
    },
    _renderProps: function _renderProps() {
      this.callBase();
      this._input().attr('autocomplete', 'off');
    },
    _renderOpenedState: function _renderOpenedState() {
      if (!this._isNativeType()) {
        this.callBase();
      }
      if (this._strategy.isAdaptivityChanged()) {
        this._refreshStrategy();
      }
    },
    _getPopupTitle: function _getPopupTitle() {
      var placeholder = this.option('placeholder');
      if (placeholder) {
        return placeholder;
      }
      var type = this.option('type');
      if (type === TYPE.time) {
        return _message.default.format('dxDateBox-simulatedDataPickerTitleTime');
      }
      if (type === TYPE.date || type === TYPE.datetime) {
        return _message.default.format('dxDateBox-simulatedDataPickerTitleDate');
      }
      return '';
    },
    _refreshStrategy: function _refreshStrategy() {
      this._strategy.dispose();
      this._initStrategy();
      this.option(this._strategy.getDefaultOptions());
      this._refresh();
    },
    _applyButtonHandler: function _applyButtonHandler(e) {
      var value = this._strategy.getValue();
      this.dateValue(value, e.event);
      this.callBase();
    },
    _dispose: function _dispose() {
      var _this$_strategy3;
      this.callBase();
      (_this$_strategy3 = this._strategy) === null || _this$_strategy3 === void 0 ? void 0 : _this$_strategy3.dispose();
    },
    _isNativeType: function _isNativeType() {
      return this._pickerType === PICKER_TYPE['native'];
    },
    _updatePopupTitle: function _updatePopupTitle() {
      var _this$_popup;
      (_this$_popup = this._popup) === null || _this$_popup === void 0 ? void 0 : _this$_popup.option('title', this._getPopupTitle());
    },
    _optionChanged: function _optionChanged(args) {
      switch (args.name) {
        case 'showClearButton':
        case 'buttons':
          this.callBase.apply(this, arguments);
          this._formatValidationIcon();
          break;
        case 'pickerType':
          this._updatePickerOptions({
            pickerType: args.value
          });
          this._refreshStrategy();
          this._refreshPickerTypeClass();
          this._invalidate();
          break;
        case 'type':
          this._updatePickerOptions({
            format: args.value
          });
          this._refreshStrategy();
          this._refreshFormatClass();
          this._renderPopupWrapper();
          this._formatValidationIcon();
          this._updateValue();
          break;
        case 'placeholder':
          this.callBase.apply(this, arguments);
          this._updatePopupTitle();
          break;
        case 'min':
        case 'max':
          {
            var isValid = this.option('isValid');
            this._applyInternalValidation(this.dateOption('value'));
            if (!isValid) {
              this._applyCustomValidation(this.dateOption('value'));
            }
            this._invalidate();
            break;
          }
        case 'dateSerializationFormat':
        case 'interval':
        case 'disabledDates':
        case 'calendarOptions':
          this._invalidate();
          break;
        case 'displayFormat':
          this.option('text', this._getDisplayedText(this.dateOption('value')));
          this._renderInputValue();
          break;
        case 'text':
          this._strategy.textChangedHandler(args.value);
          this.callBase.apply(this, arguments);
          break;
        case 'isValid':
          this.callBase.apply(this, arguments);
          this._formatValidationIcon();
          break;
        case 'showDropDownButton':
          this._formatValidationIcon();
          this.callBase.apply(this, arguments);
          break;
        case 'readOnly':
          this.callBase.apply(this, arguments);
          this._formatValidationIcon();
          break;
        case 'todayButtonText':
          this._setPopupOption('toolbarItems', this._getPopupToolbarItems());
          break;
        case 'invalidDateMessage':
        case 'dateOutOfRangeMessage':
        case 'adaptivityEnabled':
        case 'showAnalogClock':
        case '_showValidationIcon':
          break;
        default:
          this.callBase.apply(this, arguments);
      }
    },
    _getSerializationFormat: function _getSerializationFormat() {
      var value = this.option('value');
      if (this.option('dateSerializationFormat') && (0, _config.default)().forceIsoDateParsing) {
        return this.option('dateSerializationFormat');
      }
      if ((0, _type.isNumeric)(value)) {
        return 'number';
      }
      if (!(0, _type.isString)(value)) {
        return;
      }
      return _date_serialization.default.getDateSerializationFormat(value);
    },
    _updateValue: function _updateValue(value) {
      this.callBase();
      this._applyInternalValidation(value !== null && value !== void 0 ? value : this.dateOption('value'));
    },
    dateValue: function dateValue(value, dxEvent) {
      var isValueChanged = this._isValueChanged(value);
      if (isValueChanged && dxEvent) {
        this._saveValueChangeEvent(dxEvent);
      }
      if (!isValueChanged) {
        if (this._isTextChanged(value)) {
          this._updateValue(value);
        } else if (this.option('text') === '') {
          this._applyCustomValidation(value);
        }
      }
      return this.dateOption('value', value);
    },
    dateOption: function dateOption(optionName, value) {
      if (arguments.length === 1) {
        return _date_serialization.default.deserializeDate(this.option(optionName));
      }
      this.option(optionName, this._serializeDate(value));
    },
    _serializeDate: function _serializeDate(date) {
      var serializationFormat = this._getSerializationFormat();
      return _date_serialization.default.serializeDate(date, serializationFormat);
    },
    _clearValue: function _clearValue() {
      var value = this.option('value');
      this.callBase();
      if (value === null) {
        this._applyCustomValidation(null);
      }
    },
    reset: function reset() {
      var value = this.option('value');
      this.callBase();
      if (value === null) {
        this._applyInternalValidation(null);
      }
    }
  });
  var _default = DateBox;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/window","../../core/utils/type","../../core/utils/dom","../../core/utils/iterator","../../core/utils/extend","../../core/utils/support","../../core/devices","../../core/config","../../core/utils/date","./ui.date_utils","../../core/utils/date_serialization","../drop_down_editor/ui.drop_down_editor","../../localization/date","../../localization/message","./ui.date_box.strategy.calendar","./ui.date_box.strategy.date_view","./ui.date_box.strategy.native","./ui.date_box.strategy.calendar_with_time","./ui.date_box.strategy.list"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/window"), require("../../core/utils/type"), require("../../core/utils/dom"), require("../../core/utils/iterator"), require("../../core/utils/extend"), require("../../core/utils/support"), require("../../core/devices"), require("../../core/config"), require("../../core/utils/date"), require("./ui.date_utils"), require("../../core/utils/date_serialization"), require("../drop_down_editor/ui.drop_down_editor"), require("../../localization/date"), require("../../localization/message"), require("./ui.date_box.strategy.calendar"), require("./ui.date_box.strategy.date_view"), require("./ui.date_box.strategy.native"), require("./ui.date_box.strategy.calendar_with_time"), require("./ui.date_box.strategy.list"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.date_box.base.js.map
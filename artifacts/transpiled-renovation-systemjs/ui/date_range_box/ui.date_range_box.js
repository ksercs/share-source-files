!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/date_range_box/ui.date_range_box.js"], ["../../core/renderer","../../core/component_registrator","../../core/dom_adapter","../../core/utils/extend","../../core/utils/icon","../../core/config","../../core/devices","../../localization/message","../themes","../editor/editor","./ui.multiselect_date_box","../text_box/texteditor_button_collection/index","../drop_down_editor/ui.drop_down_button","../text_box/ui.text_editor.clear","../../core/templates/function_template","./ui.date_range.utils","../../core/utils/iterator","../../core/utils/inflector"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/date_range_box/ui.date_range_box.js", ["../../core/renderer", "../../core/component_registrator", "../../core/dom_adapter", "../../core/utils/extend", "../../core/utils/icon", "../../core/config", "../../core/devices", "../../localization/message", "../themes", "../editor/editor", "./ui.multiselect_date_box", "../text_box/texteditor_button_collection/index", "../drop_down_editor/ui.drop_down_button", "../text_box/ui.text_editor.clear", "../../core/templates/function_template", "./ui.date_range.utils", "../../core/utils/iterator", "../../core/utils/inflector"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _component_registrator = _interopRequireDefault($__require("../../core/component_registrator"));
  var _dom_adapter = _interopRequireDefault($__require("../../core/dom_adapter"));
  var _extend = $__require("../../core/utils/extend");
  var _icon = $__require("../../core/utils/icon");
  var _config = _interopRequireDefault($__require("../../core/config"));
  var _devices = _interopRequireDefault($__require("../../core/devices"));
  var _message = _interopRequireDefault($__require("../../localization/message"));
  var _themes = $__require("../themes");
  var _editor = _interopRequireDefault($__require("../editor/editor"));
  var _ui = _interopRequireDefault($__require("./ui.multiselect_date_box"));
  var _index = _interopRequireDefault($__require("../text_box/texteditor_button_collection/index"));
  var _ui2 = _interopRequireDefault($__require("../drop_down_editor/ui.drop_down_button"));
  var _uiText_editor = _interopRequireDefault($__require("../text_box/ui.text_editor.clear"));
  var _function_template = $__require("../../core/templates/function_template");
  var _uiDate_range = $__require("./ui.date_range.utils");
  var _iterator = $__require("../../core/utils/iterator");
  var _inflector = $__require("../../core/utils/inflector");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
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
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }
  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];return arr2;
  }
  function _iterableToArrayLimit(arr, i) {
    var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];if (null != _i) {
      var _s,
          _e,
          _x,
          _r,
          _arr = [],
          _n = !0,
          _d = !1;try {
        if (_x = (_i = _i.call(arr)).next, 0 === i) {
          if (Object(_i) !== _i) return;_n = !1;
        } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
      } catch (err) {
        _d = !0, _e = err;
      } finally {
        try {
          if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
        } finally {
          if (_d) throw _e;
        }
      }return _arr;
    }
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);subClass.prototype.constructor = subClass;_setPrototypeOf(subClass, superClass);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;return o;
    };return _setPrototypeOf(o, p);
  }
  var DATERANGEBOX_CLASS = 'dx-daterangebox';
  var START_DATEBOX_CLASS = 'dx-start-datebox';
  var END_DATEBOX_CLASS = 'dx-end-datebox';
  var DATERANGEBOX_SEPARATOR_CLASS = 'dx-daterangebox-separator';
  var DROP_DOWN_EDITOR_BUTTON_ICON = 'dx-dropdowneditor-icon';
  var READONLY_STATE_CLASS = 'dx-state-readonly';
  var TEXTEDITOR_INPUT_CLASS = 'dx-texteditor-input';
  var ALLOWED_STYLING_MODES = ['outlined', 'filled', 'underlined'];
  var SEPARATOR_ICON_NAME = 'to';
  var EVENTS_LIST = ['KeyDown', 'KeyUp', 'Change', 'Cut', 'Copy', 'Paste', 'Input', 'EnterKey'];

  // STYLE dateRangeBox
  var DateRangeBox = /*#__PURE__*/function (_Editor) {
    _inheritsLoose(DateRangeBox, _Editor);
    function DateRangeBox() {
      return _Editor.apply(this, arguments) || this;
    }
    var _proto = DateRangeBox.prototype;
    _proto._getDefaultOptions = function _getDefaultOptions() {
      return (0, _extend.extend)(_Editor.prototype._getDefaultOptions.call(this), {
        acceptCustomValue: true,
        activeStateEnabled: true,
        applyButtonText: _message.default.format('OK'),
        applyValueMode: 'instantly',
        buttons: undefined,
        calendarOptions: {},
        cancelButtonText: _message.default.format('Cancel'),
        endDateOutOfRangeMessage: _message.default.format('dxDateBox-endDateOutOfRangeMessage'),
        dateSerializationFormat: undefined,
        deferRendering: true,
        disabledDates: null,
        displayFormat: null,
        dropDownButtonTemplate: 'dropDownButton',
        dropDownOptions: {},
        endDate: null,
        endDateInputAttr: {},
        endDateLabel: 'End Date',
        endDateName: '',
        endDatePlaceholder: '',
        endDateText: undefined,
        focusStateEnabled: true,
        hoverStateEnabled: true,
        invalidStartDateMessage: _message.default.format('dxDateBox-invalidStartDateMessage'),
        invalidEndDateMessage: _message.default.format('dxDateBox-invalidEndDateMessage'),
        isValid: true,
        labelMode: 'static',
        max: undefined,
        min: undefined,
        multiView: true,
        onChange: null,
        onClosed: null,
        onCopy: null,
        onCut: null,
        onEnterKey: null,
        onInput: null,
        onKeyDown: null,
        onKeyUp: null,
        onOpened: null,
        onPaste: null,
        onValueChanged: null,
        openOnFieldClick: true,
        opened: false,
        pickerType: 'calendar',
        readOnly: false,
        showClearButton: false,
        showDropDownButton: true,
        spellcheck: false,
        startDate: null,
        startDateInputAttr: {},
        startDateLabel: 'Start Date',
        startDateName: '',
        startDateOutOfRangeMessage: _message.default.format('dxDateBox-startDateOutOfRangeMessage'),
        startDatePlaceholder: '',
        startDateText: undefined,
        stylingMode: (0, _config.default)().editorStylingMode || 'outlined',
        todayButtonText: _message.default.format('dxCalendar-todayButtonText'),
        useHiddenSubmitElement: false,
        useMaskBehavior: false,
        validationError: null,
        validationErrors: null,
        validationMessageMode: 'auto',
        validationMessagePosition: 'auto',
        validationStatus: 'valid',
        value: [null, null],
        valueChangeEvent: 'change',
        _internalValidationErrors: [],
        _currentSelection: 'startDate'
      });
    };
    _proto._defaultOptionsRules = function _defaultOptionsRules() {
      return _Editor.prototype._defaultOptionsRules.call(this).concat([{
        device: function device() {
          var themeName = (0, _themes.current)();
          return (0, _themes.isMaterial)(themeName);
        },
        options: {
          stylingMode: (0, _config.default)().editorStylingMode || 'filled',
          labelMode: 'floating'
        }
      }, {
        device: function device() {
          var realDevice = _devices.default.real();
          var platform = realDevice.platform;
          return platform === 'ios' || platform === 'android';
        },
        options: {
          multiView: false
        }
      }]);
    };
    _proto._initOptions = function _initOptions(options) {
      _Editor.prototype._initOptions.call(this, options);
      var _this$initialOption = this.initialOption(),
          initialValue = _this$initialOption.value;
      var _this$option = this.option(),
          value = _this$option.value,
          startDate = _this$option.startDate,
          endDate = _this$option.endDate;
      if (value[0] && value[1] && (0, _uiDate_range.getDeserializedDate)(value[0]) > (0, _uiDate_range.getDeserializedDate)(value[1])) {
        value = [value[1], value[0]];
      }
      if (startDate && endDate && (0, _uiDate_range.getDeserializedDate)(startDate) > (0, _uiDate_range.getDeserializedDate)(endDate)) {
        var _ref = [endDate, startDate];
        startDate = _ref[0];
        endDate = _ref[1];
      }
      if ((0, _uiDate_range.isSameDateArrays)(initialValue, value)) {
        value = [startDate, endDate];
      } else {
        var _value = value;
        var _value2 = _slicedToArray(_value, 2);
        startDate = _value2[0];
        endDate = _value2[1];
      }
      this.option({
        startDate: startDate,
        endDate: endDate,
        value: value
      });
    };
    _proto._createOpenAction = function _createOpenAction() {
      this._openAction = this._createActionByOption('onOpened', {
        excludeValidators: ['disabled', 'readOnly']
      });
    };
    _proto._raiseOpenAction = function _raiseOpenAction() {
      if (!this._openAction) {
        this._createOpenAction();
      }
      this._openAction();
    };
    _proto._createCloseAction = function _createCloseAction() {
      this._closeAction = this._createActionByOption('onClosed', {
        excludeValidators: ['disabled', 'readOnly']
      });
    };
    _proto._raiseCloseAction = function _raiseCloseAction() {
      if (!this._closeAction) {
        this._createCloseAction();
      }
      this._closeAction();
    };
    _proto._createEventAction = function _createEventAction(eventName) {
      this["_".concat((0, _inflector.camelize)(eventName), "Action")] = this._createActionByOption("on".concat(eventName), {
        excludeValidators: ['readOnly']
      });
    };
    _proto._raiseAction = function _raiseAction(eventName, event) {
      var action = this["_".concat((0, _inflector.camelize)(eventName), "Action")];
      if (!action) {
        this._createEventAction(eventName);
      }
      this["_".concat((0, _inflector.camelize)(eventName), "Action")]({
        event: event
      });
    };
    _proto._initTemplates = function _initTemplates() {
      this._templateManager.addDefaultTemplates({
        dropDownButton: new _function_template.FunctionTemplate(function (options) {
          var $icon = (0, _renderer.default)('<div>').addClass(DROP_DOWN_EDITOR_BUTTON_ICON);
          (0, _renderer.default)(options.container).append($icon);
        })
      });
      this.callBase();
    };
    _proto._getDefaultButtons = function _getDefaultButtons() {
      return [{
        name: 'clear',
        Ctor: _uiText_editor.default
      }, {
        name: 'dropDown',
        Ctor: _ui2.default
      }];
    };
    _proto._initMarkup = function _initMarkup() {
      this.$element().addClass(DATERANGEBOX_CLASS)
      // TODO: remove next classes after adding styles
      .addClass('dx-texteditor').addClass('dx-datebox-date').addClass('dx-dropdowneditor');
      this._toggleReadOnlyState();
      this._renderStylingMode();
      // TODO: probably it need to update styling mode for dropDown in buttons container. It depends from design decision

      this._renderStartDateBox();
      this._renderSeparator();
      this._renderEndDateBox();
      this._renderButtonsContainer();
      _Editor.prototype._initMarkup.call(this);
    };
    _proto._attachKeyboardEvents = function _attachKeyboardEvents() {
      if (!this.option('readOnly')) {
        _Editor.prototype._attachKeyboardEvents.call(this);
      }
    };
    _proto._toggleReadOnlyState = function _toggleReadOnlyState() {
      var _this$option2 = this.option(),
          readOnly = _this$option2.readOnly;
      this.$element().toggleClass(READONLY_STATE_CLASS, !!readOnly);
      // TODO: should we add area readonly here?
    };
    _proto._getStylingModePrefix = function _getStylingModePrefix() {
      return "".concat(DATERANGEBOX_CLASS, "-");
    }

    // TODO: extract this part from Editor to separate file and use it here
    ;
    _proto._renderStylingMode = function _renderStylingMode() {
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
    };
    _proto._renderStartDateBox = function _renderStartDateBox() {
      this._$startDateBox = (0, _renderer.default)('<div>').addClass(START_DATEBOX_CLASS).appendTo(this.$element());
      this._startDateBox = this._createComponent(this._$startDateBox, _ui.default, this._getStartDateBoxConfig());
    };
    _proto._renderEndDateBox = function _renderEndDateBox() {
      this._$endDateBox = (0, _renderer.default)('<div>').addClass(END_DATEBOX_CLASS).appendTo(this.$element());
      this._endDateBox = this._createComponent(this._$endDateBox, _ui.default, this._getEndDateBoxConfig());
    };
    _proto._renderSeparator = function _renderSeparator() {
      // TODO: request design for rtl mode and research rtl mode appearance
      // TODO: add transform: scale(-1, 1) for mirror of the icon in rtl mode
      var $icon = (0, _icon.getImageContainer)(SEPARATOR_ICON_NAME);
      this._$separator = (0, _renderer.default)('<div>').addClass(DATERANGEBOX_SEPARATOR_CLASS).appendTo(this.$element());
      $icon.appendTo(this._$separator);
    };
    _proto._renderButtonsContainer = function _renderButtonsContainer() {
      this._buttonCollection = new _index.default(this, this._getDefaultButtons());
      this._$beforeButtonsContainer = null;
      this._$afterButtonsContainer = null;
      var _this$option3 = this.option(),
          buttons = _this$option3.buttons;
      this._$beforeButtonsContainer = this._buttonCollection.renderBeforeButtons(buttons, this.$element());
      this._$afterButtonsContainer = this._buttonCollection.renderAfterButtons(buttons, this.$element());
    };
    _proto._updateButtons = function _updateButtons(names) {
      this._buttonCollection.updateButtons(names);
    };
    _proto._openHandler = function _openHandler() {
      this._toggleOpenState();
    };
    _proto._shouldCallOpenHandler = function _shouldCallOpenHandler() {
      return true;
    };
    _proto._toggleOpenState = function _toggleOpenState() {
      var _this$option4 = this.option(),
          opened = _this$option4.opened;
      if (!opened) {
        this.getStartDateBox()._focusInput();
      }
      if (!this.option('readOnly')) {
        this.option('opened', !this.option('opened'));
      }
    };
    _proto._clearValueHandler = function _clearValueHandler(e) {
      this._saveValueChangeEvent(e);
      this._shouldSuppressValueSync = true;
      this.getEndDateBox()._clearValueHandler(e);
      this.getStartDateBox()._clearValueHandler(e);
      this._shouldSuppressValueSync = false;
      this.reset();
    };
    _proto._isClearButtonVisible = function _isClearButtonVisible() {
      return this.option('showClearButton') && !this.option('readOnly');
    };
    _proto._focusInHandler = function _focusInHandler(event) {
      if (this._shouldSkipFocusEvent(event)) {
        return;
      }
      _Editor.prototype._focusInHandler.call(this, event);
    };
    _proto._focusOutHandler = function _focusOutHandler(event) {
      if (this._shouldSkipFocusEvent(event)) {
        return;
      }
      _Editor.prototype._focusOutHandler.call(this, event);
    };
    _proto._shouldSkipFocusEvent = function _shouldSkipFocusEvent(event) {
      var target = event.target,
          relatedTarget = event.relatedTarget;
      return (0, _renderer.default)(target).is(this.startDateField()) && (0, _renderer.default)(relatedTarget).is(this.endDateField()) || (0, _renderer.default)(target).is(this.endDateField()) && (0, _renderer.default)(relatedTarget).is(this.startDateField());
    };
    _proto._getPickerType = function _getPickerType() {
      var _this$option5 = this.option(),
          pickerType = _this$option5.pickerType;
      return ['calendar', 'native'].includes(pickerType) ? pickerType : 'calendar';
    };
    _proto._getRestErrors = function _getRestErrors(allErrors, partialErrors) {
      return allErrors.filter(function (error) {
        return !partialErrors.some(function (prevError) {
          return error.message === prevError.message;
        });
      });
    };
    _proto._syncValidationErrors = function _syncValidationErrors(optionName, newPartialErrors, previousPartialErrors) {
      newPartialErrors || (newPartialErrors = []);
      previousPartialErrors || (previousPartialErrors = []);
      var allErrors = this.option(optionName) || [];
      var otherErrors = this._getRestErrors(allErrors, previousPartialErrors);
      this.option(optionName, [].concat(_toConsumableArray(otherErrors), _toConsumableArray(newPartialErrors)));
    };
    _proto._getDateBoxConfig = function _getDateBoxConfig() {
      var _this2 = this;
      var options = this.option();
      var dateBoxConfig = {
        acceptCustomValue: options.acceptCustomValue,
        activeStateEnabled: options.activeStateEnabled,
        applyValueMode: options.applyValueMode,
        dateOutOfRangeMessage: options.dateOutOfRangeMessage,
        dateSerializationFormat: options.dateSerializationFormat,
        deferRendering: options.deferRendering,
        disabled: options.disabled,
        displayFormat: options.displayFormat,
        focusStateEnabled: options.focusStateEnabled,
        tabIndex: options.tabIndex,
        height: options.height,
        hoverStateEnabled: options.hoverStateEnabled,
        labelMode: options.labelMode,
        max: options.max,
        min: options.min,
        openOnFieldClick: options.openOnFieldClick,
        pickerType: this._getPickerType(),
        readOnly: options.readOnly,
        rtlEnabled: options.rtlEnabled,
        spellcheck: options.spellcheck,
        stylingMode: 'underlined',
        type: 'date',
        useMaskBehavior: options.useMaskBehavior,
        validationMessageMode: options.validationMessageMode,
        validationMessagePosition: options.validationMessagePosition,
        valueChangeEvent: options.valueChangeEvent,
        onKeyDown: options.onKeyUp,
        onKeyUp: options.onKeyUp,
        onChange: options.onChange,
        onInput: options.onInput,
        onCut: options.onCut,
        onCopy: options.onCopy,
        onPaste: options.onPaste,
        onEnterKey: options.onEnterKey,
        _dateRangeBoxInstance: this,
        _showValidationMessage: false
      };
      (0, _iterator.each)(EVENTS_LIST, function (_, eventName) {
        var optionName = "on".concat(eventName);
        if (_this2.hasActionSubscription(optionName)) {
          dateBoxConfig[optionName] = function (e) {
            _this2._raiseAction(eventName, e.event);
          };
        }
      });
      return dateBoxConfig;
    };
    _proto._getStartDateBoxConfig = function _getStartDateBoxConfig() {
      var _this3 = this;
      var options = this.option();
      return _extends({}, this._getDateBoxConfig(), {
        applyButtonText: options.applyButtonText,
        calendarOptions: options.calendarOptions,
        cancelButtonText: options.cancelButtonText,
        dateOutOfRangeMessage: options.startDateOutOfRangeMessage,
        deferRendering: options.deferRendering,
        disabledDates: options.disabledDates,
        dropDownOptions: options.dropDownOptions,
        invalidDateMessage: options.invalidStartDateMessage,
        onValueChanged: function onValueChanged(_ref2) {
          var value = _ref2.value,
              event = _ref2.event;
          if (!_this3._shouldSuppressValueSync) {
            var newValue = [value, _this3.option('value')[1]];
            _this3.updateValue(newValue, event);
          }
        },
        opened: options.opened,
        onOpened: function onOpened() {
          _this3.option('opened', true);
          _this3._raiseOpenAction();
        },
        onClosed: function onClosed() {
          _this3.option('opened', false);
          _this3._raiseCloseAction();
        },
        onOptionChanged: function onOptionChanged(args) {
          var name = args.name,
              value = args.value,
              previousValue = args.previousValue;
          if (name === 'text') {
            _this3.option('startDateText', value);
          }
          if (name === 'validationErrors') {
            _this3._syncValidationErrors('_internalValidationErrors', value, previousValue);
          }
        },
        todayButtonText: options.todayButtonText,
        showClearButton: false,
        showDropDownButton: false,
        value: this.option('value')[0],
        label: options.startDateLabel,
        placeholder: options.startDatePlaceholder,
        inputAttr: options.startDateInputAttr,
        name: options.startDateName,
        _showValidationIcon: false
      });
    };
    _proto._getEndDateBoxConfig = function _getEndDateBoxConfig() {
      var _this4 = this;
      var options = this.option();
      return _extends({}, this._getDateBoxConfig(), {
        invalidDateMessage: options.invalidEndDateMessage,
        dateOutOfRangeMessage: options.endDateOutOfRangeMessage,
        dropDownOptions: {
          onShowing: function onShowing(e) {
            e.cancel = true;
            _this4.getStartDateBox().open();

            // TODO: datebox doesn't clear opened state after prevent of opening
            _this4.getEndDateBox().option('opened', false);
          }
        },
        onValueChanged: function onValueChanged(_ref3) {
          var value = _ref3.value,
              event = _ref3.event;
          if (!_this4._shouldSuppressValueSync) {
            var newValue = [_this4.option('value')[0], value];
            _this4.updateValue(newValue, event);
          }
        },
        onOptionChanged: function onOptionChanged(args) {
          var name = args.name,
              value = args.value,
              previousValue = args.previousValue;
          if (name === 'text') {
            _this4.option('endDateText', value);
          }
          if (name === 'validationErrors') {
            _this4._syncValidationErrors('_internalValidationErrors', value, previousValue);
          }
        },
        showClearButton: false,
        showDropDownButton: false,
        value: this.option('value')[1],
        label: options.endDateLabel,
        placeholder: options.endDatePlaceholder,
        deferRendering: true,
        inputAttr: options.endDateInputAttr,
        name: options.endDateName
      });
    };
    _proto._getValidationMessagePosition = function _getValidationMessagePosition() {
      var _this$option6 = this.option(),
          validationMessagePosition = _this$option6.validationMessagePosition;
      if (validationMessagePosition === 'auto') {
        return this.option('opened') ? 'top' : 'bottom';
      }
      return validationMessagePosition;
    };
    _proto.updateValue = function updateValue(newValue, event) {
      if (!(0, _uiDate_range.isSameDateArrays)(newValue, this.option('value'))) {
        if (event) {
          this._saveValueChangeEvent(event);
        }
        this.option('value', newValue);
      }
    };
    _proto._updateDateBoxesValue = function _updateDateBoxesValue(newValue) {
      var startDateBox = this.getStartDateBox();
      var endDateBox = this.getEndDateBox();
      var _newValue = _slicedToArray(newValue, 2),
          newStartDate = _newValue[0],
          newEndDate = _newValue[1];
      var oldStartDate = startDateBox.option('value');
      var oldEndDate = endDateBox.option('value');
      if (!(0, _uiDate_range.isSameDates)(newStartDate, oldStartDate)) {
        startDateBox.option('value', newStartDate);
      }
      if (!(0, _uiDate_range.isSameDates)(newEndDate, oldEndDate)) {
        endDateBox.option('value', newEndDate);
      }
    };
    _proto._renderAccessKey = function _renderAccessKey() {
      var $startDateInput = (0, _renderer.default)(this.field()[0]);
      var _this$option7 = this.option(),
          accessKey = _this$option7.accessKey;
      $startDateInput.attr('accesskey', accessKey);
    };
    _proto._focusTarget = function _focusTarget() {
      return this.$element().find(".".concat(TEXTEDITOR_INPUT_CLASS));
    };
    _proto._focusEventTarget = function _focusEventTarget() {
      return this.element();
    };
    _proto._focusClassTarget = function _focusClassTarget() {
      return this.$element();
    };
    _proto._toggleFocusClass = function _toggleFocusClass(isFocused, $element) {
      _Editor.prototype._toggleFocusClass.call(this, isFocused, this._focusClassTarget($element));
    };
    _proto._hasActiveElement = function _hasActiveElement() {
      var _this$field = this.field(),
          _this$field2 = _slicedToArray(_this$field, 2),
          startDateInput = _this$field2[0],
          endDateInput = _this$field2[1];
      return this._isActiveElement(startDateInput) || this._isActiveElement(endDateInput);
    };
    _proto._isActiveElement = function _isActiveElement(input) {
      return (0, _renderer.default)(input).is(_dom_adapter.default.getActiveElement(input));
    };
    _proto._cleanButtonContainers = function _cleanButtonContainers() {
      var _this$_$beforeButtons, _this$_$afterButtonsC;
      (_this$_$beforeButtons = this._$beforeButtonsContainer) === null || _this$_$beforeButtons === void 0 ? void 0 : _this$_$beforeButtons.remove();
      (_this$_$afterButtonsC = this._$afterButtonsContainer) === null || _this$_$afterButtonsC === void 0 ? void 0 : _this$_$afterButtonsC.remove();
      this._buttonCollection.clean();
      this._$beforeButtonsContainer = null;
      this._$afterButtonsContainer = null;
    };
    _proto._applyCustomValidation = function _applyCustomValidation(value) {
      this.validationRequest.fire({
        editor: this,
        value: value
      });
    };
    _proto._clean = function _clean() {
      var _this$_$startDateBox, _this$_$endDateBox, _this$_$separator;
      this._cleanButtonContainers();
      (_this$_$startDateBox = this._$startDateBox) === null || _this$_$startDateBox === void 0 ? void 0 : _this$_$startDateBox.remove();
      (_this$_$endDateBox = this._$endDateBox) === null || _this$_$endDateBox === void 0 ? void 0 : _this$_$endDateBox.remove();
      (_this$_$separator = this._$separator) === null || _this$_$separator === void 0 ? void 0 : _this$_$separator.remove();
      _Editor.prototype._clean.call(this);
    };
    _proto._optionChanged = function _optionChanged(args) {
      var name = args.name,
          fullName = args.fullName,
          value = args.value,
          previousValue = args.previousValue;
      switch (name) {
        case 'acceptCustomValue':
        case 'dateSerializationFormat':
        case 'displayFormat':
        case 'max':
        case 'min':
        case 'rtlEnabled': // super() call for rtlEnabled?
        case 'labelMode':
        case 'spellcheck':
        case 'useMaskBehavior':
        case 'valueChangeEvent':
          this.getStartDateBox().option(name, value);
          this.getEndDateBox().option(name, value);
          break;
        case 'applyButtonText':
        case 'applyValueMode':
        case 'cancelButtonText':
        case 'deferRendering':
        case 'disabledDates':
        case 'opened':
        case 'todayButtonText':
          this.getStartDateBox().option(name, value);
          break;
        case 'buttons':
          this._cleanButtonContainers();
          this._renderButtonsContainer();
          break;
        case 'calendarOptions':
        case 'dropDownOptions':
          this.getStartDateBox().option(fullName, value);
          break;
        case 'pickerType':
          {
            var pickerType = this._getPickerType();
            this.getStartDateBox().option(name, pickerType);
            this.getEndDateBox().option(name, pickerType);
            break;
          }
        case 'dateOutOfRangeMessage':
          break;
        case 'height':
          this.getStartDateBox().option(name, value);
          this.getEndDateBox().option(name, value);
          _Editor.prototype._optionChanged.call(this, args);
          break;
        case 'dropDownButtonTemplate':
        case 'showDropDownButton':
          this._updateButtons(['dropDown']);
          break;
        case 'showClearButton':
          this._updateButtons(['clear']);
          break;
        case 'endDate':
          this.updateValue([this.option('value')[0], value]);
          break;
        case 'startDateLabel':
          this.getStartDateBox().option('label', value);
          break;
        case 'endDateLabel':
          this.getEndDateBox().option('label', value);
          break;
        case 'startDatePlaceholder':
          this.getStartDateBox().option('placeholder', value);
          break;
        case 'endDatePlaceholder':
          this.getEndDateBox().option('placeholder', value);
          break;
        case 'startDateInputAttr':
          this.getStartDateBox().option('inputAttr', value);
          break;
        case 'startDateName':
          this.getStartDateBox().option('name', value);
          break;
        case 'endDateInputAttr':
          this.getEndDateBox().option('inputAttr', value);
          break;
        case 'endDateName':
          this.getEndDateBox().option('name', value);
          break;
        case 'multiView':
          this.getStartDateBox().option('calendarOptions.viewsCount', value ? 2 : 1);
          break;
        case 'tabIndex':
        case 'focusStateEnabled':
          _Editor.prototype._optionChanged.call(this, args);
          this.getStartDateBox().option(name, value);
          this.getEndDateBox().option(name, value);
          break;
        case 'onValueChanged':
          this._createValueChangeAction();
          break;
        case 'onOpened':
          this._createOpenAction();
          break;
        case 'onClosed':
          this._createCloseAction();
          break;
        case 'onKeyDown':
        case 'onKeyUp':
        case 'onChange':
        case 'onInput':
        case 'onCut':
        case 'onCopy':
        case 'onPaste':
        case 'onEnterKey':
          this._createEventAction(name.replace('on', ''));
          break;
        case 'openOnFieldClick':
          break;
        case 'readOnly':
          this._updateButtons();
          _Editor.prototype._optionChanged.call(this, args);
          this.getStartDateBox().option(name, value);
          this.getEndDateBox().option(name, value);
          break;
        case 'disabled':
          this._updateButtons();
          _Editor.prototype._optionChanged.call(this, args);
          this.getStartDateBox().option(name, value);
          this.getEndDateBox().option(name, value);
          break;
        case 'startDate':
          this.updateValue([value, this.option('value')[1]]);
          break;
        case 'stylingMode':
          this._renderStylingMode();
          break;
        case 'startDateText':
        case 'endDateText':
        case 'useHiddenSubmitElement':
          break;
        case 'invalidStartDateMessage':
          this.getStartDateBox().option('invalidDateMessage', value);
          break;
        case 'invalidEndDateMessage':
          this.getEndDateBox().option('invalidDateMessage', value);
          break;
        case 'startDateOutOfRangeMessage':
          this.getStartDateBox().option('dateOutOfRangeMessage', value);
          break;
        case 'endDateOutOfRangeMessage':
          this.getEndDateBox().option('dateOutOfRangeMessage', value);
          break;
        case 'validationMessagePosition':
          this.getStartDateBox().option(name, value);
          _Editor.prototype._optionChanged.call(this, args);
          break;
        case '_internalValidationErrors':
          {
            this._syncValidationErrors('validationErrors', value, previousValue);
            var validationErrors = this.option('validationErrors');
            this.option('isValid', !(validationErrors !== null && validationErrors !== void 0 && validationErrors.length));
            break;
          }
        case 'isValid':
          {
            this.getEndDateBox().option(name, value);
            var isValid = value && !this.option('_internalValidationErrors').length;
            if (this._shouldSkipIsValidChange || isValid === value) {
              _Editor.prototype._optionChanged.call(this, args);
              return;
            }
            this._shouldSkipIsValidChange = true;
            this.option('isValid', isValid);
            this._shouldSkipIsValidChange = false;
            break;
          }
        case 'validationErrors':
          {
            var internalValidationErrors = this.option('_internalValidationErrors') || [];
            var allErrors = value || [];
            var externalErrors = this._getRestErrors(allErrors, internalValidationErrors);
            var errors = [].concat(_toConsumableArray(externalErrors), _toConsumableArray(internalValidationErrors));
            var newValue = errors.length ? errors : null;
            this._options.silent('validationErrors', newValue);
            _Editor.prototype._optionChanged.call(this, _extends({}, args, {
              value: newValue
            }));
            break;
          }
        case 'value':
          {
            var _newValue2 = (0, _uiDate_range.sortDatesArray)(value);
            if (!(0, _uiDate_range.isSameDateArrays)(_newValue2, previousValue)) {
              this._setOptionWithoutOptionChange('value', _newValue2);
              this._setOptionWithoutOptionChange('startDate', _newValue2[0]);
              this._setOptionWithoutOptionChange('endDate', _newValue2[1]);
              this._applyCustomValidation(_newValue2);
              this._raiseValueChangeAction(_newValue2, previousValue);
              this._saveValueChangeEvent(undefined);
              this._updateDateBoxesValue(_newValue2);
            }
            break;
          }
        case '_currentSelection':
          // TODO: change calendar option here?
          break;
        default:
          _Editor.prototype._optionChanged.call(this, args);
      }
    };
    _proto.getStartDateBox = function getStartDateBox() {
      return this._startDateBox;
    };
    _proto.getEndDateBox = function getEndDateBox() {
      return this._endDateBox;
    };
    _proto.getButton = function getButton(name) {
      return this._buttonCollection.getButton(name);
    };
    _proto.open = function open() {
      this.option('opened', true);
    };
    _proto.close = function close() {
      this.option('opened', false);
    };
    _proto.content = function content() {
      return this.getStartDateBox().content();
    };
    _proto.field = function field() {
      return [this.startDateField(), this.endDateField()];
    };
    _proto.startDateField = function startDateField() {
      return this.getStartDateBox().field();
    };
    _proto.endDateField = function endDateField() {
      return this.getEndDateBox().field();
    };
    _proto.focus = function focus() {
      this.getStartDateBox().focus();
    };
    _proto.reset = function reset() {
      // this.getEndDateBox().reset();
      // this.getStartDateBox().reset();

      _Editor.prototype.reset.call(this);
    };
    return DateRangeBox;
  }(_editor.default);
  (0, _component_registrator.default)('dxDateRangeBox', DateRangeBox);
  var _default = DateRangeBox;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/renderer","../../core/component_registrator","../../core/dom_adapter","../../core/utils/extend","../../core/utils/icon","../../core/config","../../core/devices","../../localization/message","../themes","../editor/editor","./ui.multiselect_date_box","../text_box/texteditor_button_collection/index","../drop_down_editor/ui.drop_down_button","../text_box/ui.text_editor.clear","../../core/templates/function_template","./ui.date_range.utils","../../core/utils/iterator","../../core/utils/inflector"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/renderer"), require("../../core/component_registrator"), require("../../core/dom_adapter"), require("../../core/utils/extend"), require("../../core/utils/icon"), require("../../core/config"), require("../../core/devices"), require("../../localization/message"), require("../themes"), require("../editor/editor"), require("./ui.multiselect_date_box"), require("../text_box/texteditor_button_collection/index"), require("../drop_down_editor/ui.drop_down_button"), require("../text_box/ui.text_editor.clear"), require("../../core/templates/function_template"), require("./ui.date_range.utils"), require("../../core/utils/iterator"), require("../../core/utils/inflector"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.date_range_box.js.map
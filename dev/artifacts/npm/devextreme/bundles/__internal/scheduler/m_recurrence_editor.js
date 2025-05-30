/**
* DevExtreme (bundles/__internal/scheduler/m_recurrence_editor.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("../../ui/radio_group");
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _guid = _interopRequireDefault(require("../../core/guid"));
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _date = _interopRequireDefault(require("../../core/utils/date"));
var _extend = require("../../core/utils/extend");
var _type = require("../../core/utils/type");
var _date2 = _interopRequireDefault(require("../../localization/date"));
var _message = _interopRequireDefault(require("../../localization/message"));
var _types = require("../../renovation/ui/scheduler/timeZoneCalculator/types");
var _button_group = _interopRequireDefault(require("../../ui/button_group"));
var _date_box = _interopRequireDefault(require("../../ui/date_box"));
var _editor = _interopRequireDefault(require("../../ui/editor/editor"));
var _form = _interopRequireDefault(require("../../ui/form"));
var _number_box = _interopRequireDefault(require("../../ui/number_box"));
var _m_recurrence = require("./m_recurrence");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); } /* eslint-disable max-classes-per-file, spellcheck/spell-checker */
var RECURRENCE_EDITOR = 'dx-recurrence-editor';
var LABEL_POSTFIX = '-label';
var WRAPPER_POSTFIX = '-wrapper';
var RECURRENCE_EDITOR_CONTAINER = 'dx-recurrence-editor-container';
var REPEAT_END_EDITOR = 'dx-recurrence-repeat-end';
var REPEAT_END_TYPE_EDITOR = 'dx-recurrence-radiogroup-repeat-type';
var REPEAT_COUNT_EDITOR = 'dx-recurrence-numberbox-repeat-count';
var REPEAT_UNTIL_DATE_EDITOR = 'dx-recurrence-datebox-until-date';
var RECURRENCE_BUTTON_GROUP = 'dx-recurrence-button-group';
var FREQUENCY_EDITOR = 'dx-recurrence-selectbox-freq';
var INTERVAL_EDITOR = 'dx-recurrence-numberbox-interval';
var REPEAT_ON_EDITOR = 'dx-recurrence-repeat-on';
var DAY_OF_MONTH = 'dx-recurrence-numberbox-day-of-month';
var MONTH_OF_YEAR = 'dx-recurrence-selectbox-month-of-year';
var recurrentEditorNumberBoxWidth = 70;
var recurrentEditorSelectBoxWidth = 120;
var defaultRecurrenceTypeIndex = 1; // TODO default daily recurrence
var frequenciesMessages = [
/* {
      // functionality is not removed, but hide the ability to set minute recurrence in the editor.
      // in the future, if we publish the dxRecurrenceEditor, then we publish the minute recurrence
      recurrence: 'dxScheduler-recurrenceMinutely',
      value: 'minutely'
  } */
{
  recurrence: 'dxScheduler-recurrenceHourly',
  value: 'hourly'
}, {
  recurrence: 'dxScheduler-recurrenceDaily',
  value: 'daily'
}, {
  recurrence: 'dxScheduler-recurrenceWeekly',
  value: 'weekly'
}, {
  recurrence: 'dxScheduler-recurrenceMonthly',
  value: 'monthly'
}, {
  recurrence: 'dxScheduler-recurrenceYearly',
  value: 'yearly'
}];
var frequencies = frequenciesMessages.map(function (item) {
  return {
    text() {
      return _message.default.format(item.recurrence);
    },
    value: item.value
  };
});
var repeatEndTypes = [{
  type: 'never'
}, {
  type: 'until'
}, {
  type: 'count'
}];
var days = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
var RecurrenceRule = /*#__PURE__*/function () {
  function RecurrenceRule(rule) {
    this._recurrenceProcessor = (0, _m_recurrence.getRecurrenceProcessor)();
    this._recurrenceProcessor = (0, _m_recurrence.getRecurrenceProcessor)();
    this._recurrenceRule = this._recurrenceProcessor.evalRecurrenceRule(rule).rule;
  }
  var _proto = RecurrenceRule.prototype;
  _proto.makeRules = function makeRules(string) {
    this._recurrenceRule = this._recurrenceProcessor.evalRecurrenceRule(string).rule;
  };
  _proto.makeRule = function makeRule(field, value) {
    if (!value || Array.isArray(value) && !value.length) {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete this._recurrenceRule[field];
      return;
    }
    if ((0, _type.isDefined)(field)) {
      if (field === 'until') {
        delete this._recurrenceRule.count;
      }
      if (field === 'count') {
        delete this._recurrenceRule.until;
      }
      this._recurrenceRule[field] = value;
    }
  };
  _proto.getRepeatEndRule = function getRepeatEndRule() {
    var rules = this._recurrenceRule;
    if ('count' in rules) {
      return 'count';
    }
    if ('until' in rules) {
      return 'until';
    }
    return 'never';
  };
  _proto.getRecurrenceString = function getRecurrenceString() {
    return this._recurrenceProcessor.getRecurrenceString(this._recurrenceRule);
  };
  _proto.getRules = function getRules() {
    return this._recurrenceRule;
  };
  _proto.getDaysFromByDayRule = function getDaysFromByDayRule() {
    return this._recurrenceProcessor.daysFromByDayRule(this._recurrenceRule);
  };
  return RecurrenceRule;
}();
var RecurrenceEditor = /*#__PURE__*/function (_Editor) {
  _inheritsLoose(RecurrenceEditor, _Editor);
  function RecurrenceEditor() {
    return _Editor.apply(this, arguments) || this;
  }
  var _proto2 = RecurrenceEditor.prototype;
  _proto2._getDefaultOptions = function _getDefaultOptions() {
    // @ts-expect-error
    var defaultOptions = _Editor.prototype._getDefaultOptions.call(this);
    return (0, _extend.extend)(defaultOptions, {
      value: null,
      startDate: new Date(),
      firstDayOfWeek: undefined
    });
  };
  _proto2._getFirstDayOfWeek = function _getFirstDayOfWeek() {
    var firstDayOfWeek = this.option('firstDayOfWeek');
    return (0, _type.isDefined)(firstDayOfWeek) ? firstDayOfWeek : _date2.default.firstDayOfWeekIndex();
  };
  _proto2._createComponent = function _createComponent(element, name) {
    var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    // @ts-expect-error
    this._extendConfig(config, {
      readOnly: this.option('readOnly')
    });
    // @ts-expect-error
    return _Editor.prototype._createComponent.call(this, element, name, config);
  };
  _proto2._init = function _init() {
    // @ts-expect-error
    _Editor.prototype._init.call(this);
    this._recurrenceRule = new RecurrenceRule(this.option('value'));
  };
  _proto2._render = function _render() {
    // @ts-expect-error
    _Editor.prototype._render.call(this);
    this.$element().addClass(RECURRENCE_EDITOR);
    this._$container = (0, _renderer.default)('<div>').addClass(RECURRENCE_EDITOR_CONTAINER).appendTo(this.$element());
    this._prepareEditors();
    this._renderEditors(this._$container);
  };
  _proto2.getEditorByField = function getEditorByField(fieldName) {
    var editor = this.getRecurrenceForm().getEditor(fieldName);
    if (!(0, _type.isDefined)(editor)) {
      switch (fieldName) {
        case 'byday':
          editor = this._weekEditor;
          break;
        case 'count':
          editor = this._repeatCountEditor;
          break;
        case 'until':
          editor = this._repeatUntilDate;
          break;
        default:
          break;
      }
    }
    return editor;
  };
  _proto2._prepareEditors = function _prepareEditors() {
    var freq = (this._recurrenceRule.getRules().freq || frequenciesMessages[defaultRecurrenceTypeIndex].value).toLowerCase();
    this._editors = [this._createFreqEditor(freq), this._createIntervalEditor(freq), this._createRepeatOnLabel(freq), {
      itemType: 'group',
      cssClass: REPEAT_ON_EDITOR,
      colCount: 2,
      colCountByScreen: {
        xs: 2
      },
      items: this._createRepeatOnEditor(freq)
    }, {
      itemType: 'group',
      items: this._createRepeatEndEditor()
    }];
    return this._editors;
  };
  _proto2._createFreqEditor = function _createFreqEditor(freq) {
    var _this = this;
    return {
      dataField: 'freq',
      name: 'FREQ',
      editorType: 'dxSelectBox',
      cssClass: FREQUENCY_EDITOR,
      editorOptions: {
        items: frequencies,
        value: freq,
        field: 'freq',
        valueExpr: 'value',
        displayExpr: 'text',
        layout: 'horizontal',
        elementAttr: {
          class: FREQUENCY_EDITOR
        },
        onValueChanged: function onValueChanged(args) {
          return _this._valueChangedHandler(args);
        }
      },
      label: {
        text: _message.default.format('dxScheduler-editorLabelRecurrence')
      }
    };
  };
  _proto2._createIntervalEditor = function _createIntervalEditor(freq) {
    var _this2 = this;
    var interval = this._recurrenceRule.getRules().interval || 1;
    return {
      itemType: 'group',
      colCount: 2,
      cssClass: "".concat(INTERVAL_EDITOR).concat(WRAPPER_POSTFIX),
      colCountByScreen: {
        xs: 2
      },
      items: [{
        dataField: 'interval',
        editorType: 'dxNumberBox',
        editorOptions: {
          format: '#',
          width: recurrentEditorNumberBoxWidth,
          min: 1,
          field: 'interval',
          value: interval,
          showSpinButtons: true,
          useLargeSpinButtons: false,
          elementAttr: {
            class: INTERVAL_EDITOR
          },
          onValueChanged: function onValueChanged(args) {
            return _this2._valueChangedHandler(args);
          }
        },
        label: {
          text: _message.default.format('dxScheduler-recurrenceRepeatEvery')
        }
      }, {
        name: 'intervalLabel',
        cssClass: "".concat(INTERVAL_EDITOR).concat(LABEL_POSTFIX),
        template: function template() {
          return _message.default.format("dxScheduler-recurrenceRepeat".concat(freq.charAt(0).toUpperCase()).concat(freq.substr(1).toLowerCase()));
        }
      }]
    };
  };
  _proto2._createRepeatOnLabel = function _createRepeatOnLabel(freq) {
    return {
      itemType: 'group',
      cssClass: "".concat(REPEAT_ON_EDITOR).concat(LABEL_POSTFIX),
      items: [{
        name: 'repeatOnLabel',
        colSpan: 2,
        template: function template() {
          return _message.default.format('dxScheduler-recurrenceRepeatOn');
        },
        visible: freq && freq !== 'daily' && freq !== 'hourly'
      }]
    };
  };
  _proto2._createRepeatOnEditor = function _createRepeatOnEditor(freq) {
    return [this._createByDayEditor(freq), this._createByMonthEditor(freq), this._createByMonthDayEditor(freq)];
  };
  _proto2._createByDayEditor = function _createByDayEditor(freq) {
    var _this3 = this;
    return {
      dataField: 'byday',
      colSpan: 2,
      template: function template(_, itemElement) {
        var firstDayOfWeek = _this3._getFirstDayOfWeek();
        var byDay = _this3._daysOfWeekByRules();
        var localDaysNames = _date2.default.getDayNames('abbreviated');
        var dayNames = days.slice(firstDayOfWeek).concat(days.slice(0, firstDayOfWeek));
        var itemsButtonGroup = localDaysNames.slice(firstDayOfWeek).concat(localDaysNames.slice(0, firstDayOfWeek)).map(function (item, index) {
          return {
            text: item,
            key: dayNames[index]
          };
        });
        _this3._$repeatOnWeek = (0, _renderer.default)('<div>').addClass(RECURRENCE_BUTTON_GROUP).appendTo(itemElement);
        _this3._weekEditor = _this3._createComponent(_this3._$repeatOnWeek, _button_group.default, {
          items: itemsButtonGroup,
          field: 'byday',
          selectionMode: 'multiple',
          selectedItemKeys: byDay,
          keyExpr: 'key',
          onSelectionChanged: function onSelectionChanged(e) {
            var selectedItemKeys = e.component.option('selectedItemKeys');
            var selectedKeys = (selectedItemKeys === null || selectedItemKeys === void 0 ? void 0 : selectedItemKeys.length) ? selectedItemKeys : _this3._getDefaultByDayValue();
            _this3._recurrenceRule.makeRule('byday', selectedKeys);
            _this3._changeEditorValue();
          }
        });
      },
      visible: freq === 'weekly',
      label: {
        visible: false
      }
    };
  };
  _proto2._createByMonthEditor = function _createByMonthEditor(freq) {
    var _this4 = this;
    var monthsName = _date2.default.getMonthNames('wide');
    var months = _toConsumableArray(Array(12)).map(function (_, i) {
      return {
        value: "".concat(i + 1),
        text: monthsName[i]
      };
    });
    return {
      dataField: 'bymonth',
      editorType: 'dxSelectBox',
      editorOptions: {
        field: 'bymonth',
        items: months,
        value: this._monthOfYearByRules(),
        width: recurrentEditorSelectBoxWidth,
        displayExpr: 'text',
        valueExpr: 'value',
        elementAttr: {
          class: MONTH_OF_YEAR
        },
        onValueChanged: function onValueChanged(args) {
          return _this4._valueChangedHandler(args);
        }
      },
      visible: freq === 'yearly',
      label: {
        visible: false
      }
    };
  };
  _proto2._createByMonthDayEditor = function _createByMonthDayEditor(freq) {
    var _this5 = this;
    return {
      dataField: 'bymonthday',
      editorType: 'dxNumberBox',
      editorOptions: {
        min: 1,
        max: 31,
        format: '#',
        width: recurrentEditorNumberBoxWidth,
        field: 'bymonthday',
        showSpinButtons: true,
        useLargeSpinButtons: false,
        value: this._dayOfMonthByRules(),
        elementAttr: {
          class: DAY_OF_MONTH
        },
        onValueChanged: function onValueChanged(args) {
          return _this5._valueChangedHandler(args);
        }
      },
      visible: freq === 'monthly' || freq === 'yearly',
      label: {
        visible: false
      }
    };
  };
  _proto2._createRepeatEndEditor = function _createRepeatEndEditor() {
    var _this6 = this;
    var repeatType = this._recurrenceRule.getRepeatEndRule();
    return [{
      dataField: 'repeatEnd',
      editorType: 'dxRadioGroup',
      editorOptions: {
        items: repeatEndTypes,
        value: repeatType,
        valueExpr: 'type',
        field: 'repeatEnd',
        itemTemplate: function itemTemplate(itemData) {
          if (itemData.type === 'count') {
            return _this6._renderRepeatCountEditor();
          }
          if (itemData.type === 'until') {
            return _this6._renderRepeatUntilEditor();
          }
          return _this6._renderDefaultRepeatEnd();
        },
        layout: 'vertical',
        elementAttr: {
          class: REPEAT_END_TYPE_EDITOR
        },
        onValueChanged: function onValueChanged(args) {
          return _this6._repeatEndValueChangedHandler(args);
        }
      },
      label: {
        text: _message.default.format('dxScheduler-recurrenceEnd')
      }
    }];
  };
  _proto2._renderEditors = function _renderEditors($container) {
    this._recurrenceForm = this._createComponent($container, _form.default, {
      items: this._editors,
      showValidationSummary: false,
      scrollingEnabled: true,
      showColonAfterLabel: false,
      labelLocation: 'top'
    });
    this._disableRepeatEndParts();
  };
  _proto2._setAriaDescribedBy = function _setAriaDescribedBy(editor, $label) {
    var labelId = "label-".concat(new _guid.default());
    editor.setAria('describedby', labelId);
    editor.setAria('id', labelId, $label);
  };
  _proto2.getRecurrenceForm = function getRecurrenceForm() {
    return this._recurrenceForm;
  };
  _proto2.changeValueByVisibility = function changeValueByVisibility(value) {
    if (value) {
      if (!this.option('value')) {
        this._handleDefaults();
      }
    } else {
      this._recurrenceRule.makeRules('');
      this.option('value', '');
    }
  };
  _proto2._handleDefaults = function _handleDefaults() {
    this._recurrenceRule.makeRule('freq', frequenciesMessages[defaultRecurrenceTypeIndex].value);
    this._changeEditorValue();
  };
  _proto2._changeEditorValue = function _changeEditorValue() {
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    this.option('value', this._recurrenceRule.getRecurrenceString() || '');
  };
  _proto2._daysOfWeekByRules = function _daysOfWeekByRules() {
    var daysByRule = this._recurrenceRule.getDaysFromByDayRule();
    if (!daysByRule.length) {
      daysByRule = this._getDefaultByDayValue();
    }
    return daysByRule;
  };
  _proto2._getDefaultByDayValue = function _getDefaultByDayValue() {
    var startDate = this.option('startDate');
    var startDay = startDate.getDay();
    return [days[startDay]];
  };
  _proto2._dayOfMonthByRules = function _dayOfMonthByRules() {
    var dayByRule = this._recurrenceRule.getRules().bymonthday;
    if (!dayByRule) {
      dayByRule = this.option('startDate').getDate();
    }
    return dayByRule;
  };
  _proto2._monthOfYearByRules = function _monthOfYearByRules() {
    var monthByRule = this._recurrenceRule.getRules().bymonth;
    if (!monthByRule) {
      monthByRule = this.option('startDate').getMonth() + 1;
    }
    return String(monthByRule);
  };
  _proto2._renderDefaultRepeatEnd = function _renderDefaultRepeatEnd() {
    var $editorTemplate = (0, _renderer.default)('<div>').addClass(REPEAT_END_EDITOR + WRAPPER_POSTFIX);
    (0, _renderer.default)('<div>').text(_message.default.format('dxScheduler-recurrenceNever')).addClass(REPEAT_END_EDITOR + LABEL_POSTFIX).appendTo($editorTemplate);
    return $editorTemplate;
  };
  _proto2._repeatEndValueChangedHandler = function _repeatEndValueChangedHandler(args) {
    var value = args.value;
    this._disableRepeatEndParts(value);
    if (value === 'until') {
      this._recurrenceRule.makeRule(value, this._getUntilValue());
    }
    if (value === 'count') {
      this._recurrenceRule.makeRule(value, this._repeatCountEditor.option('value'));
    }
    if (value === 'never') {
      this._recurrenceRule.makeRule('count', '');
      this._recurrenceRule.makeRule('until', '');
    }
    this._changeEditorValue();
  };
  _proto2._disableRepeatEndParts = function _disableRepeatEndParts() {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._recurrenceRule.getRepeatEndRule();
    if (value === 'until') {
      this._repeatCountEditor.option('disabled', true);
      this._repeatUntilDate.option('disabled', false);
    }
    if (value === 'count') {
      this._repeatCountEditor.option('disabled', false);
      this._repeatUntilDate.option('disabled', true);
    }
    if (value === 'never') {
      this._repeatCountEditor.option('disabled', true);
      this._repeatUntilDate.option('disabled', true);
    }
  };
  _proto2._renderRepeatCountEditor = function _renderRepeatCountEditor() {
    var repeatCount = this._recurrenceRule.getRules().count || 1;
    var $editorWrapper = (0, _renderer.default)('<div>').addClass(REPEAT_END_EDITOR + WRAPPER_POSTFIX);
    (0, _renderer.default)('<div>').text(_message.default.format('dxScheduler-recurrenceAfter')).addClass(REPEAT_END_EDITOR + LABEL_POSTFIX).appendTo($editorWrapper);
    this._$repeatCountEditor = (0, _renderer.default)('<div>').addClass(REPEAT_COUNT_EDITOR).appendTo($editorWrapper);
    (0, _renderer.default)('<div>').text(_message.default.format('dxScheduler-recurrenceRepeatCount')).addClass(REPEAT_END_EDITOR + LABEL_POSTFIX).appendTo($editorWrapper);
    this._repeatCountEditor = this._createComponent(this._$repeatCountEditor, _number_box.default, {
      field: 'count',
      format: '#',
      width: recurrentEditorNumberBoxWidth,
      min: 1,
      showSpinButtons: true,
      useLargeSpinButtons: false,
      value: repeatCount,
      onValueChanged: this._repeatCountValueChangeHandler.bind(this)
    });
    return $editorWrapper;
  };
  _proto2._repeatCountValueChangeHandler = function _repeatCountValueChangeHandler(args) {
    if (this._recurrenceRule.getRepeatEndRule() === 'count') {
      var value = args.value;
      this._recurrenceRule.makeRule('count', value);
      this._changeEditorValue();
    }
  };
  _proto2._formatUntilDate = function _formatUntilDate(date) {
    if (this._recurrenceRule.getRules().until && _date.default.sameDate(this._recurrenceRule.getRules().until, date)) {
      return date;
    }
    return _date.default.setToDayEnd(date);
  };
  _proto2._renderRepeatUntilEditor = function _renderRepeatUntilEditor() {
    var repeatUntil = this._getUntilValue();
    var $editorWrapper = (0, _renderer.default)('<div>').addClass(REPEAT_END_EDITOR + WRAPPER_POSTFIX);
    (0, _renderer.default)('<div>').text(_message.default.format('dxScheduler-recurrenceOn')).addClass(REPEAT_END_EDITOR + LABEL_POSTFIX).appendTo($editorWrapper);
    this._$repeatDateEditor = (0, _renderer.default)('<div>').addClass(REPEAT_UNTIL_DATE_EDITOR).appendTo($editorWrapper);
    this._repeatUntilDate = this._createComponent(this._$repeatDateEditor, _date_box.default, {
      field: 'until',
      value: repeatUntil,
      type: 'date',
      onValueChanged: this._repeatUntilValueChangeHandler.bind(this),
      calendarOptions: {
        firstDayOfWeek: this._getFirstDayOfWeek()
      },
      useMaskBehavior: true
    });
    return $editorWrapper;
  };
  _proto2._repeatUntilValueChangeHandler = function _repeatUntilValueChangeHandler(args) {
    if (this._recurrenceRule.getRepeatEndRule() === 'until') {
      var dateInTimeZone = this._formatUntilDate(new Date(args.value));
      var getStartDateTimeZone = this.option('getStartDateTimeZone');
      var appointmentTimeZone = getStartDateTimeZone();
      var path = appointmentTimeZone ? _types.PathTimeZoneConversion.fromAppointmentToSource : _types.PathTimeZoneConversion.fromGridToSource;
      var dateInLocaleTimeZone = this.option('timeZoneCalculator').createDate(dateInTimeZone, {
        path,
        appointmentTimeZone
      });
      this._recurrenceRule.makeRule('until', dateInLocaleTimeZone);
      this._changeEditorValue();
    }
  };
  _proto2._valueChangedHandler = function _valueChangedHandler(args) {
    var value = args.value,
      previousValue = args.previousValue;
    var field = args.component.option('field');
    if (!this.option('visible')) {
      this.option('value', '');
    } else {
      this._recurrenceRule.makeRule(field, value);
      if (field === 'freq') {
        this._makeRepeatOnRule(value);
        this._changeRepeatOnVisibility(value, previousValue);
      }
      this._changeEditorValue();
    }
  };
  _proto2._makeRepeatOnRule = function _makeRepeatOnRule(value) {
    if (value === 'daily' || value === 'hourly') {
      this._recurrenceRule.makeRule('byday', '');
      this._recurrenceRule.makeRule('bymonth', '');
      this._recurrenceRule.makeRule('bymonthday', '');
    }
    if (value === 'weekly') {
      this._recurrenceRule.makeRule('byday', this._daysOfWeekByRules());
      this._recurrenceRule.makeRule('bymonth', '');
      this._recurrenceRule.makeRule('bymonthday', '');
    }
    if (value === 'monthly') {
      this._recurrenceRule.makeRule('bymonthday', this._dayOfMonthByRules());
      this._recurrenceRule.makeRule('bymonth', '');
      this._recurrenceRule.makeRule('byday', '');
    }
    if (value === 'yearly') {
      this._recurrenceRule.makeRule('bymonthday', this._dayOfMonthByRules());
      this._recurrenceRule.makeRule('bymonth', this._monthOfYearByRules());
      this._recurrenceRule.makeRule('byday', '');
    }
  };
  _proto2._optionChanged = function _optionChanged(args) {
    var _a, _b, _c, _d;
    switch (args.name) {
      case 'readOnly':
        (_a = this._recurrenceForm) === null || _a === void 0 ? void 0 : _a.option('readOnly', args.value);
        (_b = this._repeatCountEditor) === null || _b === void 0 ? void 0 : _b.option('readOnly', args.value);
        (_c = this._weekEditor) === null || _c === void 0 ? void 0 : _c.option('readOnly', args.value);
        (_d = this._repeatUntilDate) === null || _d === void 0 ? void 0 : _d.option('readOnly', args.value);
        // @ts-expect-error
        _Editor.prototype._optionChanged.call(this, args);
        break;
      case 'value':
        this._recurrenceRule.makeRules(args.value);
        this._changeRepeatIntervalLabel();
        this._disableRepeatEndParts();
        this._changeEditorsValue(this._recurrenceRule.getRules());
        // @ts-expect-error
        _Editor.prototype._optionChanged.call(this, args);
        break;
      case 'startDate':
        this._makeRepeatOnRule(this._recurrenceRule.getRules().freq);
        if ((0, _type.isDefined)(this._recurrenceRule.getRecurrenceString())) {
          this._changeEditorValue();
        }
        break;
      case 'firstDayOfWeek':
        if (this._weekEditor) {
          var localDaysNames = _date2.default.getDayNames('abbreviated');
          var dayNames = days.slice(args.value).concat(days.slice(0, args.value));
          var itemsButtonGroup = localDaysNames.slice(args.value).concat(localDaysNames.slice(0, args.value)).map(function (item, index) {
            return {
              text: item,
              key: dayNames[index]
            };
          });
          this._weekEditor.option('items', itemsButtonGroup);
        }
        if (this._$repeatDateEditor) {
          this._repeatUntilDate.option('calendarOptions.firstDayOfWeek', this._getFirstDayOfWeek());
        }
        break;
      default:
        // @ts-expect-error
        _Editor.prototype._optionChanged.call(this, args);
    }
  };
  _proto2._changeRepeatOnVisibility = function _changeRepeatOnVisibility(freq, previousFreq) {
    if (freq !== previousFreq) {
      this._recurrenceForm.itemOption('byday', 'visible', false);
      this._recurrenceForm.itemOption('bymonthday', 'visible', false);
      this._recurrenceForm.itemOption('bymonth', 'visible', false);
      this._recurrenceForm.itemOption('repeatOnLabel', 'visible', freq && freq !== 'daily' && freq !== 'hourly');
      if (freq === 'weekly') {
        this._recurrenceForm.itemOption('byday', 'visible', true);
      }
      if (freq === 'monthly') {
        this._recurrenceForm.itemOption('bymonthday', 'visible', true);
      }
      if (freq === 'yearly') {
        this._recurrenceForm.itemOption('bymonthday', 'visible', true);
        this._recurrenceForm.itemOption('bymonth', 'visible', true);
      }
    }
  };
  _proto2._changeRepeatIntervalLabel = function _changeRepeatIntervalLabel() {
    var _this$_recurrenceRule = this._recurrenceRule.getRules(),
      freq = _this$_recurrenceRule.freq;
    freq && this._recurrenceForm.itemOption('intervalLabel', 'template', _message.default.format("dxScheduler-recurrenceRepeat".concat(freq.charAt(0).toUpperCase()).concat(freq.substr(1).toLowerCase())));
  };
  _proto2._changeEditorsValue = function _changeEditorsValue(rules) {
    this._recurrenceForm.getEditor('freq').option('value', (rules.freq || frequenciesMessages[defaultRecurrenceTypeIndex].value).toLowerCase());
    this._changeDayOfWeekValue();
    this._changeDayOfMonthValue();
    this._changeMonthOfYearValue();
    this._changeIntervalValue(rules.interval);
    this._changeRepeatCountValue();
    this._changeRepeatEndValue();
    this._changeRepeatUntilValue();
  };
  _proto2._changeIntervalValue = function _changeIntervalValue(value) {
    this._recurrenceForm.getEditor('interval').option('value', value || 1);
  };
  _proto2._changeRepeatEndValue = function _changeRepeatEndValue() {
    var repeatType = this._recurrenceRule.getRepeatEndRule();
    this._recurrenceForm.getEditor('repeatEnd').option('value', repeatType);
  };
  _proto2._changeDayOfWeekValue = function _changeDayOfWeekValue() {
    var isEditorVisible = this._recurrenceForm.itemOption('byday').visible;
    if (isEditorVisible) {
      var _days = this._daysOfWeekByRules();
      this.getEditorByField('byday').option('selectedItemKeys', _days);
    }
  };
  _proto2._changeDayOfMonthValue = function _changeDayOfMonthValue() {
    var isEditorVisible = this._recurrenceForm.itemOption('bymonthday').visible;
    if (isEditorVisible) {
      var day = this._dayOfMonthByRules();
      this._recurrenceForm.getEditor('bymonthday').option('value', day);
    }
  };
  _proto2._changeMonthOfYearValue = function _changeMonthOfYearValue() {
    var isEditorVisible = this._recurrenceForm.itemOption('bymonth').visible;
    if (isEditorVisible) {
      var month = this._monthOfYearByRules();
      this._recurrenceForm.getEditor('bymonth').option('value', month);
    }
  };
  _proto2._changeRepeatCountValue = function _changeRepeatCountValue() {
    var count = this._recurrenceRule.getRules().count || 1;
    this._repeatCountEditor.option('value', count);
  };
  _proto2._changeRepeatUntilValue = function _changeRepeatUntilValue() {
    this._repeatUntilDate.option('value', this._getUntilValue());
  };
  _proto2._getUntilValue = function _getUntilValue() {
    var untilDate = this._recurrenceRule.getRules().until;
    if (!untilDate) {
      return this._formatUntilDate(new Date());
    }
    var getStartDateTimeZone = this.option('getStartDateTimeZone');
    var appointmentTimeZone = getStartDateTimeZone();
    var path = appointmentTimeZone ? _types.PathTimeZoneConversion.fromSourceToAppointment : _types.PathTimeZoneConversion.fromSourceToGrid;
    return this.option('timeZoneCalculator').createDate(untilDate, {
      path,
      appointmentTimeZone
    });
  };
  _proto2.toggle = function toggle() {
    this._freqEditor.focus();
  };
  _proto2.setAria = function setAria() {
    if (this._switchEditor) {
      this._switchEditor.setAria(arguments.length <= 0 ? undefined : arguments[0], arguments.length <= 1 ? undefined : arguments[1]);
    }
  };
  return RecurrenceEditor;
}(_editor.default);
(0, _component_registrator.default)('dxRecurrenceEditor', RecurrenceEditor);
var _default = RecurrenceEditor;
exports.default = _default;

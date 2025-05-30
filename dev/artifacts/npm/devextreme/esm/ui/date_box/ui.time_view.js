/**
* DevExtreme (esm/ui/date_box/ui.time_view.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../../core/renderer';
import Editor from '../editor/editor';
import NumberBox from '../number_box';
import SelectBox from '../select_box';
import Box from '../box';
import { extend } from '../../core/utils/extend';
import registerComponent from '../../core/component_registrator';
import dateLocalization from '../../localization/date';
import dateUtils from './ui.date_utils';
var TIMEVIEW_CLASS = 'dx-timeview';
var TIMEVIEW_CLOCK_CLASS = 'dx-timeview-clock';
var TIMEVIEW_FIELD_CLASS = 'dx-timeview-field';
var TIMEVIEW_HOURARROW_CLASS = 'dx-timeview-hourarrow';
var TIMEVIEW_TIME_SEPARATOR_CLASS = 'dx-timeview-time-separator';
var TIMEVIEW_FORMAT12_CLASS = 'dx-timeview-format12';
var TIMEVIEW_FORMAT12_AM = -1;
var TIMEVIEW_FORMAT12_PM = 1;
var TIMEVIEW_MINUTEARROW_CLASS = 'dx-timeview-minutearrow';
var rotateArrow = function rotateArrow($arrow, angle, offset) {
  cssRotate($arrow, angle, offset);
};
var cssRotate = function cssRotate($arrow, angle, offset) {
  $arrow.css('transform', 'rotate(' + angle + 'deg)' + ' translate(0,' + offset + 'px)');
};
var TimeView = Editor.inherit({
  _getDefaultOptions: function _getDefaultOptions() {
    return extend(this.callBase(), {
      value: new Date(Date.now()),
      use24HourFormat: true,
      _showClock: true,
      _arrowOffset: 5,
      stylingMode: undefined
    });
  },
  _getValue: function _getValue() {
    return this.option('value') || new Date();
  },
  _init: function _init() {
    this.callBase();
    this.$element().addClass(TIMEVIEW_CLASS);
  },
  _render: function _render() {
    this.callBase();
    this._renderBox();
    this._updateTime();
  },
  _renderBox: function _renderBox() {
    var $box = $('<div>').appendTo(this.$element());
    var items = [];
    if (this.option('_showClock')) {
      items.push({
        ratio: 1,
        shrink: 0,
        baseSize: 'auto',
        template: this._renderClock.bind(this)
      });
    }
    items.push({
      ratio: 0,
      shrink: 0,
      baseSize: 'auto',
      template: this._renderField.bind(this)
    });
    this._createComponent($box, Box, {
      height: '100%',
      width: '100%',
      direction: 'col',
      items: items
    });
  },
  _renderClock: function _renderClock(_, __, container) {
    this._$hourArrow = $('<div>').addClass(TIMEVIEW_HOURARROW_CLASS);
    this._$minuteArrow = $('<div>').addClass(TIMEVIEW_MINUTEARROW_CLASS);
    var $container = $(container);
    $container.addClass(TIMEVIEW_CLOCK_CLASS).append(this._$hourArrow).append(this._$minuteArrow);
    this.setAria('role', 'presentation', $container);
  },
  _updateClock: function _updateClock() {
    var time = this._getValue();
    var hourArrowAngle = time.getHours() / 12 * 360 + time.getMinutes() / 60 * 30;
    var minuteArrowAngle = time.getMinutes() / 60 * 360;
    rotateArrow(this._$hourArrow, hourArrowAngle, this.option('_arrowOffset'));
    rotateArrow(this._$minuteArrow, minuteArrowAngle, this.option('_arrowOffset'));
  },
  _getBoxItems: function _getBoxItems(is12HourFormat) {
    var items = [{
      ratio: 0,
      shrink: 0,
      baseSize: 'auto',
      template: () => this._hourBox.$element()
    }, {
      ratio: 0,
      shrink: 0,
      baseSize: 'auto',
      template: $('<div>').addClass(TIMEVIEW_TIME_SEPARATOR_CLASS).text(dateLocalization.getTimeSeparator())
    }, {
      ratio: 0,
      shrink: 0,
      baseSize: 'auto',
      template: () => this._minuteBox.$element()
    }];
    if (is12HourFormat) {
      items.push({
        ratio: 0,
        shrink: 0,
        baseSize: 'auto',
        template: () => this._format12.$element()
      });
    }
    return items;
  },
  _renderField: function _renderField() {
    var is12HourFormat = !this.option('use24HourFormat');
    this._createHourBox(is12HourFormat);
    this._createMinuteBox();
    if (is12HourFormat) {
      this._createFormat12Box();
    }
    return this._createComponent($('<div>').addClass(TIMEVIEW_FIELD_CLASS), Box, {
      direction: 'row',
      align: 'center',
      crossAlign: 'center',
      items: this._getBoxItems(is12HourFormat)
    }).$element();
  },
  _createHourBox: function _createHourBox(is12HourFormat) {
    var editor = this._hourBox = this._createComponent($('<div>'), NumberBox, extend({
      min: -1,
      max: is12HourFormat ? 13 : 24,
      value: this._getValue().getHours(),
      onValueChanged: this._onHourBoxValueChanged.bind(this),
      onKeyboardHandled: opts => this._keyboardHandler(opts)
    }, this._getNumberBoxConfig()));
    editor.setAria('label', 'hours');
  },
  _isPM: function _isPM() {
    return !this.option('use24HourFormat') && this._format12.option('value') === 1;
  },
  _onHourBoxValueChanged: function _onHourBoxValueChanged(_ref) {
    var {
      value,
      component
    } = _ref;
    var currentValue = this._getValue();
    var newValue = new Date(currentValue);
    var newHours = this._convertMaxHourToMin(value);
    component.option('value', newHours);
    if (this._isPM()) {
      newHours += 12;
    }
    newValue.setHours(newHours);
    dateUtils.normalizeTime(newValue);
    this.option('value', newValue);
  },
  _convertMaxHourToMin: function _convertMaxHourToMin(hours) {
    var maxHoursValue = this.option('use24HourFormat') ? 24 : 12;
    return (maxHoursValue + hours) % maxHoursValue;
  },
  _createMinuteBox: function _createMinuteBox() {
    var editor = this._minuteBox = this._createComponent($('<div>'), NumberBox, extend({
      min: -1,
      max: 60,
      value: this._getValue().getMinutes(),
      onKeyboardHandled: opts => this._keyboardHandler(opts),
      onValueChanged: _ref2 => {
        var {
          value,
          component
        } = _ref2;
        var newMinutes = (60 + value) % 60;
        component.option('value', newMinutes);
        var time = new Date(this._getValue());
        time.setMinutes(newMinutes);
        dateUtils.normalizeTime(time);
        this.option('value', time);
      }
    }, this._getNumberBoxConfig()));
    editor.setAria('label', 'minutes');
  },
  _createFormat12Box: function _createFormat12Box() {
    var periodNames = dateLocalization.getPeriodNames();
    var editor = this._format12 = this._createComponent($('<div>').addClass(TIMEVIEW_FORMAT12_CLASS), SelectBox, {
      items: [{
        value: TIMEVIEW_FORMAT12_AM,
        text: periodNames[0]
      }, {
        value: TIMEVIEW_FORMAT12_PM,
        text: periodNames[1]
      }],
      valueExpr: 'value',
      displayExpr: 'text',
      onKeyboardHandled: opts => this._keyboardHandler(opts),
      onValueChanged: _ref3 => {
        var {
          value
        } = _ref3;
        var hours = this._getValue().getHours();
        var time = new Date(this._getValue());
        var newHours = (hours + value * 12) % 24;
        time.setHours(newHours);
        this.option('value', time);
      },
      value: this._getValue().getHours() >= 12 ? TIMEVIEW_FORMAT12_PM : TIMEVIEW_FORMAT12_AM,
      stylingMode: this.option('stylingMode')
    });
    editor.setAria('label', 'type');
  },
  _refreshFormat12: function _refreshFormat12() {
    if (this.option('use24HourFormat')) return;
    var value = this._getValue();
    var hours = value.getHours();
    var isPM = hours >= 12;
    var newValue = isPM ? TIMEVIEW_FORMAT12_PM : TIMEVIEW_FORMAT12_AM;
    this._silentEditorValueUpdate(this._format12, newValue);
  },
  _silentEditorValueUpdate: function _silentEditorValueUpdate(editor, value) {
    if (editor) {
      editor._suppressValueChangeAction();
      editor.option('value', value);
      editor._resumeValueChangeAction();
    }
  },
  _getNumberBoxConfig: function _getNumberBoxConfig() {
    return {
      showSpinButtons: true,
      displayValueFormatter: function displayValueFormatter(value) {
        return (value < 10 ? '0' : '') + value;
      },
      stylingMode: this.option('stylingMode')
    };
  },
  _normalizeHours: function _normalizeHours(hours) {
    return this.option('use24HourFormat') ? hours : hours % 12 || 12;
  },
  _updateField: function _updateField() {
    var hours = this._normalizeHours(this._getValue().getHours());
    this._silentEditorValueUpdate(this._hourBox, hours);
    this._silentEditorValueUpdate(this._minuteBox, this._getValue().getMinutes());
    this._refreshFormat12();
  },
  _updateTime: function _updateTime() {
    if (this.option('_showClock')) {
      this._updateClock();
    }
    this._updateField();
  },
  _visibilityChanged: function _visibilityChanged(visible) {
    if (visible) {
      this._updateTime();
    }
  },
  _optionChanged: function _optionChanged(args) {
    switch (args.name) {
      case 'value':
        this._updateTime();
        this.callBase(args);
        break;
      case '_arrowOffset':
        break;
      case 'use24HourFormat':
      case '_showClock':
      case 'stylingMode':
        this._invalidate();
        break;
      default:
        this.callBase(args);
    }
  }
});
registerComponent('dxTimeView', TimeView);
export default TimeView;
